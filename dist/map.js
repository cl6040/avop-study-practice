const MAP_GROUPS = [
  {
    key: "taxiway", label: "Taxiway", prefix: "T",
    positions: [[68.59,29.61],[27.15,34.64],[32.47,34.64],[40.45,34.64],[44.70,34.64],[49.39,34.64],[53.99,34.64],[61.62,34.64],[67.07,34.64],[69.75,34.64],[24.14,34.84],[34.65,36.86],[71.31,38.50],[45.03,38.69],[55.13,38.69],[58.01,38.69],[50.15,38.95],[39.92,40.92],[28.71,42.75],[44.82,43.14],[41.01,45.42],[44.82,45.56],[37.17,46.80],[33.03,48.17],[42.30,49.02],[41.21,55.75],[45.78,56.47],[29.55,58.56],[62.93,58.82],[65.91,58.82],[67.58,58.82],[69.19,58.82],[56.11,60.00],[61.36,61.11],[71.99,61.31],[77.85,61.57],[31.79,61.90],[46.06,63.07],[54.80,63.07],[58.96,63.07],[21.01,63.40],[24.90,63.40],[70.08,63.86],[74.12,64.05],[77.45,64.25],[56.16,67.65],[71.24,67.65],[73.76,67.65],[34.72,68.04],[43.74,68.04],[50.63,68.30],[58.01,69.61],[71.67,70.59],[60.53,71.18],[62.65,71.18],[76.97,71.37],[72.68,74.84]],
    answers: ["N7","M8","M6","M4","M1","M2","M3","M5","M7","M9","M10","M","Q","JA","S","T","P","R","H4","JB","K","JC","V","H2","J","H","G","L","DS","DT","DU","DV","DR","D","DW","DY","L2","D1","D2","D3","L6","L4","D5","D7","D9","A","A5","A7","A6","A4","E","A2","C","AR","AS","F","C"]
  },
  {
    key: "road", label: "Road", prefix: "RD",
    positions: [[50.10,26.50],[15.96,29.41],[78.69,35.16],[14.12,35.95],[63.18,41.34],[16.92,43.24],[13.86,53.43],[61.26,54.54],[13.64,55.85],[86.94,61.96],[86.94,67.09],[33.64,75.85],[44.12,77.42]],
    answers: ["N. Perimeter Rd","Button 08L Rd","Button 26R Road","N. Hotel Rd","CDN Svc Road","Button 13 Rd","Lima Holding Bay Rd","Cargo Road","W. Dyke Rd","Button 26L Rd","S. Perimeter Rd","S. Dyke Rd","Button 31 Rd"]
  },
  {
    key: "runway", label: "Runway / helipad", prefix: "RW",
    positions: [[48.36,30.59],[36.99,55.72],[64.49,63.95],[81.01,71.31]],
    answers: ["Rnwy 08L-26R","Rnwy 13-31","Rnwy 08R-26L","C"]
  },
  {
    key: "apron", label: "Apron", prefix: "AP",
    positions: [[67.50,26.14],[74.04,39.61],[48.23,46.73],[64.42,58.82],[57.93,59.22],[71.39,59.48],[64.14,73.66],[63.13,78.24],[71.16,78.37]],
    answers: ["9","7","6","5","8","4","2","1","3"]
  },
  {
    key: "runup", label: "Run-up area", prefix: "RU",
    positions: [[22.53,59.05],[56.29,73.46]],
    answers: ["Lima Holding Bay","Compass Rose"]
  }
];

const MAP_ITEMS = MAP_GROUPS.flatMap((group) => {
  if (group.positions.length !== group.answers.length) throw new Error(`Map data mismatch: ${group.key}`);
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

const mapState = { current: 0, answers: new Map(), submitted: false, reviewCursor: 0 };
const mapElements = {
  answer: document.querySelector("#map-answer"),
  answerKey: document.querySelector("#map-answer-key"),
  category: document.querySelector("#map-category"),
  clear: document.querySelector("#map-clear"),
  correction: document.querySelector("#map-correction"),
  hint: document.querySelector("#map-submit-hint"),
  keyPanel: document.querySelector("#map-key-panel"),
  markerCode: document.querySelector("#map-marker-code"),
  markers: document.querySelector("#map-markers"),
  next: document.querySelector("#map-save-next"),
  previous: document.querySelector("#map-previous"),
  resultMessage: document.querySelector("#map-result-message"),
  results: document.querySelector("#map-results"),
  retry: document.querySelector("#map-retry"),
  review: document.querySelector("#map-review"),
  score: document.querySelector("#map-score"),
  submit: document.querySelector("#map-submit"),
};

function normalizeMapAnswer(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\bn\b/g, "north")
    .replace(/\bs\b/g, "south")
    .replace(/\bw\b/g, "west")
    .replace(/\bsvc\b/g, "service")
    .replace(/\b(rd|road)\b/g, "")
    .replace(/\b(rnwy|runway)\b/g, "")
    .replace(/\b(helipad|taxiway|apron)\b/g, "")
    .replace(/\s+/g, "");
}

function mapAnswerIsCorrect(item) {
  return normalizeMapAnswer(mapState.answers.get(item.id) || "") === normalizeMapAnswer(item.answer);
}

function buildMapMarkers() {
  const fragment = document.createDocumentFragment();
  MAP_ITEMS.forEach((item, index) => {
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `map-marker ${item.category}`;
    marker.dataset.index = String(index);
    marker.style.left = `${item.x}%`;
    marker.style.top = `${item.y}%`;
    marker.textContent = "";
    marker.addEventListener("click", () => {
      mapState.current = index;
      renderMap();
      mapElements.answer.focus();
    });
    fragment.append(marker);
  });
  mapElements.markers.append(fragment);
}

function updateMapMarkers() {
  [...mapElements.markers.children].forEach((marker, index) => {
    const item = MAP_ITEMS[index];
    const enteredAnswer = (mapState.answers.get(item.id) || "").trim();
    const answered = enteredAnswer !== "";
    marker.textContent = enteredAnswer;
    marker.classList.toggle("has-value", answered);
    marker.classList.toggle("active", index === mapState.current);
    marker.classList.toggle("answered", answered);
    marker.classList.toggle("correct", mapState.submitted && mapAnswerIsCorrect(item));
    marker.classList.toggle("wrong", mapState.submitted && !mapAnswerIsCorrect(item));
    marker.setAttribute("aria-label", `${item.categoryLabel} map box, ${answered ? `answer ${enteredAnswer}` : "unanswered"}`);
  });
}

function updateMapProgress() {
  const answered = MAP_ITEMS.filter((item) => (mapState.answers.get(item.id) || "").trim()).length;
  const remaining = MAP_ITEMS.length - answered;
  mapElements.submit.disabled = remaining !== 0 || mapState.submitted;
  mapElements.hint.textContent = remaining === 0 ? "All 85 labels are entered. Ready to score the map." : `Type ${remaining} more ${remaining === 1 ? "answer" : "answers"} to unlock your score.`;
  if (document.body.dataset.section === "map") {
    document.querySelector("#placed-count").textContent = String(answered);
    document.querySelector("#progress-label").textContent = "of 85 typed";
    document.querySelector("#progress-bar").style.width = `${answered / MAP_ITEMS.length * 100}%`;
  }
}

function renderMap() {
  const item = MAP_ITEMS[mapState.current];
  mapElements.category.textContent = item.categoryLabel;
  mapElements.category.className = `map-category ${item.category}`;
  mapElements.markerCode.textContent = item.code;
  mapElements.answer.value = mapState.answers.get(item.id) || "";
  mapElements.answer.disabled = mapState.submitted;
  mapElements.previous.disabled = mapState.current === 0;
  mapElements.next.disabled = false;
  mapElements.next.textContent = mapState.current === MAP_ITEMS.length - 1 ? "Return to first →" : (mapState.submitted ? "Next marker →" : "Save & next →");
  mapElements.correction.hidden = true;
  if (mapState.submitted && !mapAnswerIsCorrect(item)) {
    mapElements.correction.hidden = false;
    mapElements.correction.textContent = `Correct answer: ${item.answer}`;
  }
  updateMapMarkers();
  updateMapProgress();
}

function moveMap(step) {
  mapState.current = (mapState.current + step + MAP_ITEMS.length) % MAP_ITEMS.length;
  renderMap();
  if (!mapState.submitted) mapElements.answer.focus();
}

function submitMap() {
  if (MAP_ITEMS.some((item) => !(mapState.answers.get(item.id) || "").trim())) return;
  mapState.submitted = true;
  const incorrect = MAP_ITEMS.filter((item) => !mapAnswerIsCorrect(item));
  mapElements.score.textContent = String(MAP_ITEMS.length - incorrect.length);
  mapElements.resultMessage.textContent = incorrect.length ? `${incorrect.length} ${incorrect.length === 1 ? "label needs" : "labels need"} another look.` : "Perfect score. Every map label is correct.";
  mapElements.review.hidden = incorrect.length === 0;
  mapElements.results.hidden = false;
  if (incorrect.length) {
    mapState.current = MAP_ITEMS.indexOf(incorrect[0]);
    mapState.reviewCursor = 1;
  }
  renderMap();
  mapElements.results.focus();
}

function reviewNextMapMistake() {
  const incorrect = MAP_ITEMS.filter((item) => !mapAnswerIsCorrect(item));
  if (!incorrect.length) return;
  const item = incorrect[mapState.reviewCursor % incorrect.length];
  mapState.reviewCursor += 1;
  mapState.current = MAP_ITEMS.indexOf(item);
  renderMap();
}

function resetMap() {
  mapState.current = 0;
  mapState.answers.clear();
  mapState.submitted = false;
  mapState.reviewCursor = 0;
  mapElements.results.hidden = true;
  mapElements.keyPanel.hidden = true;
  mapElements.answerKey.textContent = "Show answer map";
  renderMap();
}

mapElements.answer.addEventListener("input", () => {
  const item = MAP_ITEMS[mapState.current];
  if (mapElements.answer.value.trim()) mapState.answers.set(item.id, mapElements.answer.value);
  else mapState.answers.delete(item.id);
  updateMapMarkers();
  updateMapProgress();
});
mapElements.answer.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !mapState.submitted) { event.preventDefault(); moveMap(1); }
});
mapElements.previous.addEventListener("click", () => moveMap(-1));
mapElements.next.addEventListener("click", () => moveMap(1));
mapElements.clear.addEventListener("click", resetMap);
mapElements.submit.addEventListener("click", submitMap);
mapElements.review.addEventListener("click", reviewNextMapMistake);
mapElements.retry.addEventListener("click", resetMap);
mapElements.answerKey.addEventListener("click", () => {
  mapElements.keyPanel.hidden = !mapElements.keyPanel.hidden;
  mapElements.answerKey.textContent = mapElements.keyPanel.hidden ? "Show answer map" : "Hide answer map";
});

buildMapMarkers();
renderMap();
window.mapQuiz = { refreshProgress: updateMapProgress };
