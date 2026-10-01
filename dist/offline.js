(() => {
  const installButton = document.querySelector("#install-app");
  const cacheStatus = document.querySelector("#offline-cache-status");
  const help = document.querySelector("#offline-help");
  const connectionStatus = document.querySelector("#connection-status");
  let installPrompt = null;

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

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    installButton.hidden = false;
  });

  installButton.addEventListener("click", async () => {
    if (!installPrompt) return;
    installButton.disabled = true;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    installPrompt = null;
    installButton.hidden = choice.outcome === "accepted";
    installButton.disabled = false;
    if (choice.outcome === "accepted") window.avopAnalytics?.event("offline-app-installed", "Offline app installed");
  });

  window.addEventListener("appinstalled", () => {
    installPrompt = null;
    installButton.hidden = true;
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
