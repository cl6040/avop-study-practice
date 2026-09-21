const MCQ_BANK = [
  { id: "q01", page: 100, question: "What is a Movement Area?", answer: "All airport areas provided for aircraft movement, both controlled and uncontrolled.", distractors: ["Only runways used for takeoff and landing.", "Only uncontrolled Apron gate stands.", "All roads inside the airport perimeter fence."] },
  { id: "q02", page: 100, question: "What is a Manoeuvring Area?", answer: "Controlled surfaces used by aircraft for takeoff and landing, including runways, controlled taxiways and helipads.", distractors: ["All uncontrolled Apron gate stands.", "Any road used by emergency vehicles.", "Only the aircraft parking positions at gates."] },
  { id: "q03", page: 100, question: "What defines a Controlled Area?", answer: "An airside area that cannot be entered without ATC clearance.", distractors: ["An area that requires only a valid driver's licence.", "Any Apron at YVR.", "An area where no vehicle movement is permitted."] },
  { id: "q04", page: 100, question: "What defines an Uncontrolled Surface?", answer: "An area where vehicle movement is permitted without ATC clearance.", distractors: ["An area where aircraft are prohibited.", "A surface outside the perimeter fence.", "An area where speed limits do not apply."] },
  { id: "q05", page: 100, question: "What is the Airside Area?", answer: "All areas inside the airport's perimeter security fences.", distractors: ["Only runways and controlled taxiways.", "Only passenger terminal buildings.", "All public roads surrounding the airport."] },
  { id: "q06", page: 100, question: "What is a Vehicle Corridor?", answer: "A marked part of the Apron in which vehicles are authorized to travel.", distractors: ["A controlled taxiway used only by aircraft.", "A pedestrian path between terminal buildings.", "A parking area for unserviceable vehicles."] },
  { id: "q07", page: 100, question: "What number must be called to report all spills to Airport Operations?", answer: "604.207.7022", distractors: ["604.207.7070", "604.276.6287", "911 only"] },
  { id: "q08", page: 100, question: "How is an Emergency Responder Controlled Access Area made visible?", answer: "Orange cones, caution tape, emergency vehicles with lights on, or a combination of these.", distractors: ["Blue taxiway lights only.", "A solid yellow circle painted on the pavement.", "White barricades with no emergency lighting."] },
  { id: "q09", page: 101, question: "Are Aprons at YVR controlled or uncontrolled?", answer: "Uncontrolled", distractors: ["Controlled", "Controlled only at night", "Controlled only during low visibility"] },
  { id: "q10", page: 101, question: "Are the taxiways entering and exiting Apron 6 controlled or uncontrolled?", answer: "Controlled", distractors: ["Uncontrolled", "Controlled only in winter", "Uncontrolled when the Apron is empty"] },
  { id: "q11", page: 101, question: "How are helipads treated for driving purposes?", answer: "The same as runways.", distractors: ["The same as vehicle corridors.", "The same as uncontrolled Aprons.", "The same as parking stands."] },
  { id: "q12", page: 102, kind: "All of the above", question: "Drivers must reduce their speed:", answer: "All of the above", options: ["When approaching vehicle tunnels, blind corners and stop signs", "During low visibility", "In the vicinity of aircraft and Apron passenger path lines", "All of the above"] },
  { id: "q13", page: 101, question: "What colour are Runway Edge Lights?", answer: "White", options: ["Blue", "Red", "White", "Yellow"] },
  { id: "q14", page: 101, question: "What colour are Taxiway Edge Lights?", answer: "Blue", options: ["Blue", "Orange", "Yellow", "Green"] },
  { id: "q15", page: 101, question: "How are vehicle corridors marked on the Apron?", answer: "Two parallel solid white lines on a black background, about 7.5 m apart, with a dashed centreline.", distractors: ["Two solid yellow lines with no centreline.", "A single checkerboard line.", "Two red lines about 25 m apart."] },
  { id: "q16", page: 101, question: "What colour flashing lights do Emergency Vehicles display?", answer: "Red and blue", distractors: ["Blue only", "Amber and green", "White and amber"] },
  { id: "q17", page: 101, question: "Can you drive airside with your AVOP if your BC driver's licence is suspended?", answer: "No. You must also inform the AVOP office.", distractors: ["Yes, if your AVOP is still valid.", "Yes, but only on uncontrolled surfaces.", "Yes, for 30 days after the suspension."] },
  { id: "q18", page: 101, question: "What must you do if your vehicle becomes unserviceable outside a staging or parking area?", answer: "Contact Airport Operations and stay with the equipment until an ASO or designate attends.", distractors: ["Leave it and report it at the end of the shift.", "Move away immediately and call your supervisor only.", "Turn off the beacon and wait inside the terminal."] },
  { id: "q19", page: 101, question: "When do all airside operations cease during low visibility operations?", answer: "When Runway Visual Range is below 600 ft.", distractors: ["When Runway Visual Range is below 1,200 ft.", "When cloud height is below 600 ft.", "Whenever rain begins."] },
  { id: "q20", page: 101, question: "Before crossing the tail clearance line in the Domestic Horseshoe, what must a driver do?", answer: "Check for aircraft traffic and yield until it is safe to proceed.", distractors: ["Sound the horn and continue without stopping.", "Contact ATC for every crossing.", "Turn off the vehicle beacon."] },
  { id: "q21", page: 101, question: "When may a driver park or drive between bridge safety lines and bridge return circles?", answer: "Never", distractors: ["Only when the bridge is retracted.", "Only with a marshaller present.", "During low visibility operations."] },
  { id: "q22", page: 101, question: "Is passing an escort convoy permitted?", answer: "No. Never pass escorting vehicles and give way to the convoy at intersections.", distractors: ["Yes, if the corridor is clear.", "Yes, but only on Apron 6.", "Only emergency vehicles must not pass."] },
  { id: "q23", page: 101, question: "To support anti-idling, when should an engine be turned off after stopping?", answer: "When stopping for longer than 30 seconds.", distractors: ["After 2 minutes.", "After 5 minutes.", "Only when parked overnight."] },
  { id: "q24", page: 101, question: "How many units may a vehicle tow on Apron 6?", answer: "4 units", distractors: ["2 units", "5 units", "6 units"] },
  { id: "q25", page: 101, question: "What do flashing red lights on signs where roadways cross controlled taxiways indicate?", answer: "Low Visibility operations are active; only D AVOP operators may request permission from Nav Canada to cross.", distractors: ["The roadway is permanently closed.", "Aircraft have right-of-way only during daylight.", "The crossing is uncontrolled."] },
  { id: "q26", page: 102, kind: "All of the above", question: "Which of the following are not permitted while airside?", answer: "All of the above", options: ["Using personal listening devices", "Using a cellphone while operating a vehicle", "Smoking or vaping, including inside a vehicle", "All of the above"] },
  { id: "q27", page: 102, question: "Which surfaces are included in Manoeuvring Areas?", answer: "Runways, controlled taxiways and helipads.", distractors: ["Uncontrolled Aprons and public roads.", "Vehicle corridors and baggage rooms.", "Gate lounges and passenger bridges."] },
  { id: "q28", page: 102, question: "What is the maximum height on the ITB head-of-stand road?", answer: "3.9 m (12.8 ft)", distractors: ["2.0 m (6.5 ft)", "4.5 m (14.8 ft)", "7.5 m (25 ft)"] },
  { id: "q29", page: 102, question: "What is the speed limit on all Aprons and Movement Areas?", answer: "25 km/h", options: ["25 km/h", "40 km/h", "30 km/h", "15 km/h"] },
  { id: "q30", page: 102, question: "What is the speed limit on airside roads unless otherwise posted?", answer: "40 km/h", distractors: ["10 km/h", "15 km/h", "25 km/h"] },
  { id: "q31", page: 102, question: "What is the speed limit in tunnel ramps and the head-of-stand roadway between B and C piers?", answer: "15 km/h", distractors: ["10 km/h", "25 km/h", "40 km/h"] },
  { id: "q32", page: 102, question: "What is the speed limit in baggage make-up areas?", answer: "10 km/h", distractors: ["15 km/h", "25 km/h", "40 km/h"] },
  { id: "q33", page: 102, question: "Which list contains only the 10 uncontrolled taxiways?", answer: "Q, DR, DS, DT, DU, DV, DW, DY, F and C", distractors: ["P, S, T, J, R, V, K and H", "A, B, C, D, E, F, G, H, J and K", "Q, P, S, T, J, R, V, K, H and F"] },
  { id: "q34", page: 102, question: "What must an operator hold to drive on a Manoeuvring Area?", answer: "A valid D AVOP", distractors: ["A valid DA AVOP only", "A RAIC without an AVOP", "A provincial driver's licence only"] },
  { id: "q35", page: 103, question: "When must vehicle operators wear high-visibility clothing airside?", answer: "At all times in the airside environment.", distractors: ["Only during darkness.", "Only on controlled surfaces.", "Only when outside a vehicle for more than 30 seconds."] },
  { id: "q36", page: 103, question: "Which surfaces or hazards must vehicles never drive over?", answer: "Spills, bridge safety lines, pedestrian crossings and Apron passenger pathways.", distractors: ["Vehicle corridors and stop bars only.", "Dashed centrelines and start boxes.", "Taxiway location signs and edge lights."] },
  { id: "q37", page: 103, question: "A vehicle is considered over-height when it is higher than:", answer: "2.0 metres", options: ["1.5 metres", "2.0 metres", "2.5 metres", "3.0 metres"] },
  { id: "q38", page: 103, question: "Where is vehicle movement permitted without ATC clearance?", answer: "The Uncontrolled Area", distractors: ["The Manoeuvring Area", "Any runway", "All controlled taxiways"] },
  { id: "q39", page: 102, question: "What does FOD stand for?", answer: "Foreign Object Debris", distractors: ["Flight Operations Directive", "Foreign Operations Division", "Field Obstruction Distance"] },
  { id: "q40", page: 103, kind: "All of the above", question: "Which of the following indicate that an aircraft is about to push back or turn out from a gate?", answer: "All of the above", options: ["Wing walkers are positioned on one or more wingtips", "A tug is connected and the anti-collision lights are on", "The passenger bridge is retracted and service vehicles are clear", "All of the above"] },
  { id: "q41", page: 103, question: "What minimum distance must a vehicle remain from an aircraft unless servicing it?", answer: "7.5 m / 25 ft", options: ["10 m / 32.8 ft", "7.5 m / 25 ft", "25 m / 85 ft", "5.0 m / 16.4 ft"] },
  { id: "q42", page: 103, question: "What vehicle lighting must be on at all times airside?", answer: "The vehicle beacon, or four-way flashers if no beacon is fitted.", distractors: ["Headlights only.", "High beams and hazard lights together.", "No lights are required during daylight."] },
  { id: "q43", page: 103, question: "On which side of an Apron safety line may a vehicle safely park?", answer: "Inside the white line.", distractors: ["Outside the white line.", "Directly on the white line.", "Either side if the beacon is on."] },
  { id: "q44", page: 103, question: "When may a vehicle cross an illuminated Runway Stop Bar?", answer: "Never", distractors: ["After receiving verbal ATC clearance.", "When no aircraft are visible.", "Only during daylight."] },
  { id: "q45", page: 103, question: "Which are the eight controlled taxiways crossed by vehicle corridors in normal weather?", answer: "P, S, T, J, R, V, K and H", distractors: ["Q, DR, DS, DT, DU, DV, DW and DY", "A, B, C, D, E, F, G and H", "P, Q, R, S, T, U, V and W"] },
  { id: "q46", page: 104, question: "Who has the highest right-of-way priority?", answer: "Aircraft under power or tow, including beaching gear, and vehicles exiting controlled surfaces.", distractors: ["Passenger buses.", "Fuel tankers.", "The vehicle approaching from the right."] },
  { id: "q47", page: 104, question: "Who enforces the Airside Traffic Directives?", answer: "Designated Airport Operations, Airport Security, RCMP and other designated Airport Authority personnel.", distractors: ["Only Nav Canada controllers.", "Only airline supervisors.", "Only municipal police officers."] },
  { id: "q48", page: 104, kind: "Fill in the blank", question: "Zipper lines warn drivers that a ______ crosses the vehicle corridor.", answer: "Taxilane or taxiway", options: ["Crosswalk", "Taxilane or taxiway", "Runway", "Passenger bridge"] },
  { id: "q49", page: 104, question: "Where should you normally drive around the Domestic Horseshoe?", answer: "On the building side of the tail/wingtip clearance line, unless that prevents maintaining 7.5 m from a parked aircraft.", distractors: ["Always on the aircraft side of the line.", "Directly over the tail clearance line.", "Only inside the bridge return circles."] },
  { id: "q50", page: 104, question: "What must you never do in a Bridge Return Circle?", answer: "Park or drive through it because the bridge could move at any time.", distractors: ["Stop briefly with hazard lights on.", "Cross it when the bridge is retracted.", "Use it as a vehicle turning area."] },
  { id: "q51", page: 104, question: "Does the Manoeuvring Area Delimitation line separate controlled and uncontrolled surfaces?", answer: "Yes", distractors: ["No", "Only during low visibility", "Only on Apron 6"] },
  { id: "q52", page: 104, question: "When may a driver cross the solid Manoeuvring Area Delimitation line?", answer: "Only with a D AVOP and ATC clearance.", distractors: ["Whenever the adjacent taxiway is empty.", "With a DA AVOP and no radio contact.", "Only when following a passenger bus."] },
  { id: "q53", page: 104, question: "What must you do when a YVR Fire & Rescue vehicle approaches with lights or sirens?", answer: "Yield and move out of the way without impeding its path.", distractors: ["Continue at the posted speed.", "Stop in the middle of the vehicle corridor.", "Follow directly behind it."] },
  { id: "q54", page: 104, question: "What should a driver do after an airside traffic accident?", answer: "Stop, assist if needed, call 911 if needed, freeze the scene and contact Airport Operations with the required details.", distractors: ["Move all vehicles immediately and report it after the shift.", "Contact only the employer and leave the scene.", "Continue driving if no aircraft were involved."] },
  { id: "q55", page: 2, kind: "Image identification", image: "assets/runway-edge-lights.png", imageAlt: "Runway edge light", question: "The light shown in the image indicates:", answer: "Runway Edge Lights", options: ["Runway Edge Lights", "Stop Bars", "Taxiway Edge Lights", "Apron Safety Lights"] },
  { id: "q56", page: 2, kind: "Image identification", image: "assets/runway-holding-position-marking.png", imageAlt: "Yellow runway holding position pavement marking", question: "The marking shown in the image indicates:", answer: "Runway Hold Lines", options: ["Manoeuvring Area Delimitation Lines", "Taxiway Intersection Lines", "Runway Hold Lines", "Runway Threshold Markings"] },
  { id: "q57", page: 2, kind: "Image identification", image: "assets/mandatory-instruction-signs.png", imageAlt: "Red and white airside sign", question: "The red-and-white portion of the sign indicates a:", answer: "Mandatory Instruction Sign", options: ["Taxiway Location Sign", "Taxiway Directional Sign", "Mandatory Instruction Sign", "Runway Location Sign"] },
  { id: "q58", page: 3, kind: "Image identification", image: "assets/stop-bars.png", imageAlt: "Red stop bar lights at a runway holding position", question: "The lights shown in the image indicate:", answer: "Stop Bars", options: ["Stop Bars", "Runway Edge Lights", "Taxiway Edge Lights", "Landing Lights"] },
  { id: "q59", page: 6, kind: "Image identification", image: "assets/pedestrian-crosswalk.png", imageAlt: "White pedestrian crosswalk pavement marking", question: "What does this pavement marking indicate?", answer: "Pedestrian Crosswalk", options: ["Passenger Walkway", "Golf Cart Lane", "Pedestrian Crosswalk", "Stop Line"] },
  { id: "q60", page: 6, kind: "Image identification", image: "assets/taxiway-center-lines.png", imageAlt: "Yellow taxiway centre line", question: "Taxiway centre lines are solid yellow. What colour are the taxiway centreline lights?", answer: "Green", options: ["Yellow", "Blue", "Red", "Green"] },
];

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleSeeded(list, seed) {
  const random = seededRandom(seed);
  const copy = [...list];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function textSeed(text) {
  return [...text].reduce((value, character) => Math.imul(value ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;
}

const mcqState = { setIndex: 0, questions: [], answers: new Map(), current: 0, submitted: false, reviewCursor: 0 };
const mcqElements = {
  card: document.querySelector("#mcq-card"),
  correction: document.querySelector("#mcq-correction"),
  counter: document.querySelector("#mcq-counter"),
  dots: document.querySelector("#mcq-dots"),
  hint: document.querySelector("#mcq-hint"),
  image: document.querySelector("#mcq-image"),
  next: document.querySelector("#mcq-next"),
  options: document.querySelector("#mcq-options"),
  previous: document.querySelector("#mcq-previous"),
  question: document.querySelector("#mcq-question"),
  reset: document.querySelector("#mcq-reset"),
  results: document.querySelector("#mcq-results"),
  review: document.querySelector("#mcq-review"),
  score: document.querySelector("#mcq-score"),
  state: document.querySelector("#mcq-state"),
  submit: document.querySelector("#mcq-submit"),
};

function buildSet(setIndex) {
  const seed = 20260820 + (setIndex * 7919);
  const imageQuestions = MCQ_BANK.filter((question) => question.image);
  const allAboveQuestions = MCQ_BANK.filter((question) => question.kind === "All of the above");
  const fillBlankQuestions = MCQ_BANK.filter((question) => question.kind === "Fill in the blank");
  const generalQuestions = MCQ_BANK.filter((question) => !question.image && !["All of the above", "Fill in the blank"].includes(question.kind));
  return shuffleSeeded([
    ...shuffleSeeded(imageQuestions, seed).slice(0, 3),
    ...shuffleSeeded(allAboveQuestions, seed + 1).slice(0, 2),
    ...shuffleSeeded(fillBlankQuestions, seed + 2).slice(0, 1),
    ...shuffleSeeded(generalQuestions, seed + 3).slice(0, 19),
  ], seed + 4);
}

function optionList(question) {
  return question.options || shuffleSeeded([question.answer, ...question.distractors], textSeed(`${question.id}-${mcqState.setIndex}`));
}

function questionKind(question) {
  if (question.kind) return question.kind;
  if (/which (list|group)|which are the/i.test(question.question)) return "Select the list";
  if (/when|before|after|what must|what should/i.test(question.question)) return "Operational scenario";
  return "Rule recall";
}

function renderMcqQuestion() {
  const question = mcqState.questions[mcqState.current];
  const selected = mcqState.answers.get(question.id);
  mcqElements.counter.textContent = `Question ${mcqState.current + 1} of 25 · ${questionKind(question)} · Ref. p. ${question.page}`;
  mcqElements.question.textContent = question.question;
  if (question.image) {
    mcqElements.image.src = question.image;
    mcqElements.image.alt = question.imageAlt || "Question reference image";
    mcqElements.image.hidden = false;
  } else {
    mcqElements.image.hidden = true;
    mcqElements.image.removeAttribute("src");
  }
  mcqElements.options.replaceChildren();
  mcqElements.card.classList.remove("correct", "wrong");
  mcqElements.correction.hidden = true;

  for (const option of optionList(question)) {
    const label = document.createElement("label");
    label.className = "mcq-option";
    if (selected === option) label.classList.add("selected");
    if (mcqState.submitted && option === question.answer) label.classList.add("correct");
    if (mcqState.submitted && selected === option && option !== question.answer) label.classList.add("wrong");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "mcq-answer";
    input.value = option;
    input.checked = selected === option;
    input.disabled = mcqState.submitted;
    input.addEventListener("change", () => {
      mcqState.answers.set(question.id, option);
      renderMcq();
    });
    const text = document.createElement("span");
    text.textContent = option;
    label.append(input, text);
    mcqElements.options.append(label);
  }

  if (mcqState.submitted) {
    const correct = selected === question.answer;
    mcqElements.card.classList.add(correct ? "correct" : "wrong");
    mcqElements.state.textContent = correct ? "Correct" : "Needs review";
    mcqElements.state.className = `state-pill ${correct ? "correct" : "wrong"}`;
    if (!correct) {
      mcqElements.correction.hidden = false;
      mcqElements.correction.textContent = `Correct answer: ${question.answer}`;
    }
  } else {
    mcqElements.state.textContent = selected ? "Answered" : "Not answered";
    mcqElements.state.className = `state-pill${selected ? " answered" : ""}`;
  }

  mcqElements.previous.disabled = mcqState.current === 0;
  mcqElements.next.disabled = mcqState.current === 24;
  renderMcqDots();
}

function renderMcqDots() {
  mcqElements.dots.replaceChildren();
  mcqState.questions.forEach((question, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "mcq-dot";
    dot.setAttribute("aria-label", `Go to question ${index + 1}${mcqState.answers.has(question.id) ? ", answered" : ", unanswered"}`);
    if (mcqState.answers.has(question.id)) dot.classList.add("answered");
    if (index === mcqState.current) dot.classList.add("current");
    if (mcqState.submitted) dot.classList.add(mcqState.answers.get(question.id) === question.answer ? "correct" : "wrong");
    dot.addEventListener("click", () => { mcqState.current = index; renderMcqQuestion(); });
    mcqElements.dots.append(dot);
  });
}

function updateMcqProgress() {
  const answered = mcqState.answers.size;
  const remaining = 25 - answered;
  mcqElements.submit.disabled = answered !== 25 || mcqState.submitted;
  mcqElements.hint.textContent = remaining === 0 ? "All questions answered. Ready to score this set." : `Answer ${remaining} more ${remaining === 1 ? "question" : "questions"} to unlock your score.`;
  if (document.body.dataset.section === "mcq") {
    document.querySelector("#placed-count").textContent = String(answered);
    document.querySelector("#progress-label").textContent = "of 25 answered";
    document.querySelector("#progress-bar").style.width = `${answered * 4}%`;
  }
}

function renderMcq() {
  renderMcqQuestion();
  updateMcqProgress();
}

function chooseSet(setIndex) {
  mcqState.setIndex = setIndex;
  mcqState.questions = buildSet(setIndex);
  mcqState.answers.clear();
  mcqState.current = 0;
  mcqState.submitted = false;
  mcqState.reviewCursor = 0;
  mcqElements.results.hidden = true;
  document.querySelectorAll(".set-button").forEach((button) => {
    const active = Number(button.dataset.set) === setIndex;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderMcq();
}

function submitMcq() {
  if (mcqState.answers.size !== 25) return;
  mcqState.submitted = true;
  const incorrect = mcqState.questions.filter((question) => mcqState.answers.get(question.id) !== question.answer);
  const score = 25 - incorrect.length;
  mcqElements.score.textContent = String(score);
  document.querySelector("#mcq-result-message").textContent = score === 25 ? "Perfect score. Every answer is correct." : `${incorrect.length} ${incorrect.length === 1 ? "answer needs" : "answers need"} another look.`;
  mcqElements.review.hidden = incorrect.length === 0;
  mcqElements.results.hidden = false;
  if (incorrect.length) {
    mcqState.current = mcqState.questions.indexOf(incorrect[0]);
    mcqState.reviewCursor = 1;
  }
  renderMcq();
  mcqElements.results.focus();
}

function reviewNextMcqMistake() {
  const incorrect = mcqState.questions.filter((question) => mcqState.answers.get(question.id) !== question.answer);
  if (!incorrect.length) return;
  const question = incorrect[mcqState.reviewCursor % incorrect.length];
  mcqState.reviewCursor += 1;
  mcqState.current = mcqState.questions.indexOf(question);
  renderMcqQuestion();
}

const STUDY_SECTIONS = new Set(["mcq", "picture", "map", "da-map"]);

function showSection(section, { updateUrl = true } = {}) {
  if (!STUDY_SECTIONS.has(section)) section = "mcq";
  document.body.dataset.section = section;
  document.querySelector("#multiple-choice-practice").hidden = section !== "mcq";
  document.querySelector("#picture-practice").hidden = section !== "picture";
  document.querySelector("#map-practice").hidden = section !== "map";
  document.querySelector("#da-map-practice").hidden = section !== "da-map";
  document.querySelectorAll("[data-section-target]").forEach((button) => {
    const active = button.dataset.sectionTarget === section;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  if (section === "mcq") updateMcqProgress();
  if (section === "picture") window.pictureQuiz?.refreshProgress();
  if (section === "map") window.mapQuiz?.refreshProgress();
  if (section === "da-map") window.daMapQuiz?.refreshProgress();
  if (updateUrl) {
    const url = new URL(window.location.href);
    if (section === "mcq") url.searchParams.delete("section");
    else url.searchParams.set("section", section);
    window.history.replaceState({}, "", url);
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

document.querySelectorAll("[data-section-target]").forEach((button) => button.addEventListener("click", () => showSection(button.dataset.sectionTarget)));
document.querySelectorAll(".set-button").forEach((button) => button.addEventListener("click", () => chooseSet(Number(button.dataset.set))));
mcqElements.previous.addEventListener("click", () => { if (mcqState.current > 0) { mcqState.current -= 1; renderMcqQuestion(); } });
mcqElements.next.addEventListener("click", () => { if (mcqState.current < 24) { mcqState.current += 1; renderMcqQuestion(); } });
mcqElements.reset.addEventListener("click", () => chooseSet(mcqState.setIndex));
mcqElements.submit.addEventListener("click", submitMcq);
mcqElements.review.addEventListener("click", reviewNextMcqMistake);
document.querySelector("#mcq-retry").addEventListener("click", () => chooseSet(mcqState.setIndex));

chooseSet(0);
const requestedSection = new URLSearchParams(window.location.search).get("section");
showSection(STUDY_SECTIONS.has(requestedSection) ? requestedSection : "mcq", { updateUrl: false });
