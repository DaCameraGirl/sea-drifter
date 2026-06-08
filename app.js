// 👧 Mouse-Following Little Girl
const mia = document.getElementById('mia-follower');
let mouseX = 0, mouseY = 0;
let miaX = 0, miaY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // ✨ Create sparkle trail
  if (Math.random() > 0.7) {
    createSparkle(e.clientX, e.clientY);
  }
});

// Smooth mia following
function animateMia() {
  miaX += (mouseX - miaX) * 0.15;
  miaY += (mouseY - miaY) * 0.15;
  
  // Flip mia based on direction
  const direction = mouseX > miaX ? 'scaleX(1)' : 'scaleX(-1)';
  mia.style.left = (miaX - 20) + 'px';
  mia.style.top = (miaY - 20) + 'px';
  mia.style.transform = direction;
  
  requestAnimationFrame(animateMia);
}
animateMia();

// ✨ Sparkle creation
function createSparkle(x, y) {
  const sparkles = ['✨', '⭐', '💖', '🌟', '💫'];
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
  sparkle.style.left = (x + Math.random() * 20 - 10) + 'px';
  sparkle.style.top = (y + Math.random() * 20 - 10) + 'px';
  document.body.appendChild(sparkle);
  
  setTimeout(() => sparkle.remove(), 1000);
}

// 🌙 Story Data
const paths = {
  1: { 
    name: '⛪ Old church road', 
    emoji: '⛪',
    story: 'Michaela walked toward the old stone church 🪨. The bells rang softly... a kind priest opened the door and offered her warm cocoa ☕. She felt safe.',
    ending: '✨ GOOD ENDING ✨'
  },
  2: { 
    name: '🌲 Breathing woods trail', 
    emoji: '🌲',
    story: 'The trees whispered her name 🍃. Michaela followed glowing fireflies 🦋... but the woods grew darker, and her flashlight flickered. 🔦',
    ending: '🌙 MIXED ENDING 🌙'
  },
  3: { 
    name: '🎠 Empty playground', 
    emoji: '🎠',
    story: 'The swings creaked in the wind 🌬️. A friendly ghost child 👻 took her hand and led her to a kind old lady\'s house. 🏠',
    ending: '✨ GOOD ENDING ✨'
  },
  4: { 
    name: '🚂 Foggy train station', 
    emoji: '🚂',
    story: 'A mysterious train arrived 🚂💨. The conductor smiled... but the train went somewhere unknown. Michaela waved goodbye to her old life. 👋',
    ending: '⚫ BAD ENDING ⚫'
  },
  5: { 
    name: '🏥 Abandoned hospital gate', 
    emoji: '🏥',
    story: 'Cold hands reached through the gate 🥶. Michaela ran fast! 🏃‍♀️ She found a kind nurse 👩‍⚕️ who called her parents. 📞',
    ending: '🌙 MIXED ENDING 🌙'
  },
  6: { 
    name: '🌊 Riverside steps', 
    emoji: '🌊',
    story: 'The river sparkled like diamonds 💎. A magical mermaid 🧜‍♀️ rose from the water and showed Michaela the way home through the moonlight. 🌙',
    ending: '✨ GOOD ENDING ✨'
  },
  7: { 
    name: '🏮 Market alley lights', 
    emoji: '🏮',
    story: 'Glowing lanterns danced 🏮✨. A kind shopkeeper 👨‍🍳 gave her dumplings 🥟 and walked her safely back home to her family. 💖',
    ending: '✨ GOOD ENDING ✨'
  }
};

// 🎮 Path Selection Logic
const choiceButtons = document.querySelectorAll('.choice-btn');
const pathLog = document.getElementById('path-log');
const sceneText = document.getElementById('scene-text');
const sceneTitle = document.getElementById('scene-title');

choiceButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const pathNum = btn.dataset.path;
    const pathData = paths[pathNum];
    
    // 🚶‍♀️ Walk Michaela to the button
    btn.classList.add('walking');
    const rect = btn.getBoundingClientRect();
    mouseX = rect.left + rect.width / 2;
    mouseY = rect.top + rect.height / 2;
    
    // 💥 Burst of sparkles
    for (let i = 0; i < 15; i++) {
      setTimeout(() => createSparkle(
        rect.left + Math.random() * rect.width,
        rect.top + Math.random() * rect.height
      ), i * 50);
    }
    
    // 📜 Add to path log
    setTimeout(() => {
      const logItem = document.createElement('li');
      logItem.innerHTML = `${pathData.emoji} <strong>Path ${pathNum}:</strong> ${pathData.name.replace(/^.+\s/, '')} - ${pathData.ending}`;
      pathLog.appendChild(logItem);
      
      // 📖 Update scene
      sceneTitle.textContent = `${pathData.emoji} ${pathData.name}`;
      sceneText.innerHTML = `${pathData.story} <br><br><strong style="color: #ffd700;">${pathData.ending}</strong>`;
      
      btn.classList.remove('walking');
    }, 800);
  });
});

// 🔄 Restart
document.getElementById('restart-btn').addEventListener('click', () => {
  pathLog.innerHTML = '';
  sceneTitle.textContent = '🌃 The Street With No Sound';
  sceneText.innerHTML = `👧 <strong>Michaela</strong> is a small 9-year-old girl with shoulder-length dark hair,
    an oversized yellow raincoat 🧥 over a faded blue dress, scuffed red shoes 👟, 
    and a tiny flashlight 🔦 in one hand and a worn stuffed rabbit 🐰 in the other. 
    She is lost at midnight 🌙, and seven numbered paths stretch out in front of her. ✨`;
  
  // 🎉 Celebration sparkles
  for (let i = 0; i < 30; i++) {
    setTimeout(() => createSparkle(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    ), i * 30);
  }
});
