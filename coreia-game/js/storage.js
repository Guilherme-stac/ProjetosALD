// ==================== SAVE/LOAD ====================
const SAVE_KEY = 'korea_ariza_supreme_v1';

function saveGame() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      coins: GameState.coins,
      level: GameState.playerLevel,
      xp: GameState.playerXP,
      skillPoints: GameState.skillPoints,
      achievements: [...GameState.unlockedAchievements],
      cards: [...GameState.collectedCards],
      skills: [...GameState.unlockedSkills],
      rpgAttributes: GameState.rpgAttributes,
      season: GameState.currentSeason,
      pet: GameState.selectedPet,
      petLevel: GameState.petLevel,
      petXP: GameState.petXP,
      petHunger: GameState.petHunger,
      petHappiness: GameState.petHappiness,
      petEnergy: GameState.petEnergy,
      missions: [...GameState.completedMissions],
      codes: [...GameState.usedCodes],
      daily: GameState.lastDaily,
      missionsDate: GameState.lastMissions,
      tutorial: GameState.tutorialSeen
    }));
  } catch(e) {}
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const save = JSON.parse(raw);
    if (typeof save.coins === 'number') GameState.coins = save.coins;
    if (typeof save.level === 'number') GameState.playerLevel = save.level;
    if (typeof save.xp === 'number') GameState.playerXP = save.xp;
    if (typeof save.skillPoints === 'number') GameState.skillPoints = save.skillPoints;
    if (Array.isArray(save.achievements)) GameState.unlockedAchievements = new Set(save.achievements);
    if (Array.isArray(save.cards)) GameState.collectedCards = new Set(save.cards);
    if (Array.isArray(save.skills)) GameState.unlockedSkills = new Set(save.skills);
    if (save.rpgAttributes) GameState.rpgAttributes = save.rpgAttributes;
    if (save.season) GameState.currentSeason = save.season;
    if (save.pet) GameState.selectedPet = save.pet;
    if (typeof save.petLevel === 'number') GameState.petLevel = save.petLevel;
    if (typeof save.petXP === 'number') GameState.petXP = save.petXP;
    if (typeof save.petHunger === 'number') GameState.petHunger = save.petHunger;
    if (typeof save.petHappiness === 'number') GameState.petHappiness = save.petHappiness;
    if (typeof save.petEnergy === 'number') GameState.petEnergy = save.petEnergy;
    if (Array.isArray(save.missions)) GameState.completedMissions = new Set(save.missions);
    if (Array.isArray(save.codes)) GameState.usedCodes = new Set(save.codes);
    if (save.daily) GameState.lastDaily = save.daily;
    if (save.missionsDate) GameState.lastMissions = save.missionsDate;
    if (save.tutorial) GameState.tutorialSeen = save.tutorial;
  } catch(e) {}
}

function getScores() {
  try { return JSON.parse(localStorage.getItem('korea_scores') || '[]'); } catch(e) { return []; }
}

function saveScore(score, hits, total) {
  try {
    const scores = getScores();
    scores.push({ score, hits, total, date: new Date().toLocaleDateString('pt-BR') });
    scores.sort((a, b) => b.score - a.score);
    localStorage.setItem('korea_scores', JSON.stringify(scores.slice(0, 5)));
  } catch(e) {}
}

function resetGame() {
  if (confirm('Zerar TUDO? Isso é permanente!')) {
    localStorage.clear();
    location.reload();
  }
}