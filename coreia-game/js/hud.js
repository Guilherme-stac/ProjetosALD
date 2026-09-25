// ==================== HUD ====================
function updateHUD() {
  const lv = $('hud-level'), co = $('hud-coins'), ca = $('hud-cards');
  const ac = $('hud-achievements'), se = $('hud-season'), pe = $('hud-pet');

  if (lv) lv.textContent = `✨ Nv ${GameState.playerLevel}`;
  if (co) {
    co.textContent = `🪙 ${GameState.coins}`;
    co.classList.add('bump');
    setTimeout(() => co.classList.remove('bump'), 500);
  }
  if (ca) ca.textContent = `🃏 ${GameState.collectedCards.size}/${collectibleCards.length}`;
  if (ac) ac.textContent = `🏆 ${GameState.unlockedAchievements.size}/${achievementsList.length}`;

  const seasons = { spring: '🌸 Primavera', summer: '☀️ Verão', autumn: '🍁 Outono', winter: '❄️ Inverno' };
  if (se) se.textContent = seasons[GameState.currentSeason];

  if (pe) {
    if (GameState.selectedPet) {
      const petData = petsData.find(p => p.id === GameState.selectedPet);
      if (petData) pe.textContent = `${petData.emoji} ${petData.name} Nv${GameState.petLevel}`;
    } else pe.textContent = '🐯 Sem Pet';
  }

  const lp = $('level-progress-fill'), xp = $('xp-display'), ld = $('level-display');
  if (lp) lp.style.width = `${(GameState.playerXP / 100) * 100}%`;
  if (xp) xp.textContent = GameState.playerXP;
  if (ld) ld.textContent = GameState.playerLevel;

  // 💰 Contador de moedas dentro da barra de poderes
  const pcv = $('powers-coins-value');
  if (pcv) pcv.textContent = GameState.coins;

  // 💰 Marca botões de poder com saldo insuficiente
  const PRICES = {
    'hint-btn': 15, 'skip-btn': 25, 'fifty-btn': 30,
    'freeze-btn': 20, 'double-btn': 40, 'time-btn': 15
  };
  Object.entries(PRICES).forEach(([id, price]) => {
    const btn = $(id);
    if (!btn || btn.disabled) return;
    if (GameState.coins < price) btn.classList.add('no-money');
    else btn.classList.remove('no-money');
  });
}

function applySeason(season) {
  GameState.currentSeason = season;
  document.body.className = `season-${season}`;
  saveGame();
  updateHUD();
}