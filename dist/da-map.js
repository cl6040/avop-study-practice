const DA_MAP_GROUPS = [
  {
    key: "taxiway", label: "Taxiway", prefix: "T",
    positions: [[68.69,29.71],[60.68,36.08],[34.77,36.93],[55.10,38.53],[71.39,38.63],[45.13,38.76],[58.01,38.86],[50.28,38.86],[40.03,41.01],[44.92,43.20],[41.09,45.52],[44.92,45.69],[37.27,47.06],[42.40,49.12],[41.31,55.85],[45.88,56.50],[29.62,58.69],[66.01,58.95],[67.65,58.92],[62.98,58.95],[69.32,58.95],[56.21,60.07],[61.41,61.24],[72.07,61.37],[77.90,61.63],[50.71,68.40],[58.08,69.74],[71.74,70.72],[60.63,71.27],[62.75,71.31],[76.99,71.54],[72.75,74.93]],
    answers: ["N7","M","M","S","Q","JA","T","P","R","JB","K","JC","V","J","H","G","L","DT","DU","DS","DV","DR","D","DW","DY","E","A","C","AR","AS","F","C"]
  },
  {
    key: "road", label: "Road", prefix: "RD",
    positions: [[50.18,26.60],[16.04,29.48],[33.01,39.08],[63.28,41.44],[61.36,54.64],[13.74,55.95],[87.02,62.06],[87.05,67.19],[32.22,75.20],[44.24,77.52]],
    answers: ["N. Perimeter Rd","Button 08L Rd","CDN Svc Road","CDN Svc Road","Cargo Road","W. Dyke Rd","Button 26L Rd","S. Perimeter Rd","S. Dyke Rd","Button 31 Rd"]
  },
  {
    key: "runway", label: "Helipad", prefix: "HP",
    positions: [[81.09,71.41]], answers: ["C"]
  },
  {
    key: "apron", label: "Apron", prefix: "AP",
    positions: [[67.58,26.18],[73.89,39.84],[48.33,46.80],[64.52,58.92],[58.11,59.31],[71.41,59.54],[64.27,73.82],[63.23,78.30],[71.24,78.50]],
    answers: ["9","7","6","5","8","4","2","1","3"]
  },
  {
    key: "runup", label: "Run-up area", prefix: "RU",
    positions: [[56.77,73.53]], answers: ["Compass Rose"]
  }
];

const DA_MAP_ITEMS = DA_MAP_GROUPS.flatMap((group) => {
  if (group.positions.length !== group.answers.length) throw new Error(`D/A map data mismatch: ${group.key}`);
  return group.answers.map((answer, index) => ({
    id: `${group.key}-${index + 1}`,
    code: `${group.prefix}${index + 1}`,
    category: group.key,
    categoryLabel: group.label,
    answer,
    x: group.positions[index][0],
    y: group.positions[index][1],
  }));
});

const daMapState = { current: 0, answers: new Map(), submitted: false, reviewCursor: 0 };
const daMapElements = {
  answer: document.querySelector("#da-map-answer"), answerKey: document.querySelector("#da-map-answer-key"),
  category: document.querySelector("#da-map-category"), clear: document.querySelector("#da-map-clear"),
  correction: document.querySelector("#da-map-correction"), hint: document.querySelector("#da-map-submit-hint"),
  keyPanel: document.querySelector("#da-map-key-panel"), markerCode: document.querySelector("#da-map-marker-code"),
  markers: document.querySelector("#da-map-markers"), next: document.querySelector("#da-map-save-next"),
  previous: document.querySelector("#da-map-previous"), resultMessage: document.querySelector("#da-map-result-message"),
  results: document.querySelector("#da-map-results"), retry: document.querySelector("#da-map-retry"),
  review: document.querySelector("#da-map-review"), score: document.querySelector("#da-map-score"),
  submit: document.querySelector("#da-map-submit"),
};

function normalizeDaMapAnswer(value) {
  return value.trim().toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ")
    .replace(/\bn\b/g, "north").replace(/\bs\b/g, "south").replace(/\bw\b/g, "west")
    .replace(/\bsvc\b/g, "service").replace(/\b(rd|road)\b/g, "")
    .replace(/\b(helipad|taxiway|apron)\b/g, "").replace(/\s+/g, "");
}

function daMapAnswerIsCorrect(item) {
  return normalizeDaMapAnswer(daMapState.answers.get(item.id) || "") === normalizeDaMapAnswer(item.answer);
}

function buildDaMapMarkers() {
  const fragment = document.createDocumentFragment();
  DA_MAP_ITEMS.forEach((item, index) => {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `map-marker ${item.category}`;
    marker.dataset.index = String(index);
    marker.style.left = `${item.x}%`;
    marker.style.top = `${item.y}%`;
    marker.textContent = "";
    marker.addEventListener("click", () => { daMapState.current = index; renderDaMap(); daMapElements.answer.focus(); });
    fragment.append(marker);
  });
  daMapElements.markers.append(fragment);
}

function updateDaMapMarkers() {
  [...daMapElements.markers.children].forEach((marker, index) => {
    const item = DA_MAP_ITEMS[index];
    const enteredAnswer = (daMapState.answers.get(item.id) || "").trim();
    const answered = enteredAnswer !== "";
    marker.textContent = enteredAnswer;
    marker.classList.toggle("has-value", answered);
    marker.classList.toggle("active", index === daMapState.current);
    marker.classList.toggle("answered", answered);
    marker.classList.toggle("correct", daMapState.submitted && daMapAnswerIsCorrect(item));
    marker.classList.toggle("wrong", daMapState.submitted && !daMapAnswerIsCorrect(item));
    marker.setAttribute("aria-label", `${item.categoryLabel} map box, ${answered ? `answer ${enteredAnswer}` : "unanswered"}`);
  });
}

function updateDaMapProgress() {
  const answered = DA_MAP_ITEMS.filter((item) => (daMapState.answers.get(item.id) || "").trim()).length;
  const remaining = DA_MAP_ITEMS.length - answered;
  daMapElements.submit.disabled = remaining !== 0 || daMapState.submitted;
  daMapElements.hint.textContent = remaining === 0 ? "All 53 labels are entered. Ready to score the map." : `Type ${remaining} more ${remaining === 1 ? "answer" : "answers"} to unlock your score.`;
  if (document.body.dataset.section === "da-map") {
    document.querySelector("#placed-count").textContent = String(answered);
    document.querySelector("#progress-label").textContent = "of 53 typed";
    document.querySelector("#progress-bar").style.width = `${answered / DA_MAP_ITEMS.length * 100}%`;
  }
}

function renderDaMap() {
  const item = DA_MAP_ITEMS[daMapState.current];
  daMapElements.category.textContent = item.categoryLabel;
  daMapElements.category.className = `map-category ${item.category}`;
  daMapElements.markerCode.textContent = item.code;
  daMapElements.answer.value = daMapState.answers.get(item.id) || "";
  daMapElements.answer.disabled = daMapState.submitted;
  daMapElements.previous.disabled = daMapState.current === 0;
  daMapElements.next.textContent = daMapState.current === DA_MAP_ITEMS.length - 1 ? "Return to first →" : (daMapState.submitted ? "Next marker →" : "Save & next →");
  daMapElements.correction.hidden = true;
  if (daMapState.submitted && !daMapAnswerIsCorrect(item)) {
    daMapElements.correction.hidden = false;
    daMapElements.correction.textContent = `Correct answer: ${item.answer}`;
  }
  updateDaMapMarkers(); updateDaMapProgress();
}

function moveDaMap(step) {
  daMapState.current = (daMapState.current + step + DA_MAP_ITEMS.length) % DA_MAP_ITEMS.length;
  renderDaMap();
  if (!daMapState.submitted) daMapElements.answer.focus();
}

function submitDaMap() {
  if (DA_MAP_ITEMS.some((item) => !(daMapState.answers.get(item.id) || "").trim())) return;
  daMapState.submitted = true;
  const incorrect = DA_MAP_ITEMS.filter((item) => !daMapAnswerIsCorrect(item));
  const score = DA_MAP_ITEMS.length - incorrect.length;
  daMapElements.score.textContent = String(score);
  window.avopAnalytics?.completion("da-map", score, DA_MAP_ITEMS.length);
  daMapElements.resultMessage.textContent = incorrect.length ? `${incorrect.length} ${incorrect.length === 1 ? "label needs" : "labels need"} another look.` : "Perfect score. Every D/A map label is correct.";
  daMapElements.review.hidden = incorrect.length === 0;
  daMapElements.results.hidden = false;
  if (incorrect.length) { daMapState.current = DA_MAP_ITEMS.indexOf(incorrect[0]); daMapState.reviewCursor = 1; }
  renderDaMap(); daMapElements.results.focus();
}

function reviewNextDaMapMistake() {
  const incorrect = DA_MAP_ITEMS.filter((item) => !daMapAnswerIsCorrect(item));
  if (!incorrect.length) return;
  const item = incorrect[daMapState.reviewCursor % incorrect.length];
  daMapState.reviewCursor += 1; daMapState.current = DA_MAP_ITEMS.indexOf(item); renderDaMap();
}

function resetDaMap() {
  daMapState.current = 0; daMapState.answers.clear(); daMapState.submitted = false; daMapState.reviewCursor = 0;
  daMapElements.results.hidden = true; daMapElements.keyPanel.hidden = true; daMapElements.answerKey.textContent = "Show answer map"; renderDaMap();
}

daMapElements.answer.addEventListener("input", () => {
  const item = DA_MAP_ITEMS[daMapState.current];
  if (daMapElements.answer.value.trim()) daMapState.answers.set(item.id, daMapElements.answer.value);
  else daMapState.answers.delete(item.id);
  updateDaMapMarkers(); updateDaMapProgress();
});
daMapElements.answer.addEventListener("keydown", (event) => { if (event.key === "Enter" && !daMapState.submitted) { event.preventDefault(); moveDaMap(1); } });
daMapElements.previous.addEventListener("click", () => moveDaMap(-1));
daMapElements.next.addEventListener("click", () => moveDaMap(1));
daMapElements.clear.addEventListener("click", resetDaMap);
daMapElements.submit.addEventListener("click", submitDaMap);
daMapElements.review.addEventListener("click", reviewNextDaMapMistake);
daMapElements.retry.addEventListener("click", resetDaMap);
daMapElements.answerKey.addEventListener("click", () => {
  daMapElements.keyPanel.hidden = !daMapElements.keyPanel.hidden;
  daMapElements.answerKey.textContent = daMapElements.keyPanel.hidden ? "Show answer map" : "Hide answer map";
});

buildDaMapMarkers(); renderDaMap();
window.daMapQuiz = { refreshProgress: updateDaMapProgress };
