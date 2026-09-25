// ==================== TABS ====================
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.onclick = () => {
      if (typeof playClick === 'function') playClick();
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    };
  });

  // Cards de modo de jogo
  document.querySelectorAll('.mode-card').forEach(card => {
    card.onclick = () => {
      document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      GameState.gameMode = card.dataset.mode;
      if (typeof playClick === 'function') playClick();
    };
  });

  // Botões de dificuldade
  document.querySelectorAll('.diff-btn').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const diff = btn.dataset.diff;
      GameState.difficulty = diff;
      const times = { facil: 25, medio: 15, dificil: 10, lenda: 7, impossivel: 5 };
      GameState.timePerQuestion = times[diff] || 15;
      if (typeof playClick === 'function') playClick();
    };
  });

  // Cards de estação
  document.querySelectorAll('.season-card').forEach(card => {
    card.onclick = () => {
      document.querySelectorAll('.season-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      if (typeof applySeason === 'function') applySeason(card.dataset.season);
    };
  });
}