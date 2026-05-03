const scenes = {
  start: {
    title: "The Street With No Sound",
    text: "Mia is a small 9-year-old girl with shoulder-length dark hair, an oversized yellow raincoat over a faded blue dress, scuffed red shoes, and a tiny flashlight in one hand and a worn stuffed rabbit in the other. She is lost at midnight, and seven numbered paths stretch out in front of her.",
    choices: [
      { text: "Path 1: Old church road", next: "church" },
      { text: "Path 2: Breathing woods trail", next: "woods" },
      { text: "Path 3: Empty playground", next: "playground" },
      { text: "Path 4: Foggy train station", next: "station" },
      { text: "Path 5: Abandoned hospital gate", next: "hospital" },
      { text: "Path 6: Riverside steps", next: "river" },
      { text: "Path 7: Market alley lights", next: "market" },
    ],
  },

  church: {
    title: "Bells at Midnight",
    text: "The church doors are half open. A phone booth flickers nearby.",
    choices: [
      { text: "Use the phone booth", next: "safe_call" },
      { text: "Enter the church", next: "shadow_pew" },
    ],
  },

  woods: {
    title: "The Breathing Trees",
    text: "A lantern glows deeper in the forest and something walks behind Mia.",
    choices: [
      { text: "Follow the lantern", next: "lantern_man" },
      { text: "Jump a broken fence", next: "safe_fence" },
    ],
  },

  playground: {
    title: "Swings That Move Alone",
    text: "The swings creak in the windless dark. A tunnel waits under the slide.",
    choices: [
      { text: "Enter the tunnel", next: "tunnel" },
      { text: "Follow a stray cat", next: "cat_path" },
    ],
  },

  station: {
    title: "Foggy Platform",
    text: "A silent train arrives with empty windows. A guard waves from far away.",
    choices: [
      { text: "Run to the guard", next: "safe_guard" },
      { text: "Board the empty train", next: "ghost_train" },
    ],
  },

  hospital: {
    title: "Broken Hospital Gate",
    text: "The gate is open. A lit office says SECURITY, and a dark hallway whispers.",
    choices: [
      { text: "Go to security office", next: "safe_security" },
      { text: "Walk the dark hallway", next: "ward_13" },
    ],
  },

  river: {
    title: "Riverside Steps",
    text: "Water is black under the bridge. A rescue phone hangs on a pole.",
    choices: [
      { text: "Use the rescue phone", next: "safe_rescue" },
      { text: "Follow the waterline", next: "drowned_path" },
    ],
  },

  market: {
    title: "Neon Market Alley",
    text: "Shops are closed, but one light blinks OPEN. A side alley glows red.",
    choices: [
      { text: "Knock at the OPEN shop", next: "safe_shop" },
      { text: "Take the red alley", next: "red_alley" },
    ],
  },

  safe_call: { title: "Ending: Ringing Home", text: "Mia calls home and is picked up safely. The bells stop. ?", ending: true },
  safe_fence: { title: "Ending: Streetlights", text: "Mia reaches a lit road and gets help. ?", ending: true },
  safe_guard: { title: "Ending: Station Guard", text: "The guard radios police and Mia gets home safely. ?", ending: true },
  safe_security: { title: "Ending: Security Desk", text: "Security verifies Mia and contacts her family. ?", ending: true },
  safe_rescue: { title: "Ending: Riverside Rescue", text: "The rescue call brings help quickly. Mia returns home. ?", ending: true },
  safe_shop: { title: "Ending: Kind Shopkeeper", text: "A shopkeeper gives Mia shelter and calls her parents. ?", ending: true },

  shadow_pew: { title: "Ending: The Last Pew", text: "A whisper says Mia's name from the dark behind her. ?", ending: true },
  lantern_man: { title: "Ending: Lantern Smile", text: "The lantern holder has no face, and the path vanishes. ?", ending: true },
  tunnel: { title: "Ending: Chalk Tunnel", text: "A drawing on the wall shows Mia before she arrived. ?", ending: true },
  cat_path: { title: "Ending: Mirror Window", text: "Mia sees herself already inside her own house. ?", ending: true },
  ghost_train: { title: "Ending: Last Stop", text: "The train doors lock and never open again. ?", ending: true },
  ward_13: { title: "Ending: Ward 13", text: "Every room is empty except one with her name on the bed. ?", ending: true },
  drowned_path: { title: "Ending: Black Water", text: "Footsteps appear beside hers, but no one is there. ?", ending: true },
  red_alley: { title: "Ending: Red Hall", text: "The alley loops forever back to the same red door. ?", ending: true },
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

