(() => {
  const pending = [];
  const counter = window.goatcounter || {};
  counter.no_onload = true;
  counter.no_events = true;
  window.goatcounter = counter;

  function send(payload) {
    if (typeof window.goatcounter?.count === "function") {
      window.goatcounter.count(payload);
      return;
    }
    pending.push(payload);
  }

  function flush() {
    if (typeof window.goatcounter?.count !== "function") return false;
    while (pending.length) window.goatcounter.count(pending.shift());
    return true;
  }

  function safeName(value) {
    return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);
  }

  function event(name, title = "") {
    const eventName = safeName(name);
    if (!eventName) return;
    send({ path: eventName, title: title || eventName, event: true });
  }

  function completion(name, score, total) {
    if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) return;
    const percentage = Math.round(score / total * 100);
    const band = percentage === 100 ? "100" : percentage >= 80 ? "80-99" : percentage >= 60 ? "60-79" : "below-60";
    event(`complete-${name}-${band}`, `${name} completed: ${band}% score band`);
  }

  window.avopAnalytics = Object.freeze({
    event,
    section(section) { event(`section-${section}`, `Section opened: ${section}`); },
    completion,
  });

  send({ path: "/app", title: "AVOP Study Practice", event: false });

  const beacon = document.querySelector("#goatcounter-script");
  beacon?.addEventListener("load", flush, { once: true });
  window.addEventListener("load", flush, { once: true });
  window.setTimeout(flush, 1500);
})();
