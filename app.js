const scenes = {
  start: {
    title: "A Quiet Road",
    text: "Mia is lost at dusk. She sees a lit bakery street, a dark forest path, and a park with a fountain.",
    choices: [
      { text: "Follow the bakery street", next: "bakery" },
      { text: "Take the forest path", next: "forest" },
      { text: "Go to the park fountain", next: "park" },
    ],
  },
  bakery: {
    title: "Warm Lights",
    text: "The baker offers help. Mia can ask to call home, keep walking, or check a bus map nearby.",
    choices: [
      { text: "Ask the baker to call home", next: "good_home_call" },
      { text: "Keep walking alone", next: "bad_circle" },
      { text: "Check the bus map", next: "bus_map" },
    ],
  },
  forest: {
    title: "Whispering Trees",
    text: "The path is quiet and confusing. Mia hears a dog barking and sees a ranger station light far away.",
    choices: [
      { text: "Follow the barking dog", next: "dog_friend" },
      { text: "Walk toward the ranger station", next: "ranger_help" },
      { text: "Turn back quickly", next: "start" },
    ],
  },
  park: {
    title: "The Fountain",
    text: "A map sign stands by the fountain. A musician nearby says he knows the neighborhood.",
    choices: [
      { text: "Use the map sign", next: "map_route" },
      { text: "Ask the musician for help", next: "musician_tip" },
      { text: "Sit and wait", next: "night_cold" },
    ],
  },
  bus_map: {
    title: "Route Numbers",
    text: "Mia finds her street name on the map. She can take bus 7, or wait for her mom at the stop.",
    choices: [
      { text: "Take bus 7", next: "good_bus_home" },
      { text: "Wait at the stop", next: "okay_wait" },
    ],
  },
  dog_friend: {
    title: "A Friendly Dog",
    text: "The dog leads Mia to a family walking nearby. They offer to contact police support.",
    choices: [
      { text: "Accept their help", next: "good_police_reunion" },
      { text: "Run away scared", next: "bad_deeper_forest" },
    ],
  },
  ranger_help: {
    title: "Ranger Cabin",
    text: "The ranger recognizes Mia's school badge and calls her parents.",
    choices: [{ text: "Stay and wait safely", next: "good_ranger_home" }],
  },
  map_route: {
    title: "Street by Street",
    text: "The map shows two routes: a short alley or a longer well-lit avenue.",
    choices: [
      { text: "Take the well-lit avenue", next: "good_walk_home" },
      { text: "Take the short alley", next: "bad_wrong_turn" },
    ],
  },
  musician_tip: {
    title: "A Helpful Song",
    text: "The musician points to a safe community center with a phone.",
    choices: [
      { text: "Go to the community center", next: "good_center_call" },
      { text: "Ignore and wander", next: "bad_circle" },
    ],
  },

  good_home_call: { title: "Ending: Home Call", text: "The baker calls Mia's mom. She is picked up safely. ??", ending: true },
  good_bus_home: { title: "Ending: Bus Ride", text: "Mia rides the correct bus and reaches her block safely. ??", ending: true },
  good_police_reunion: { title: "Ending: Reunion", text: "Support staff locate her family quickly. Mia gets home safely. ??", ending: true },
  good_ranger_home: { title: "Ending: Ranger Rescue", text: "The ranger keeps Mia safe until her parents arrive. ??", ending: true },
  good_walk_home: { title: "Ending: Safe Route", text: "Mia follows the lit streets and finds her front door. ??", ending: true },
  good_center_call: { title: "Ending: Community Help", text: "At the center, Mia calls home and is reunited safely. ??", ending: true },

  okay_wait: { title: "Ending: Long Wait", text: "Mia waits a long time but eventually gets help from a patrol officer. ??", ending: true },
  night_cold: { title: "Ending: Cold Night", text: "Waiting too long makes things harder, but a jogger helps her get support. ??", ending: true },

  bad_circle: { title: "Ending: Lost Loop", text: "Mia circles the same blocks and gets more confused before outside help finds her. ??", ending: true },
  bad_deeper_forest: { title: "Ending: Deeper Forest", text: "Mia runs deeper into the woods and needs a search team. ??", ending: true },
  bad_wrong_turn: { title: "Ending: Wrong Turn", text: "The alley route leads away from home and delays rescue. ??", ending: true },
};

const sceneTitle = document.getElementById("sceneTitle");
const sceneText = document.getElementById("sceneText");
const choicesEl = document.getElementById("choices");
const restartBtn = document.getElementById("restartBtn");
const pathLog = document.getElementById("pathLog");

let current = "start";
let log = [];

function render() {
  const scene = scenes[current];
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  choicesEl.innerHTML = "";

  if (scene.ending) {
    restartBtn.classList.remove("hidden");
  } else {
    restartBtn.classList.add("hidden");
    scene.choices.forEach((c) => {
      const btn = document.createElement("button");
      btn.textContent = c.text;
      btn.addEventListener("click", () => {
        log.push(c.text);
        current = c.next;
        renderLog();
        render();
      });
      choicesEl.appendChild(btn);
    });
  }
}

function renderLog() {
  pathLog.innerHTML = "";
  log.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = entry;
    pathLog.appendChild(li);
  });
}

restartBtn.addEventListener("click", () => {
  current = "start";
  log = [];
  renderLog();
  render();
});

render();
