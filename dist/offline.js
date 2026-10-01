(() => {
  const installButton = document.querySelector("#install-app");
  const cacheStatus = document.querySelector("#offline-cache-status");
  const help = document.querySelector("#offline-help");
  const connectionStatus = document.querySelector("#connection-status");
  const intro = document.querySelector("#offline-intro");
  const introInstallButton = document.querySelector("#offline-intro-install");
  const introLearnButton = document.querySelector("#offline-intro-learn");
  const introDismissButton = document.querySelector("#offline-intro-dismiss");
  const noticeKey = "avop-offline-notice-seen-v1";
  let installPrompt = null;

  function hasSeenIntro() {
    try { return window.localStorage.getItem(noticeKey) === "1"; } catch (_error) { return false; }
  }

  function rememberIntro() {
    try { window.localStorage.setItem(noticeKey, "1"); } catch (_error) { /* Storage can be unavailable in private mode. */ }
  }

  function hideIntro() {
    rememberIntro();
    intro.hidden = true;
  }

  function showIntro() {
    if (isInstalled() || hasSeenIntro()) return;
    intro.hidden = false;
    introInstallButton.hidden = !installPrompt;
    window.avopAnalytics?.event("offline-notice-shown", "Offline notice shown");
  }

  function isInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function updateConnectionStatus() {
    const offline = !window.navigator.onLine;
    connectionStatus.hidden = !offline;
    if (offline) connectionStatus.textContent = "Offline mode: saved practice content is available. Analytics and GitHub suggestions need internet access.";
  }

  function updateInstallHelp() {
    if (isInstalled()) {
      installButton.hidden = true;
      help.textContent = "Installed on this device. Open it once after each published update to refresh the saved content.";
      return;
    }
    const isiOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    help.textContent = isiOS
      ? "Once the status says Ready, this browser can practice offline. On iPhone or iPad, use Share → Add to Home Screen for an app icon."
      : "Once the status says Ready, this browser can practice offline. Use Install app below, or your browser menu, to add an app icon.";
  }

  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);
  updateConnectionStatus();
  updateInstallHelp();
  showIntro();

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
    if (!intro.hidden) introInstallButton.hidden = false;
  });

  async function promptInstall(button) {
    if (!installPrompt) return;
    button.disabled = true;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    installPrompt = null;
    installButton.hidden = true;
    introInstallButton.hidden = true;
    button.disabled = false;
    if (choice.outcome === "accepted") {
      hideIntro();
      window.avopAnalytics?.event("offline-app-installed", "Offline app installed");
    }
  }

  installButton.addEventListener("click", () => promptInstall(installButton));
  introInstallButton.addEventListener("click", () => promptInstall(introInstallButton));
  introDismissButton.addEventListener("click", () => {
    hideIntro();
    window.avopAnalytics?.event("offline-notice-dismissed", "Offline notice acknowledged");
  });
  introLearnButton.addEventListener("click", () => {
    hideIntro();
    window.avopAnalytics?.event("offline-notice-learn", "Offline instructions opened");
    document.querySelector('[data-section-target="study"]')?.click();
    window.requestAnimationFrame(() => document.querySelector(".offline-card")?.scrollIntoView({ behavior: "smooth", block: "center" }));
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    installButton.hidden = true;
    hideIntro();
    cacheStatus.textContent = "Installed and ready offline";
    updateInstallHelp();
  });

  if (!("serviceWorker" in window.navigator)) {
    cacheStatus.textContent = "Offline saving is not supported by this browser";
    return;
  }

  window.addEventListener("load", async () => {
    try {
      await window.navigator.serviceWorker.register("./service-worker.js", { scope: "./", updateViaCache: "none" });
      await window.navigator.serviceWorker.ready;
      cacheStatus.textContent = "Ready for offline use";
    } catch (_error) {
      cacheStatus.textContent = "Offline setup needs another online visit";
    }
  }, { once: true });
})();
