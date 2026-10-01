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
