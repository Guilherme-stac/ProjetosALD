// ==================== TUTORIAL ====================
let tutorialStep = 0;
const totalTutorialSteps = 8;

function initTutorialProgress() {
  const progress = $('tutorial-progress');
  if (!progress) return;
  progress.innerHTML = '';
  for (let i = 0; i < totalTutorialSteps; i++) {
    const dot = document.createElement('div');
    dot.className = 'tutorial-dot';
    if (i === tutorialStep) dot.classList.add('active');
    else if (i < tutorialStep) dot.classList.add('done');
    progress.appendChild(dot);
  }
}

function showTutorialStep(step) {
  document.querySelectorAll('.tutorial-step').forEach(s => s.classList.remove('active'));
  const stepEl = document.querySelector(`.tutorial-step[data-step="${step}"]`);
  if (stepEl) stepEl.classList.add('active');
  tutorialStep = step;
  initTutorialProgress();
  const nextBtn = $('tutorial-next');
  if (nextBtn) {
    nextBtn.textContent = step >= totalTutorialSteps - 1 ? '🎬 COMEÇAR!' : 'Próximo →';
  }
}

function openTutorial() {
  const tut = $('tutorial-screen');
  if (!tut) return;
  tut.classList.add('active');
  showTutorialStep(0);
  playClick();
}

function closeTutorial() {
  const tut = $('tutorial-screen');
  if (tut) tut.classList.remove('active');
  GameState.tutorialSeen = true;
  saveGame();
  playClick();
  initAudio();
  speak('환영합니다', 'ko-KR');
  showStartScreen();
}

function showStartScreen() {
  const ga = $('game-area');
  const es = $('end-screen');
  if (ga) ga.classList.add('hidden');
  if (es) es.classList.add('hidden');

  const ss = $('start-screen');
  if (ss) ss.classList.remove('hidden');

  const mc = $('main-container');
  if (mc) mc.style.display = '';

  ['mascot', 'top-hud', 'fighting-badge', 'menu-toggle', 'bottom-bar'].forEach(id => {
    const el = $(id);
    if (el) el.style.display = '';
  });

  applySeason(GameState.currentSeason);
  updateHUD();
  renderLeaderboard();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideIntroShowGame() {
  showStartScreen();
}