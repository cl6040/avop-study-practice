(() => {
  const installButton = document.querySelector("#install-app");
  const cacheStatus = document.querySelector("#offline-cache-status");
  const help = document.querySelector("#offline-help");
  const connectionStatus = document.querySelector("#connection-status");
  const intro = document.querySelector("#offline-intro");
  const introInstallButton = document.querySelector("#offline-intro-install");
  const introLearnButton = document.querySelector("#offline-intro-learn");
  const introDismissButton = document.querySelector("#offline-intro-dismiss");
  const iosInstallModal = document.querySelector("#ios-install-modal");
  const iosSafariStep = document.querySelector("#ios-safari-step");
  const iosInstallClose = document.querySelector("#ios-install-close");
  const iosInstallDone = document.querySelector("#ios-install-done");
  const iosInstallBackdrop = document.querySelector(".install-modal-backdrop");
  const noticeKey = "avop-offline-notice-seen-v2";
  let installPrompt = null;
  let modalReturnFocus = null;

  function isIOS() {
    const userAgent = window.navigator.userAgent;
    return /iphone|ipad|ipod/i.test(userAgent)
      || (/macintosh/i.test(userAgent) && window.navigator.maxTouchPoints > 1);
  }

  function isIOSSafari() {
    const userAgent = window.navigator.userAgent;
    return isIOS() && /version\/[\d.]+.*safari/i.test(userAgent) && !/crios|fxios|edgios|opios|duckduckgo/i.test(userAgent);
  }

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
    introInstallButton.hidden = !(isIOS() || installPrompt);
    introInstallButton.textContent = isIOS() ? "Install on iPhone" : "Install app";
    window.avopAnalytics?.event("offline-notice-shown", "Offline notice shown");
  }

  function openIOSInstallGuide(button) {
    modalReturnFocus = button;
    hideIntro();
    iosSafariStep.hidden = isIOSSafari();
    iosInstallModal.hidden = false;
    document.body.classList.add("install-guide-open");
    iosInstallClose.focus();
    window.avopAnalytics?.event("ios-install-guide-opened", "iPhone install instructions opened");
  }

  function closeIOSInstallGuide() {
    iosInstallModal.hidden = true;
    document.body.classList.remove("install-guide-open");
    modalReturnFocus?.focus();
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
    help.textContent = isIOS()
      ? "iPhone installs web apps through Safari's Share menu. Tap Install on iPhone for the exact steps."
      : "Once the status says Ready, this browser can practice offline. Use Install app below, or your browser menu, to add an app icon.";
    if (isIOS()) {
      installButton.hidden = false;
      installButton.textContent = "Install on iPhone";
    }
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

  installButton.addEventListener("click", () => isIOS() ? openIOSInstallGuide(installButton) : promptInstall(installButton));
  introInstallButton.addEventListener("click", () => isIOS() ? openIOSInstallGuide(introInstallButton) : promptInstall(introInstallButton));
  iosInstallClose.addEventListener("click", closeIOSInstallGuide);
  iosInstallDone.addEventListener("click", closeIOSInstallGuide);
  iosInstallBackdrop.addEventListener("click", closeIOSInstallGuide);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !iosInstallModal.hidden) closeIOSInstallGuide();
  });
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
