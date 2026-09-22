const zoomControllers = new Map();

function createMapZoom(controls) {
  const canvas = document.querySelector(`#${controls.dataset.zoomTarget}`);
  const viewport = canvas?.closest(".map-viewport");
  if (!canvas || !viewport) return;

  const computedMin = Number.parseFloat(window.getComputedStyle(canvas).minWidth);
  const baseWidth = Number.isFinite(computedMin) && computedMin > 0 ? computedMin : 992;
  const output = controls.querySelector("output");
  const outButton = controls.querySelector('[data-zoom-action="out"]');
  const inButton = controls.querySelector('[data-zoom-action="in"]');
  let zoom = 1;
  let pinchStartDistance = 0;
  let pinchStartZoom = 1;

  function applyZoom(nextZoom) {
    const centerX = viewport.scrollWidth ? (viewport.scrollLeft + viewport.clientWidth / 2) / viewport.scrollWidth : 0.5;
    const centerY = viewport.scrollHeight ? (viewport.scrollTop + viewport.clientHeight / 2) / viewport.scrollHeight : 0.5;
    zoom = Math.min(2.5, Math.max(0.12, nextZoom));
    const width = Math.round(baseWidth * zoom);
    canvas.style.width = `${width}px`;
    canvas.style.minWidth = `${width}px`;
    output.value = `${Math.round(zoom * 100)}%`;
    output.textContent = output.value;
    outButton.disabled = zoom <= 0.121;
    inButton.disabled = zoom >= 2.499;
    window.requestAnimationFrame(() => {
      viewport.scrollLeft = Math.max(0, centerX * viewport.scrollWidth - viewport.clientWidth / 2);
      viewport.scrollTop = Math.max(0, centerY * viewport.scrollHeight - viewport.clientHeight / 2);
    });
  }

  controls.addEventListener("click", (event) => {
    const action = event.target.closest("button")?.dataset.zoomAction;
    if (!action) return;
    if (action === "in") applyZoom(zoom + 0.25);
    if (action === "out") applyZoom(zoom - 0.25);
    if (action === "fit") {
      const availableWidth = Math.max(1, viewport.clientWidth - 4);
      applyZoom(availableWidth / baseWidth);
      viewport.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  });

  viewport.addEventListener("touchstart", (event) => {
    if (event.touches.length !== 2) return;
    const [first, second] = event.touches;
    pinchStartDistance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
    pinchStartZoom = zoom;
  }, { passive: true });

  viewport.addEventListener("touchmove", (event) => {
    if (event.touches.length !== 2 || !pinchStartDistance) return;
    event.preventDefault();
    const [first, second] = event.touches;
    const distance = Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY);
    applyZoom(pinchStartZoom * distance / pinchStartDistance);
  }, { passive: false });

  viewport.addEventListener("touchend", (event) => {
    if (event.touches.length < 2) pinchStartDistance = 0;
  }, { passive: true });

  applyZoom(1);
  zoomControllers.set(canvas.id, { applyZoom, get zoom() { return zoom; } });
}

function renderPictureStudyKey() {
  const grid = document.querySelector("#study-picture-grid");
  const fragment = document.createDocumentFragment();
  [...ITEMS].sort((a, b) => a.label.localeCompare(b.label)).forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "study-picture-card";
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.label;
    image.loading = "lazy";
    const caption = document.createElement("figcaption");
    caption.textContent = item.label;
    figure.append(image, caption);
    fragment.append(figure);
  });
  grid.append(fragment);
}

function renderQuestionStudyKey() {
  const list = document.querySelector("#study-answer-list");
  const fragment = document.createDocumentFragment();
  MCQ_BANK.forEach((question, index) => {
    const article = document.createElement("article");
    article.className = "study-answer-card";
    article.dataset.searchText = `${question.question} ${question.answer}`.toLocaleLowerCase();
    const meta = document.createElement("p");
    meta.className = "study-answer-meta";
    meta.textContent = `Question ${index + 1} · Reference page ${question.page}`;
    const prompt = document.createElement("h3");
    prompt.textContent = question.question;
    const answer = document.createElement("p");
    answer.className = "study-answer-value";
    const answerLabel = document.createElement("span");
    answerLabel.textContent = "Answer";
    answer.append(answerLabel);
    answer.append(document.createTextNode(question.answer));
    article.append(meta, prompt, answer);
    fragment.append(article);
  });
  list.append(fragment);
}

function filterStudyAnswers() {
  const query = document.querySelector("#study-answer-search").value.trim().toLocaleLowerCase();
  document.querySelectorAll(".study-answer-card").forEach((card) => {
    card.hidden = Boolean(query) && !card.dataset.searchText.includes(query);
  });
}

function refreshStudyProgress() {
  ensureStudyRendered();
  const totalAnswers = ITEMS.length + MCQ_BANK.length + MAP_ITEMS.length + DA_MAP_ITEMS.length;
  document.querySelector("#placed-count").textContent = String(totalAnswers);
  document.querySelector("#progress-label").textContent = "answers shown";
  document.querySelector("#progress-bar").style.width = "100%";
}

document.querySelectorAll(".map-zoom-bar[data-zoom-target]").forEach(createMapZoom);
let studyRendered = false;

function ensureStudyRendered() {
  if (studyRendered) return;
  studyRendered = true;
  renderPictureStudyKey();
  renderQuestionStudyKey();
  document.querySelector("#study-answer-search").addEventListener("input", filterStudyAnswers);
}

window.studyGuide = { refreshProgress: refreshStudyProgress, zoomControllers, ensureRendered: ensureStudyRendered };
if (document.body.dataset.section === "study") refreshStudyProgress();
