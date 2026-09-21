const ITEMS = [
  { id: "pedestrian-crosswalk", label: "Pedestrian Crosswalks", image: "assets/pedestrian-crosswalk.png" },
  { id: "stop-lines-markings", label: "Stop Lines / Markings", image: "assets/stop-lines-markings.png" },
  { id: "vehicle-corridor", label: "Vehicle Corridor", image: "assets/vehicle-corridor.png" },
  { id: "stop-bars", label: "Stop Bars", image: "assets/stop-bars.png" },
  { id: "bridge-safety-lines", label: "Bridge Safety Lines", image: "assets/bridge-safety-lines.png" },
  { id: "hydrant-fueling-pit", label: "Hydrant Fueling Pit", image: "assets/hydrant-fueling-pit.png" },
  { id: "aircraft-lead-in-lines", label: "Aircraft Lead-In Lines", image: "assets/aircraft-lead-in-lines.png" },
  { id: "taxiway-intersection-lines", label: "Taxiway Intersection Lines", image: "assets/taxiway-intersection-lines.png" },
  { id: "taxiway-edge-markings", label: "Taxiway Edge Markings", image: "assets/taxiway-edge-markings.png" },
  { id: "tail-wingtip-clearance-lines", label: "Tail / Wingtip Clearance Lines", image: "assets/tail-wingtip-clearance-lines.png" },
  { id: "apron-safety-lines", label: "Apron Safety Lines", image: "assets/apron-safety-lines.png" },
  { id: "taxiway-directional-signs", label: "Taxiway Directional Signs", image: "assets/taxiway-directional-signs.png" },
  { id: "runway-markings", label: "Runway Markings", image: "assets/runway-markings.png" },
  { id: "bridge-return-circle", label: "Bridge Return Circle", image: "assets/bridge-return-circle.png" },
  { id: "helicopter-parking", label: "Helicopter Parking", image: "assets/helicopter-parking.png" },
  { id: "apron-passenger-path-lines", label: "Apron Passenger Path Lines", image: "assets/apron-passenger-path-lines.png" },
  { id: "manoeuvring-area-delimitation-line", label: "Manoeuvring Area Delimitation Line", image: "assets/manoeuvring-area-delimitation-line.png" },
  { id: "mandatory-instruction-signs", label: "Mandatory Instruction Signs", image: "assets/mandatory-instruction-signs.png" },
  { id: "aircraft-start-boxes", label: "Aircraft Start Boxes", image: "assets/aircraft-start-boxes.png" },
  { id: "taxiway-location-signs", label: "Taxiway Location Signs", image: "assets/taxiway-location-signs.png" },
  { id: "taxiway-edge-lights", label: "Taxiway Edge Lights", image: "assets/taxiway-edge-lights.png" },
  { id: "runway-holding-position-marking", label: "Runway Holding Position Marking", image: "assets/runway-holding-position-marking.png" },
  { id: "taxiway-center-lines", label: "Taxiway Center Lines", image: "assets/taxiway-center-lines.png" },
  { id: "zipper-lines", label: "Zipper Lines", image: "assets/zipper-lines.png" },
  { id: "runway-edge-lights", label: "Runway Edge Lights", image: "assets/runway-edge-lights.png" },
];

const byId = new Map(ITEMS.map((item) => [item.id, item]));

function shuffled(list) {
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

const state = {
  assignments: new Map(),
  order: shuffled(ITEMS.map((item) => item.id)),
  labelOrder: ITEMS.map((item) => item.id).sort((a, b) => byId.get(a).label.localeCompare(byId.get(b).label)),
  currentIndex: 0,
  submitted: false,
  reviewCursor: 0,
};

const elements = {
  answerNote: document.querySelector("#answer-note"),
  clearAll: document.querySelector("#clear-button"),
  clearCurrent: document.querySelector("#clear-current-button"),
  dotTrack: document.querySelector("#dot-track"),
  dropZone: document.querySelector("#drop-zone"),
  image: document.querySelector("#quiz-image"),
  labelBank: document.querySelector("#label-bank"),
  labelSearch: document.querySelector("#label-search"),
  labelsLeft: document.querySelector("#labels-left"),
  next: document.querySelector("#next-button"),
  pictureCard: document.querySelector("#picture-card"),
  pictureCounter: document.querySelector("#picture-counter"),
  pictureState: document.querySelector("#picture-state"),
  placedCount: document.querySelector("#placed-count"),
  previous: document.querySelector("#previous-button"),
  progressBar: document.querySelector("#progress-bar"),
  progressLabel: document.querySelector("#progress-label"),
  results: document.querySelector("#results"),
  review: document.querySelector("#review-button"),
  score: document.querySelector("#score-number"),
  status: document.querySelector("#status"),
  submit: document.querySelector("#submit-button"),
  submitHint: document.querySelector("#submit-hint"),
};

function currentId() { return state.order[state.currentIndex]; }
function currentItem() { return byId.get(currentId()); }

function announce(message) {
  elements.status.textContent = "";
  window.setTimeout(() => { elements.status.textContent = message; }, 20);
}

function moveCarousel(delta) {
  state.currentIndex = (state.currentIndex + delta + ITEMS.length) % ITEMS.length;
  renderCurrent();
  announce(`Picture ${state.currentIndex + 1} of ${ITEMS.length}.`);
}

function goToId(id) {
  const index = state.order.indexOf(id);
  if (index >= 0) {
    state.currentIndex = index;
    renderCurrent();
  }
}

function nextUnansweredIndex(startIndex) {
  for (let offset = 1; offset <= ITEMS.length; offset += 1) {
    const index = (startIndex + offset) % ITEMS.length;
    if (!state.assignments.has(state.order[index])) return index;
  }
  return startIndex;
}

function assignLabel(imageId, labelId, autoAdvance = true, shouldRender = true) {
  if (state.submitted || !byId.has(imageId) || !byId.has(labelId)) return;
  for (const [assignedImage, assignedLabel] of state.assignments) {
    if (assignedLabel === labelId) state.assignments.delete(assignedImage);
  }
  state.assignments.set(imageId, labelId);
  const label = byId.get(labelId).label;
  elements.labelSearch.value = "";
  if (autoAdvance) state.currentIndex = nextUnansweredIndex(state.currentIndex);
  if (shouldRender) renderAll();
  announce(`${label} placed. ${state.assignments.size} of ${ITEMS.length} answered.`);
}

function removeCurrentAssignment() {
  if (state.submitted) return;
  const imageId = currentId();
  const labelId = state.assignments.get(imageId);
  if (!labelId) return;
  state.assignments.delete(imageId);
  renderAll();
  announce(`${byId.get(labelId).label} returned to the magnet tray.`);
}

function renderLabels() {
  elements.labelBank.replaceChildren();
  const used = new Set(state.assignments.values());
  const query = elements.labelSearch.value.trim().toLocaleLowerCase();
  const unused = state.labelOrder.filter((id) => !used.has(id));
  const available = unused.filter((id) => byId.get(id).label.toLocaleLowerCase().includes(query));
  for (const labelId of available) {
    const item = byId.get(labelId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "magnet";
    button.textContent = item.label;
    button.dataset.labelId = item.id;
    button.draggable = true;
    button.disabled = state.submitted;
    button.addEventListener("click", () => assignLabel(currentId(), item.id));
    button.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", item.id);
      event.dataTransfer.effectAllowed = "move";
    });
    elements.labelBank.append(button);
  }
  elements.labelBank.classList.toggle("empty", available.length === 0);
  elements.labelBank.dataset.emptyText = unused.length === 0 ? "All labels placed" : "No matching labels";
  elements.labelsLeft.textContent = `${unused.length} left`;
}

function renderCurrent() {
  const imageId = currentId();
  const item = currentItem();
  const labelId = state.assignments.get(imageId);
  const isCorrect = labelId === imageId;
  elements.pictureCounter.textContent = `${state.currentIndex + 1} of ${ITEMS.length}`;
  elements.image.src = item.image;
  elements.image.alt = `Airside sign or surface marking, picture ${state.currentIndex + 1} of ${ITEMS.length}`;
  elements.pictureCard.classList.remove("correct", "wrong");
  elements.pictureState.className = "state-pill";
  elements.dropZone.replaceChildren();
  elements.answerNote.hidden = true;
  elements.answerNote.textContent = "";

  if (labelId) {
    const placed = byId.get(labelId);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "placed-label";
    button.innerHTML = `<span>${placed.label}</span><span aria-hidden="true">×</span>`;
    button.setAttribute("aria-label", `Remove ${placed.label}`);
    button.disabled = state.submitted;
    button.addEventListener("click", removeCurrentAssignment);
    elements.dropZone.append(button);
    elements.pictureState.textContent = "Answered";
    elements.pictureState.classList.add("answered");
  } else {
    const placeholder = document.createElement("span");
    placeholder.className = "drop-placeholder";
    placeholder.textContent = "Choose a label from the tray";
    elements.dropZone.append(placeholder);
    elements.pictureState.textContent = "Not answered";
  }

  if (state.submitted) {
    elements.pictureCard.classList.add(isCorrect ? "correct" : "wrong");
    elements.pictureState.textContent = isCorrect ? "Correct" : "Needs review";
    elements.pictureState.className = `state-pill ${isCorrect ? "correct" : "wrong"}`;
    elements.answerNote.hidden = false;
    elements.answerNote.textContent = isCorrect ? "Correct" : `Correct answer: ${item.label}`;
  }

  elements.clearCurrent.disabled = state.submitted || !labelId;
  renderDots();
}

function renderDots() {
  elements.dotTrack.replaceChildren();
  state.order.forEach((imageId, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to picture ${index + 1}${state.assignments.has(imageId) ? ", answered" : ", unanswered"}`);
    if (state.assignments.has(imageId)) dot.classList.add("answered");
    if (index === state.currentIndex) dot.classList.add("current");
    if (state.submitted) dot.classList.add(state.assignments.get(imageId) === imageId ? "correct" : "wrong");
    dot.addEventListener("click", () => { state.currentIndex = index; renderCurrent(); });
    elements.dotTrack.append(dot);
  });
}

function updateProgress() {
  const count = state.assignments.size;
  const remaining = ITEMS.length - count;
  elements.placedCount.textContent = String(count);
  elements.progressLabel.textContent = "of 25 placed";
  elements.progressBar.style.width = `${(count / ITEMS.length) * 100}%`;
  elements.submit.disabled = count !== ITEMS.length || state.submitted;
  elements.submitHint.textContent = remaining === 0
    ? "All pictures are matched. Ready when you are."
    : `Match ${remaining} more ${remaining === 1 ? "picture" : "pictures"} to unlock your score.`;
}

function renderAll() {
  renderLabels();
  renderCurrent();
  updateProgress();
}

function submitQuiz() {
  if (state.assignments.size !== ITEMS.length) return;
  state.submitted = true;
  state.reviewCursor = 0;
  const incorrect = state.order.filter((id) => state.assignments.get(id) !== id);
  const score = ITEMS.length - incorrect.length;
  elements.score.textContent = String(score);
  document.querySelector("#result-message").textContent = score === ITEMS.length
    ? "Perfect score. Every picture is correct."
    : `${incorrect.length} ${incorrect.length === 1 ? "answer needs" : "answers need"} another look. Review them one at a time here.`;
  elements.review.hidden = incorrect.length === 0;
  elements.results.hidden = false;
  elements.submit.disabled = true;
  if (incorrect.length) {
    goToId(incorrect[0]);
    state.reviewCursor = 1;
  }
  renderAll();
  elements.results.focus();
  announce(`Quiz complete. Your score is ${score} out of ${ITEMS.length}.`);
}

function reviewNextMistake() {
  const incorrect = state.order.filter((id) => state.assignments.get(id) !== id);
  if (!incorrect.length) return;
  const id = incorrect[state.reviewCursor % incorrect.length];
  state.reviewCursor += 1;
  goToId(id);
  document.querySelector("#quiz-workspace").scrollIntoView({ behavior: "smooth", block: "start" });
  announce(`Reviewing mistake ${((state.reviewCursor - 1) % incorrect.length) + 1} of ${incorrect.length}.`);
}

function resetQuiz() {
  state.assignments.clear();
  state.order = shuffled(ITEMS.map((item) => item.id));
  state.labelOrder = ITEMS.map((item) => item.id).sort((a, b) => byId.get(a).label.localeCompare(byId.get(b).label));
  elements.labelSearch.value = "";
  state.currentIndex = 0;
  state.submitted = false;
  state.reviewCursor = 0;
  elements.results.hidden = true;
  renderAll();
  document.querySelector("#quiz-workspace").scrollIntoView({ behavior: "smooth", block: "start" });
  announce("Quiz reset and shuffled.");
}

elements.previous.addEventListener("click", () => moveCarousel(-1));
elements.next.addEventListener("click", () => moveCarousel(1));
elements.clearCurrent.addEventListener("click", removeCurrentAssignment);
elements.clearAll.addEventListener("click", () => {
  if (state.submitted) resetQuiz();
  else {
    state.assignments.clear();
    renderAll();
    announce("All labels returned to the magnet tray.");
  }
});
elements.submit.addEventListener("click", submitQuiz);
elements.review.addEventListener("click", reviewNextMistake);
elements.labelSearch.addEventListener("input", renderLabels);
document.querySelector("#retry-button").addEventListener("click", resetQuiz);

elements.pictureCard.addEventListener("dragover", (event) => {
  if (state.submitted) return;
  event.preventDefault();
  elements.pictureCard.classList.add("drag-over");
});
elements.pictureCard.addEventListener("dragleave", () => elements.pictureCard.classList.remove("drag-over"));
elements.pictureCard.addEventListener("drop", (event) => {
  event.preventDefault();
  elements.pictureCard.classList.remove("drag-over");
  const labelId = event.dataTransfer.getData("text/plain");
  if (labelId) assignLabel(currentId(), labelId);
});

document.addEventListener("keydown", (event) => {
  if (document.body.dataset.section !== "picture") return;
  if (event.target.closest("button")) return;
  if (event.key === "ArrowLeft") moveCarousel(-1);
  if (event.key === "ArrowRight") moveCarousel(1);
});

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const register = (tool) => {
    try { void Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch { /* optional browser feature */ }
  };
  register({
    name: "place_avop_labels",
    title: "Place AVOP labels",
    description: "Place one or more quiz labels onto picture IDs without submitting the quiz.",
    inputSchema: {
      type: "object",
      properties: {
        placements: {
          type: "array",
          items: {
            type: "object",
            properties: { pictureId: { type: "string" }, labelId: { type: "string" } },
            required: ["pictureId", "labelId"],
            additionalProperties: false,
          },
        },
      },
      required: ["placements"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      if (state.submitted || !Array.isArray(input?.placements)) throw new Error("Quiz is submitted or placements are invalid.");
      for (const placement of input.placements) {
        if (!byId.has(placement.pictureId) || !byId.has(placement.labelId)) throw new Error("Unknown pictureId or labelId.");
      }
      input.placements.forEach((placement) => assignLabel(placement.pictureId, placement.labelId, false, false));
      renderAll();
      return { placed: state.assignments.size, total: ITEMS.length };
    },
  });
  register({
    name: "submit_avop_quiz",
    title: "Submit AVOP quiz",
    description: "Submit the completed AVOP picture quiz and reveal the score.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute() {
      if (state.assignments.size !== ITEMS.length) throw new Error("Every picture must have a label before submission.");
      submitQuiz();
      const score = [...state.assignments].filter(([pictureId, labelId]) => pictureId === labelId).length;
      return { score, total: ITEMS.length };
    },
  });
}

renderAll();
registerWebMcpTools();
window.pictureQuiz = { refreshProgress: updateProgress };
