const DRIVING_BANK = [
  { id: "apron-1", category: "aprons", title: "Apron I (One)", prompt: "Point out Apron I on the map and state its primary use.", answer: ["South Terminal aircraft parking, positions 1A-1U.", "It is beside Apron II and the Ground Run-up Enclosure on the south side of the airport."], source: "ATD pp. 19, 23", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-2", category: "aprons", title: "Apron II (Two)", prompt: "Point out Apron II on the map and state its primary use.", answer: ["South Terminal aircraft parking, positions 2D-2G.", "Aprons I and II mainly serve small propeller aircraft at the South Terminal."], source: "ATD p. 19", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-3", category: "aprons", title: "Apron III (Three)", prompt: "Point out Apron III on the map and state its primary use.", answer: ["South Airport Operations aircraft parking, positions 301-303.", "It is home to several airline hangars and three aircraft parking positions."], source: "ATD p. 19", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-4", category: "aprons", title: "Apron IV (Four)", prompt: "Point out Apron IV on the map and state its primary use.", answer: ["Cargo aircraft parking, positions 401-403.", "It is north of the South Runway in the south-airport cargo area."], source: "ATD pp. 19-20", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-5", category: "aprons", title: "Apron V (Five)", prompt: "Point out Apron V on the map and state its primary use.", answer: ["Cargo aircraft parking, positions 501 and 502.", "It is north of the South Runway in the south-airport cargo area."], source: "ATD pp. 19-20", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-6", category: "aprons", title: "Apron VI (Six)", prompt: "Point out Apron VI and explain what makes it important.", answer: ["Main Terminal aircraft parking, gates 6-96.", "It surrounds the Main Terminal and is the most complex apron on the airfield."], source: "ATD pp. 19, 21", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-7", category: "aprons", title: "Apron VII (Seven)", prompt: "Point out Apron VII on the map and state its primary use.", answer: ["A private apron used for aircraft maintenance.", "It is east of the Main Terminal area and south of the North Runway."], source: "ATD p. 19; App. G map", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-8", category: "aprons", title: "Apron VIII (Eight)", prompt: "Point out Apron VIII on the map and state its primary use.", answer: ["Cargo aircraft parking, positions 801-803.", "It is north of the South Runway in the south-airport cargo area."], source: "ATD pp. 19-20", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },
  { id: "apron-9", category: "aprons", title: "Apron IX (Nine)", prompt: "Point out Apron IX and explain where it is located.", answer: ["A private cargo apron used by UPS.", "It is north of the North Runway and Taxiway N7, in hot spot HS5."], source: "ATD pp. 19, 21", image: "assets/da-april-testing-map.png", answerImage: "assets/da-april-training-map.png" },

  { id: "def-movement", category: "definitions", title: "Movement Area", prompt: "Define Movement Area. What surfaces does it include?", answer: ["All airport areas provided for aircraft movement, both controlled and uncontrolled.", "It includes taxiways, runways, helipads and Aprons. Memory tip: the manoeuvring area plus the Aprons."], source: "ATD p. 15" },
  { id: "def-manoeuvring", category: "definitions", title: "Manoeuvring Area", prompt: "Define Manoeuvring Area and name its three types of surface.", answer: ["The controlled surfaces used by aircraft for takeoff, landing and associated movement.", "The three surface types are runways, controlled taxiways and helipads."], source: "ATD p. 15" },
  { id: "def-airside", category: "definitions", title: "Airside", prompt: "Define Airside.", answer: ["All areas inside the airport's perimeter security fences, as defined in the Aerodrome Security Regulations."], source: "ATD p. 77" },
  { id: "def-fod", category: "definitions", title: "FOD", prompt: "What does FOD mean, and why is it a hazard?", answer: ["Foreign Object Debris/Damage.", "Debris or litter that could strike an aircraft, obstruct it or be ingested into an engine. It can also injure personnel when moved by jet blast or prop wash."], source: "ATD p. 77" },
  { id: "def-rvr", category: "definitions", title: "RVR", prompt: "What does RVR mean?", answer: ["Runway Visual Range: the horizontal measurement of visibility along a runway, measured in feet."], source: "ATD p. 79" },
  { id: "def-stand", category: "definitions", title: "Operational Stand", prompt: "Define an Operational Stand and describe where it is located.", answer: ["An Apron area where aircraft are parked and serviced for flights and where passengers enplane and deplane.", "It may have a passenger bridge or a pedestrian corridor between the stand and terminal entrance."], source: "ATD p. 78" },
  { id: "def-hos", category: "definitions", title: "Head-of-Stand (HOS)", prompt: "Define Head-of-Stand and point out where it runs.", answer: ["The vehicle corridor at the front of aircraft stands, adjacent to the terminal building.", "Most HOS roads have 3.9 m clearance, but some Domestic Terminal areas are as low as 2.9 m."], source: "ATD p. 16" },
  { id: "def-tos", category: "definitions", title: "Tail-of-Stand (TOS)", prompt: "Define Tail-of-Stand and point out where it runs.", answer: ["The vehicle corridor behind the tails of aircraft at operating stands, extending to the tail clearance/yield line.", "Watch for pushbacks and never drive behind aircraft whose engines are operating."], source: "ATD pp. 17, 79" },

  { id: "line-zipper", category: "markings", title: "Identify this line", prompt: "Name this marking and explain what it tells a driver.", answer: ["Zipper Lines: alternating white and black lines where a vehicle corridor crosses a taxilane or taxiway.", "Check for aircraft, remain inside the corridor, and cross quickly and safely without stopping."], source: "ATD p. 18", image: "assets/zipper-lines.png" },
  { id: "line-edge", category: "markings", title: "Identify this line", prompt: "Name this marking and explain what is beyond it.", answer: ["Taxiway Edge Markings: double yellow lines marking the taxiway edge.", "Beyond them, do not assume the surface is load-bearing. Aircraft wheels must never cross them."], source: "ATD p. 30", image: "assets/taxiway-edge-markings.png" },
  { id: "line-center", category: "markings", title: "Identify this line", prompt: "Name this line and explain who uses it.", answer: ["Taxiway Centerline: a solid yellow line with a black background.", "Pilots and tow operators use it to keep aircraft centred on taxiways and taxilanes. Centreline lights are green."], source: "ATD p. 31", image: "assets/taxiway-center-lines.png" },
  { id: "line-mad", category: "markings", title: "Identify this line", prompt: "Name this line, identify each side and state the crossing rule.", answer: ["Manoeuvring Area Delimitation (MAD) Line: one solid and one dashed yellow line on a black background.", "The solid line is on the uncontrolled side; the dashed line is on the controlled side. Do not cross the solid line without a D AVOP and ATC clearance."], source: "ATD pp. 25, 31", image: "assets/manoeuvring-area-delimitation-line.png" },
  { id: "line-runway-hold", category: "markings", title: "Identify this line", prompt: "Name this marking and state which side faces the runway.", answer: ["Runway Holding Position Marking: two solid and two dashed yellow lines.", "The solid lines are on the taxiway side; the dashed lines are on the runway side. Hold unless cleared by ATC."], source: "ATD p. 34", image: "assets/runway-holding-position-marking.png" },
  { id: "line-bridge-circle", category: "markings", title: "Identify this marking", prompt: "Name this marking and state its restriction.", answer: ["Bridge Return Circle: concentric red, white and red circles where passenger-bridge wheels are parked when not in use.", "Stopping, parking or driving through the circle is prohibited."], source: "ATD p. 25", image: "assets/bridge-return-circle.png" },
  { id: "line-bridge-safety", category: "markings", title: "Identify these lines", prompt: "Name these lines and state what is prohibited.", answer: ["Bridge Safety Lines: parallel red lines near passenger boarding bridges.", "No parking or driving is permitted inside the area they define."], source: "ATD p. 26", image: "assets/bridge-safety-lines.png" },
  { id: "line-apron-safety", category: "markings", title: "Identify these lines", prompt: "Name these lines and explain the safe side for equipment.", answer: ["Apron Safety Lines: adjacent red and white lines showing where equipment may be staged safely.", "Equipment must remain behind the red line unless actively servicing a parked aircraft."], source: "ATD p. 26", image: "assets/apron-safety-lines.png" },
  { id: "line-lead-in", category: "markings", title: "Identify this line", prompt: "Name this line and explain its purpose.", answer: ["Aircraft Lead-In Line: a yellow line pilots use to align an aircraft correctly on its stand.", "Its parking position appears on the black-and-yellow stand identifier, also called the price tag."], source: "ATD p. 25", image: "assets/aircraft-lead-in-lines.png" },
  { id: "line-tail", category: "markings", title: "Identify this line", prompt: "Name this line and explain what it marks.", answer: ["Tail/Wingtip Clearance Line: a solid white line, sometimes outlined in black.", "It marks the rear of the aircraft operating stand and may also form the inside edge of a Tail-of-Stand road."], source: "ATD p. 18", image: "assets/tail-wingtip-clearance-lines.png" },

  { id: "sign-mandatory", category: "signs", title: "Identify this sign", prompt: "Name this sign and explain what its colours tell you.", answer: ["Mandatory Instruction Sign: white lettering on a red background, located with runway hold markings.", "It marks where you must hold until ATC clears you onto the runway. Memory tip: white on red, runway ahead."], source: "ATD p. 35", image: "assets/mandatory-instruction-signs.png" },
  { id: "sign-location", category: "signs", title: "Identify this sign", prompt: "Name this sign and explain what it tells you.", answer: ["Taxiway Location Sign: yellow lettering on a black background.", "It identifies the taxiway you are currently on. Memory tip: black square, you are there."], source: "ATD p. 30", image: "assets/taxiway-location-signs.png" },
  { id: "sign-direction", category: "signs", title: "Identify this sign", prompt: "Name this sign and explain what it tells you.", answer: ["Taxiway Directional Sign: black lettering on a yellow background.", "It points toward another taxiway. Memory tip: black on yellow, route to follow."], source: "ATD p. 30", image: "assets/taxiway-directional-signs.png" },

  { id: "taxi-uncontrolled", category: "taxiways", title: "10 uncontrolled taxiways", prompt: "Name all 10 uncontrolled taxiways.", answer: ["Q, DR, DS, DT, DU, DV, DW, DY, F and C.", "Q is uncontrolled south of Canadian Service Road; C is uncontrolled south of Taxiway F. Aircraft always have right-of-way."], source: "ATD p. 29" },
  { id: "taxi-controlled", category: "taxiways", title: "8 controlled taxiway crossings", prompt: "Name the eight controlled taxiways crossed by vehicle corridors that become controlled crossings during LVO.", answer: ["P, S, T, J, R, V, K and H.", "At RVR below 1,200 ft, a D/A driver may not use these controlled crossings without the required D AVOP and ATC approval."], source: "ATD pp. 29, 50, 52" },

  { id: "safe-documents", category: "safety", title: "Arriving for the practical test", prompt: "What must you bring to the practical examination?", answer: ["Valid RAIC, government-issued photo ID/driver's licence and an airside safety vest.", "D AVOP candidates must also bring their ROC-A licence."], source: "ATD p. 93" },
  { id: "safe-precheck", category: "safety", title: "Before entering the test vehicle", prompt: "What two vehicle items must you check before getting in?", answer: ["Confirm the beacon is functional and that vehicle numbering is in place."], source: "ATD p. 93" },
  { id: "safe-speed", category: "safety", title: "Airside speed limits", prompt: "State the four standard speed limits the examiner may ask about.", answer: ["10 km/h: bag halls and baggage make-up areas.", "15 km/h: tunnel ramps and specified Head-of-Stand roads.", "25 km/h: vehicle corridors, Aprons and Movement Areas.", "40 km/h: airside roads unless otherwise posted."], source: "ATD p. 16" },
  { id: "safe-visibility", category: "safety", title: "RVO and LVO", prompt: "State the RVR ranges for Reduced and Low Visibility Operations.", answer: ["RVO: RVR between 2,600 ft and 1,200 ft.", "LVO: RVR between 1,200 ft and 600 ft. LVO takes effect airfield-wide when any single RVR reading is below 1,200 ft."], source: "ATD pp. 50, 79" },
  { id: "safe-lvo-crossing", category: "safety", title: "Flashing red LVO crossing sign", prompt: "A crossing sign's red lights are flashing during LVO. What does that mean for a D/A driver?", answer: ["The taxiway crossing is now controlled.", "A D/A driver cannot cross on the D/A permit alone; the crossing requires a D AVOP and ATC approval."], source: "ATD pp. 50, 52" },
  { id: "safe-priority", category: "safety", title: "Right-of-way priority", prompt: "Give the airside right-of-way order from highest to lowest priority.", answer: ["1. Aircraft under power or tow, including beaching gear, and vehicles exiting controlled surfaces.", "2. Emergency vehicles responding with lights and/or sirens.", "3. Passenger buses.", "4. Snow removal and Apron sweeping equipment.", "5. Fuel tankers.", "6. Airfield maintenance equipment.", "7. The vehicle to your right at an intersection."], source: "ATD p. 42" },
  { id: "safe-pushback", category: "safety", title: "Aircraft pushback indicators", prompt: "Name the indications that an aircraft may be about to push back.", answer: ["Wheel chocks removed; red anti-collision lights illuminated; wing walkers at the wingtips; tug connected; passenger bridge retracted; ground-service vehicles moved away.", "Not every indicator will be present. Stop or yield whenever unsure."], source: "ATD pp. 21, 42" },
  { id: "safe-aircraft-distance", category: "safety", title: "Distance from aircraft", prompt: "Unless servicing an aircraft, how far away must you remain?", answer: ["At least 7.5 m (25 ft). Do not drive under the aircraft's wings or tail."], source: "ATD p. 42" },
  { id: "safe-stop-bar", category: "safety", title: "Illuminated stop bar", prompt: "When may you cross an illuminated runway stop bar?", answer: ["Never. Pedestrians, vehicles and aircraft are prohibited from crossing a lit stop bar.", "During low visibility, ATC clearance is required and the stop bar must also be switched off."], source: "ATD p. 35" },
  { id: "safe-emergency", category: "safety", title: "Emergency vehicle approaching", prompt: "What must you do when an emergency vehicle approaches with lights and/or sirens?", answer: ["Yield and safely move out of its path without impeding it.", "Emergency vehicles include YVR Fire & Rescue, Operations, BC Ambulance, Richmond Fire Rescue, RCMP and YVR Security."], source: "ATD p. 43" },
];

const DRIVING_CATEGORY_LABELS = {
  all: "All topics",
  aprons: "Aprons",
  definitions: "Definitions",
  markings: "Lines & markings",
  signs: "Signs",
  taxiways: "Taxiways",
  safety: "Safety & test day",
};

const DRIVING_STORAGE_KEY = "avop-driving-progress-v1";
const drivingState = { category: "all", order: [], current: 0, ratings: new Map() };

const drivingElements = {
  answer: document.querySelector("#driving-answer"),
  answerContent: document.querySelector("#driving-answer-content"),
  answerFigure: document.querySelector("#driving-answer-figure"),
  answerImage: document.querySelector("#driving-answer-image"),
  card: document.querySelector("#driving-card"),
  cardCategory: document.querySelector("#driving-card-category"),
  cardCounter: document.querySelector("#driving-card-counter"),
  categories: document.querySelector("#driving-categories"),
  gotIt: document.querySelector("#driving-got-it"),
  mastered: document.querySelector("#driving-mastered"),
  next: document.querySelector("#driving-next"),
  practiceAgain: document.querySelector("#driving-practice-again"),
  previous: document.querySelector("#driving-previous"),
  prompt: document.querySelector("#driving-card-prompt"),
  questionCaption: document.querySelector("#driving-question-caption"),
  questionFigure: document.querySelector("#driving-question-figure"),
  questionImage: document.querySelector("#driving-question-image"),
  reveal: document.querySelector("#driving-reveal"),
  reviewed: document.querySelector("#driving-reviewed"),
  source: document.querySelector("#driving-source"),
  title: document.querySelector("#driving-card-title"),
};

function loadDrivingRatings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(DRIVING_STORAGE_KEY) || "{}");
    Object.entries(saved).forEach(([id, rating]) => {
      if (DRIVING_BANK.some((card) => card.id === id) && ["mastered", "practice"].includes(rating)) drivingState.ratings.set(id, rating);
    });
  } catch (_error) {
    drivingState.ratings.clear();
  }
}

function saveDrivingRatings() {
  try {
    window.localStorage.setItem(DRIVING_STORAGE_KEY, JSON.stringify(Object.fromEntries(drivingState.ratings)));
  } catch (_error) {
    // Progress still works for this session if storage is unavailable.
  }
}

function cardsForDrivingCategory(category) {
  return category === "all" ? [...DRIVING_BANK] : DRIVING_BANK.filter((card) => card.category === category);
}

function shuffleDrivingCards(cards) {
  const shuffled = [...cards];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swap]] = [shuffled[swap], shuffled[index]];
  }
  return shuffled;
}

function updateDrivingProgress() {
  const reviewed = drivingState.ratings.size;
  const mastered = [...drivingState.ratings.values()].filter((rating) => rating === "mastered").length;
  drivingElements.reviewed.textContent = String(reviewed);
  drivingElements.mastered.textContent = String(mastered);
  if (document.body.dataset.section === "driving") {
    document.querySelector("#placed-count").textContent = String(reviewed);
    document.querySelector("#progress-label").textContent = `of ${DRIVING_BANK.length} reviewed`;
    document.querySelector("#progress-bar").style.width = `${(reviewed / DRIVING_BANK.length) * 100}%`;
  }
}

function renderDrivingAnswer(card) {
  drivingElements.answerContent.replaceChildren();
  const list = document.createElement("ul");
  card.answer.forEach((line) => {
    const item = document.createElement("li");
    item.textContent = line;
    list.append(item);
  });
  drivingElements.answerContent.append(list);
}

function renderDrivingCard({ focus = false } = {}) {
  const card = drivingState.order[drivingState.current];
  if (!card) return;
  drivingElements.cardCategory.textContent = DRIVING_CATEGORY_LABELS[card.category];
  drivingElements.cardCounter.textContent = `Card ${drivingState.current + 1} of ${drivingState.order.length}`;
  drivingElements.title.textContent = card.title;
  drivingElements.prompt.textContent = card.prompt;
  drivingElements.source.textContent = card.source;
  drivingElements.answer.hidden = true;
  drivingElements.reveal.hidden = false;
  drivingElements.gotIt.classList.toggle("selected", drivingState.ratings.get(card.id) === "mastered");
  drivingElements.practiceAgain.classList.toggle("selected", drivingState.ratings.get(card.id) === "practice");
  drivingElements.previous.disabled = drivingState.current === 0;
  drivingElements.next.textContent = drivingState.current === drivingState.order.length - 1 ? "First card" : "Next";

  if (card.image) {
    drivingElements.questionFigure.classList.toggle("map-card", card.category === "aprons");
    drivingElements.questionImage.src = card.image;
    drivingElements.questionImage.alt = card.category === "aprons" ? "Blank D/A map for locating an apron" : `${card.title} practice image`;
    drivingElements.questionCaption.textContent = card.category === "aprons" ? "Point to the location before revealing the labeled map." : "Identify the feature before revealing the answer.";
    drivingElements.questionFigure.hidden = false;
  } else {
    drivingElements.questionFigure.hidden = true;
    drivingElements.questionImage.removeAttribute("src");
  }

  renderDrivingAnswer(card);
  if (card.answerImage) {
    drivingElements.answerFigure.classList.toggle("map-card", card.category === "aprons");
    drivingElements.answerImage.src = card.answerImage;
    drivingElements.answerImage.alt = `Labeled training map showing ${card.title}`;
    drivingElements.answerFigure.hidden = false;
  } else {
    drivingElements.answerFigure.hidden = true;
    drivingElements.answerImage.removeAttribute("src");
  }
  if (focus) drivingElements.card.focus({ preventScroll: true });
}

function setDrivingCategory(category) {
  drivingState.category = category;
  drivingState.order = cardsForDrivingCategory(category);
  drivingState.current = 0;
  drivingElements.categories.querySelectorAll("[data-driving-category]").forEach((button) => {
    const active = button.dataset.drivingCategory === category;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderDrivingCard({ focus: true });
}

function revealDrivingAnswer() {
  drivingElements.reveal.hidden = true;
  drivingElements.answer.hidden = false;
  drivingElements.answer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function rateDrivingCard(rating) {
  const card = drivingState.order[drivingState.current];
  drivingState.ratings.set(card.id, rating);
  saveDrivingRatings();
  updateDrivingProgress();
  drivingElements.gotIt.classList.toggle("selected", rating === "mastered");
  drivingElements.practiceAgain.classList.toggle("selected", rating === "practice");
}

drivingElements.categories.addEventListener("click", (event) => {
  const button = event.target.closest("[data-driving-category]");
  if (button) setDrivingCategory(button.dataset.drivingCategory);
});
drivingElements.reveal.addEventListener("click", revealDrivingAnswer);
drivingElements.gotIt.addEventListener("click", () => rateDrivingCard("mastered"));
drivingElements.practiceAgain.addEventListener("click", () => rateDrivingCard("practice"));
drivingElements.previous.addEventListener("click", () => {
  if (drivingState.current > 0) drivingState.current -= 1;
  renderDrivingCard({ focus: true });
});
drivingElements.next.addEventListener("click", () => {
  drivingState.current = drivingState.current === drivingState.order.length - 1 ? 0 : drivingState.current + 1;
  renderDrivingCard({ focus: true });
});
document.querySelector("#driving-shuffle").addEventListener("click", () => {
  drivingState.order = shuffleDrivingCards(cardsForDrivingCategory(drivingState.category));
  drivingState.current = 0;
  renderDrivingCard({ focus: true });
});
document.querySelector("#driving-reset-progress").addEventListener("click", () => {
  drivingState.ratings.clear();
  saveDrivingRatings();
  updateDrivingProgress();
  renderDrivingCard();
});

loadDrivingRatings();
drivingState.order = cardsForDrivingCategory("all");
renderDrivingCard();
updateDrivingProgress();
window.drivingExam = { refreshProgress: updateDrivingProgress };
