import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const dist = path.join(root, "dist");
const serviceWorkerPath = path.join(dist, "service-worker.js");

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const manifest = JSON.parse(fs.readFileSync(path.join(dist, "manifest.webmanifest"), "utf8"));
assert.equal(manifest.display, "standalone");
assert.equal(manifest.start_url, "./");
assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);
for (const icon of manifest.icons) assert.ok(fs.existsSync(path.join(dist, icon.src)), `Missing manifest icon: ${icon.src}`);

const indexHtml = fs.readFileSync(path.join(dist, "index.html"), "utf8");
for (const id of ["offline-intro", "offline-intro-install", "offline-intro-learn", "offline-intro-dismiss"]) {
  assert.ok(indexHtml.includes(`id="${id}"`), `Missing one-time offline notice element: ${id}`);
}
const offlineSource = fs.readFileSync(path.join(dist, "offline.js"), "utf8");
assert.ok(offlineSource.includes("avop-offline-notice-seen-v1"), "Offline notice acknowledgement key is missing");

function loadOfflineController(alreadySeen = false) {
  const stored = new Map(alreadySeen ? [["avop-offline-notice-seen-v1", "1"]] : []);
  const selectors = [
    "#install-app", "#offline-cache-status", "#offline-help", "#connection-status", "#offline-intro",
    "#offline-intro-install", "#offline-intro-learn", "#offline-intro-dismiss",
  ];
  const elements = Object.fromEntries(selectors.map((selector) => [selector, {
    hidden: true,
    textContent: "",
    listeners: {},
    addEventListener(type, listener) { this.listeners[type] = listener; },
  }]));
  const windowListeners = {};
  const sandbox = {
    document: { querySelector: (selector) => elements[selector] ?? null },
    window: {
      navigator: {
        onLine: true,
        standalone: false,
        userAgent: "test browser",
        serviceWorker: { register: async () => undefined, ready: Promise.resolve() },
      },
      localStorage: {
        getItem: (key) => stored.get(key) ?? null,
        setItem: (key, value) => stored.set(key, value),
      },
      matchMedia: () => ({ matches: false }),
      addEventListener: (type, listener) => { windowListeners[type] = listener; },
      requestAnimationFrame: (callback) => callback(),
    },
  };
  vm.runInNewContext(offlineSource, sandbox, { filename: "offline.js" });
  return { elements, stored };
}

const firstVisit = loadOfflineController();
assert.equal(firstVisit.elements["#offline-intro"].hidden, false, "First visit did not show the offline notice");
firstVisit.elements["#offline-intro-dismiss"].listeners.click();
assert.equal(firstVisit.elements["#offline-intro"].hidden, true, "Acknowledging the offline notice did not hide it");
assert.equal(firstVisit.stored.get("avop-offline-notice-seen-v1"), "1", "Offline notice acknowledgement was not saved");
const repeatVisit = loadOfflineController(true);
assert.equal(repeatVisit.elements["#offline-intro"].hidden, true, "Offline notice repeated after acknowledgement");

const source = fs.readFileSync(serviceWorkerPath, "utf8");
const assetMatch = source.match(/const OFFLINE_ASSETS = (\[[\s\S]*?\]);/);
const cacheMatch = source.match(/const CACHE_NAME = "([^"]+)";/);
assert.ok(assetMatch, "Generated service worker is missing OFFLINE_ASSETS");
assert.ok(cacheMatch, "Generated service worker is missing CACHE_NAME");
const cachedAssets = JSON.parse(assetMatch[1]);
const expectedAssets = [
  "./",
  ...walk(dist)
    .map((file) => path.relative(dist, file).replaceAll("\\", "/"))
    .filter((file) => ![".nojekyll", "service-worker.js"].includes(file))
    .sort()
    .map((file) => `./${file}`),
];
assert.deepEqual(cachedAssets, expectedAssets, "Offline cache list does not match the deployed files");

const listeners = {};
const cachedNavigation = { source: "offline-index" };
let installedAssets = [];
const sandbox = {
  URL,
  Error,
  Promise,
  fetch: async () => { throw new Error("offline"); },
  caches: {
    open: async () => ({ addAll: async (assets) => { installedAssets = [...assets]; } }),
    keys: async () => ["avop-study-old", cacheMatch[1]],
    delete: async () => true,
    match: async (request) => request === "./index.html" ? cachedNavigation : null,
  },
  self: {
    location: { origin: "https://example.test" },
    addEventListener: (type, listener) => { listeners[type] = listener; },
    skipWaiting: async () => undefined,
    clients: { claim: async () => undefined },
  },
};
vm.runInNewContext(source, sandbox, { filename: "service-worker.js" });

let installPromise;
listeners.install({ waitUntil: (promise) => { installPromise = promise; } });
await installPromise;
assert.deepEqual(installedAssets, cachedAssets, "Install did not cache every offline resource");

let navigationResponse;
listeners.fetch({
  request: { method: "GET", mode: "navigate", url: "https://example.test/?section=map" },
  respondWith: (promise) => { navigationResponse = promise; },
});
assert.equal(await navigationResponse, cachedNavigation, "Offline navigation did not fall back to the cached app");

console.log(`Offline checks passed for ${cachedAssets.length} cached resources.`);
