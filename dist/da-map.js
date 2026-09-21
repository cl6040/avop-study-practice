const DA_MAP_GROUPS = [
  {
    key: "taxiway", label: "Taxiway", prefix: "T",
    positions: [[68.96,29.87],[61.09,36.31],[35.38,37.09],[55.45,38.66],[71.72,38.79],[45.71,38.89],[58.41,39.02],[50.73,39.05],[40.66,41.08],[45.48,43.30],[41.69,45.59],[45.51,45.75],[38.23,47.09],[43.01,49.22],[41.87,55.82],[46.41,56.50],[30.30,58.69],[66.24,58.79],[67.98,58.79],[63.36,58.82],[69.57,58.79],[56.57,60.03],[61.77,61.14],[72.35,61.31],[78.16,61.57],[71.62,67.61],[51.14,68.30],[58.46,69.58],[71.97,70.49],[61.29,70.98],[68.36,71.90],[72.98,74.71]],
    answers: ["N7","M","M","S","Q","JA","T","P","R","JB","K","JC","V","J","H","G","L","DT","DU","DS","DV","DR","D","DW","DY","A5","E","A","C","AR","F","C"]
  },
  {
    key: "road", label: "Road", prefix: "RD",
    positions: [[50.68,26.80],[16.84,29.67],[33.61,39.18],[63.56,41.50],[61.67,54.61],[14.52,55.92],[87.15,61.96],[87.10,67.03],[32.85,74.90],[44.72,77.22]],
    answers: ["N. Perimeter Rd","Button 08L Rd","CDN Svc Road","CDN Svc Road","Cargo Road","W. Dyke Rd","Button 26L Rd","S. Perimeter Rd","S. Dyke Rd","Button 31 Rd"]
  },
  {
    key: "runway", label: "Helipad", prefix: "HP",
    positions: [[81.24,71.24]], answers: ["C"]
  },
  {
    key: "apron", label: "Apron", prefix: "AP",
    positions: [[68.01,26.41],[74.09,39.90],[48.89,46.86],[64.80,58.86],[58.36,59.25],[71.67,59.44],[64.62,73.63],[63.59,78.20],[71.59,78.27]],
    answers: ["9","7","6","5","8","4","2","1","3"]
  },
  {
    key: "runup", label: "Run-up area", prefix: "RU",
    positions: [[56.79,73.33]], answers: ["Compass Rose"]
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
  daMapElements.score.textContent = String(DA_MAP_ITEMS.length - incorrect.length);
  daMapElements.resultMessage.textContent = incorrect.length ? `${incorrect.length} ${incorrect.length === 1 ? "label needs" : "labels need"} another look.` : "Perfect score. Every D/A April map label is correct.";
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
