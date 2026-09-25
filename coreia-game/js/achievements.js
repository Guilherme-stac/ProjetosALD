// ==================== CONQUISTAS ====================
function showAchievement(ach) {
  if (GameState.unlockedAchievements.has(ach.id)) return;
  GameState.unlockedAchievements.add(ach.id);
  playUnlock();
  burstConfetti(35);
  saveGame();
  updateHUD();

  const popup = document.createElement('div');
  popup.className = 'achievement-popup';
  popup.innerHTML = `
    <span class="icon">${ach.icon}</span>
    <div>
      <div style="font-size: 0.6em; opacity: 0.8;">CONQUISTA!</div>
      <div style="font-size: 0.95em;">${ach.name}</div>
      <div style="font-size: 0.55em; font-weight: 400; opacity: 0.7;">${ach.desc}</div>
    </div>
  `;
  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 4000);
}

function checkAchievement(id) {
  const ach = achievementsList.find(a => a.id === id);
  if (ach && !GameState.unlockedAchievements.has(id)) showAchievement(ach);
}

function showLevelUp() {
  const el = document.createElement('div');
  el.className = 'level-up-notification';
  el.innerHTML = `
    <div style="font-size:3em;">⭐</div>
    <div class="level-text">NÍVEL ${GameState.playerLevel}!</div>
    <div style="font-size:1.2em; margin-top:10px;">+1 Ponto de Habilidade</div>
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

function addXP(amount) {
  GameState.playerXP += amount;
  while (GameState.playerXP >= 100) {
    GameState.playerXP -= 100;
    GameState.playerLevel++;
    GameState.skillPoints++;
    showLevelUp();
    burstConfetti(50);
  }
}