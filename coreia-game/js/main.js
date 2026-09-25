// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Iniciando jogo...');

  const safe = (label, fn) => {
    try { fn(); }
    catch (err) { console.error(`❌ Erro em ${label}:`, err); }
  };

  safe('loadGame', () => loadGame());
  safe('initParticles', () => initParticles());
  safe('initBackground', () => initBackground());
  safe('initMascot', () => initMascot());
  safe('initTabs', () => initTabs());
  safe('applySeason', () => applySeason(GameState.currentSeason));
  safe('updateHUD', () => updateHUD());
  safe('renderLeaderboard', () => renderLeaderboard());

  safe('mostrarUI', () => {
    const elementsToShow = [
      'mascot', 'top-hud', 'main-container',
      'fighting-badge', 'menu-toggle', 'bottom-bar'
    ];
    elementsToShow.forEach(id => {
      const el = $(id);
      if (el) { el.style.display = ''; el.classList.remove('hidden'); }
    });

    const startScreen = $('start-screen');
    const gameArea = $('game-area');
    const endScreen = $('end-screen');
    if (startScreen) startScreen.classList.remove('hidden');
    if (gameArea) gameArea.classList.add('hidden');
    if (endScreen) endScreen.classList.add('hidden');
  });

  console.log('✅ Tela inicial visível');

  safe('bindButtons', () => bindButtons());
  safe('bindFloatingControls', () => bindFloatingControls());
  safe('bindTutorialButtons', () => bindTutorialButtons());
  safe('bindKeyboardShortcuts', () => bindKeyboardShortcuts());
  safe('bindActionDelegation', () => bindActionDelegation());

  setTimeout(() => {
    const loading = $('loading-overlay');
    if (loading) {
      loading.classList.add('fade-out');
      setTimeout(() => loading.remove(), 1000);
    }
  }, 2800);

  setTimeout(() => {
    if (!GameState.tutorialSeen && typeof openTutorial === 'function') {
      openTutorial();
    }
  }, 3500);

  console.log('✅ Jogo inicializado com sucesso!');
});

// ============ BIND BOTÕES DO QUIZ ============
function bindButtons() {
  const startBtn = $('start-btn');
  if (startBtn) startBtn.onclick = startGame;

  const nextBtn = $('next-btn');
  if (nextBtn) nextBtn.onclick = () => {
    playClick();
    if (typeof stopAutoNext === 'function') stopAutoNext();
    GameState.currentQuestion++;
    if (GameState.currentQuestion < GameState.questions.length) loadQuestion();
    else endGame();
  };

  // ---- PODERES COM CUSTO EM MOEDAS ----
  const PRICES = {
    'hint-btn': 15,
    'skip-btn': 25,
    'fifty-btn': 30,
    'freeze-btn': 20,
    'double-btn': 40,
    'time-btn': 15
  };

  function tryBuy(powerId, currentBtn) {
    const cost = PRICES[powerId];
    if (GameState.coins < cost) {
      if (currentBtn) {
        currentBtn.classList.add('no-money');
        setTimeout(() => currentBtn.classList.remove('no-money'), 500);
      }
      playWrong();
      const fb = $('feedback');
      if (fb) fb.innerHTML = `💸 <span style="color:#cd2e3a">Moedas insuficientes! Precisa de ${cost} 🪙 (tem ${GameState.coins})</span>`;
      return false;
    }
    GameState.coins -= cost;
    GameState.spentThisQuestion += cost;
    updateHUD();
    saveGame();
    return true;
  }

  const hintBtn = $('hint-btn');
  if (hintBtn) hintBtn.onclick = () => {
    if (GameState.answered || GameState.hintUsed) return;
    if (!tryBuy('hint-btn', hintBtn)) return;

    GameState.hintUsed = true;
    hintBtn.disabled = true;
    const ht = $('hint-text'), hb = $('hint-box');
    if (ht) ht.textContent = GameState.questions[GameState.currentQuestion].hint;
    if (hb) hb.classList.add('show');
    playUnlock();
    const fb = $('feedback');
    if (fb) fb.innerHTML = `💡 <span style="color:#d4af37">Dica comprada por 15 🪙!</span>`;
  };

  const skipBtn = $('skip-btn');
  if (skipBtn) skipBtn.onclick = () => {
    if (GameState.answered) return;
    if (!tryBuy('skip-btn', skipBtn)) return;

    GameState.answered = true;
    skipBtn.disabled = true;
    stopTimer();
    const q = GameState.questions[GameState.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(b => b.disabled = true);
    if (buttons[q.correct]) buttons[q.correct].classList.add('correct');
    GameState.streak = 0;
    GameState.wrongCount++;
    const s = $('streak');
    if (s) s.textContent = '0🔥';
    const fb = $('feedback');
    if (fb) fb.innerHTML = `⏭️ <span style="color:#888">Pulou (25 🪙)! Resposta: ${q.answers[q.correct]}</span>`;
    GameState.answerHistory.push({ q: q.q, correct: q.answers[q.correct], chosen: 'Pulou', ok: false, fact: q.fact, chapter: q.chapter });
    const nb = $('next-btn');
    if (nb) nb.classList.remove('hidden');
    if (typeof startAutoNext === 'function') startAutoNext();
  };

  const fiftyBtn = $('fifty-btn');
  if (fiftyBtn) fiftyBtn.onclick = () => {
    if (GameState.answered || GameState.usedFifty) return;
    if (!tryBuy('fifty-btn', fiftyBtn)) return;

    GameState.usedFifty = true;
    fiftyBtn.disabled = true;
    const q = GameState.questions[GameState.currentQuestion];
    const buttons = document.querySelectorAll('.answer-btn');
    const wrongIdx = [...Array(buttons.length).keys()]
      .filter(i => i !== q.correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    wrongIdx.forEach(i => {
      buttons[i].disabled = true;
      buttons[i].style.opacity = '0.3';
      buttons[i].style.textDecoration = 'line-through';
    });
    playUnlock();
    const fb = $('feedback');
    if (fb) fb.innerHTML = `⚖️ <span style="color:#0047a0">50/50 comprado por 30 🪙!</span>`;
  };

  const freezeBtn = $('freeze-btn');
  if (freezeBtn) freezeBtn.onclick = () => {
    if (GameState.answered || GameState.usedFreeze) return;
    if (!tryBuy('freeze-btn', freezeBtn)) return;

    GameState.usedFreeze = true;
    freezeBtn.disabled = true;
    freezeBtn.classList.add('active-power');
    GameState.isFrozen = true;
    setTimeout(() => {
      GameState.isFrozen = false;
      freezeBtn.classList.remove('active-power');
    }, 5000);
    const fb = $('feedback');
    if (fb) fb.innerHTML = '🧊 <span style="color:var(--ciano)">Congelado 5s (20 🪙)!</span>';
  };

  const doubleBtn = $('double-btn');
  if (doubleBtn) doubleBtn.onclick = () => {
    if (GameState.answered || GameState.usedDouble) return;
    if (!tryBuy('double-btn', doubleBtn)) return;

    GameState.usedDouble = true;
    doubleBtn.disabled = true;
    doubleBtn.classList.add('active-power');
    GameState.doublePoints = true;
    const fb = $('feedback');
    if (fb) fb.innerHTML = '💰 <span style="color:var(--dourado)">DOBRO ativado (40 🪙)!</span>';
  };

  const timeBtn = $('time-btn');
  if (timeBtn) timeBtn.onclick = () => {
    if (GameState.answered || GameState.usedTime) return;
    if (!tryBuy('time-btn', timeBtn)) return;

    GameState.usedTime = true;
    timeBtn.disabled = true;
    GameState.timeLeft += 10;
    const fb = $('feedback');
    if (fb) fb.innerHTML = '⏰ <span style="color:var(--jade)">+10s (15 🪙)!</span>';
  };

  const gbb = $('game-back-btn');
  if (gbb) gbb.onclick = () => {
    stopTimer();
    if (typeof stopAutoNext === 'function') stopAutoNext();
    const ss = $('start-screen'), ga = $('game-area');
    if (ga) ga.classList.add('hidden');
    if (ss) ss.classList.remove('hidden');
  };

  const rb = $('restart-btn');
  if (rb) rb.onclick = startGame;

  const hb = $('home-btn');
  if (hb) hb.onclick = () => {
    const ss = $('start-screen'), ga = $('game-area'), es = $('end-screen');
    if (ga) ga.classList.add('hidden');
    if (es) es.classList.add('hidden');
    if (ss) ss.classList.remove('hidden');
  };

  const shb = $('share-btn');
  if (shb) shb.onclick = () => {
    checkAchievement('share');
    const text = `🇰🇷 Fiz ${GameState.score} pts no "Descubra a Coreia"! 🌸
Acertos: ${GameState.hits}/${GameState.answerHistory.length}
Streak: ${GameState.bestStreak}🔥 | Nível: ${GameState.playerLevel}
Moedas: 🪙 ${GameState.coins}`;
    openModal(`
      <h3>📤 Compartilhe!</h3>
      <div style="background:white; padding:15px; border-radius:12px; border:2px dashed var(--dourado); font-size:0.8em; line-height:1.6; margin-bottom:15px; text-align:left;">${text.replace(/\n/g, '<br>')}</div>
      <button class="primary-btn" id="copy-btn" style="padding:10px 20px; font-size:0.85em;">📋 Copiar</button>
    `);
    const cb = $('copy-btn');
    if (cb) cb.onclick = () => copyToClipboard(text, cb);
  };
}

// ============ BIND CONTROLES (menu + barra inferior) ============
function bindFloatingControls() {
  const menuToggle = $('menu-toggle');
  const sideMenu = $('side-menu');
  const sideOverlay = $('side-menu-overlay');
  const sideClose = $('side-menu-close');

  const openMenu = () => {
    if (sideMenu) sideMenu.classList.add('open');
    if (sideOverlay) sideOverlay.classList.add('active');
    try { playClick(); } catch(e) {}
  };
  const closeMenu = () => {
    if (sideMenu) sideMenu.classList.remove('open');
    if (sideOverlay) sideOverlay.classList.remove('active');
  };

  if (menuToggle) menuToggle.onclick = openMenu;
  if (sideClose) sideClose.onclick = closeMenu;
  if (sideOverlay) sideOverlay.onclick = closeMenu;

  const wire = (id, fn) => {
    const el = $(id);
    if (el) el.onclick = fn;
  };

  wire('code-btn', () => { closeMenu(); try { playClick(); } catch(e) {} showCodeEntry(); });
  wire('tutorial-btn', () => { closeMenu(); try { playClick(); } catch(e) {} openTutorial(); });
  wire('notes-btn', () => { closeMenu(); openDiary(); });
  wire('credits-btn', () => { closeMenu(); openCredits(); });
  wire('bg-btn', () => { closeMenu(); try { playClick(); } catch(e) {} changeBackground(); });
  wire('season-btn', () => { closeMenu(); cycleSeason(); });
  wire('fullscreen-toggle', () => { closeMenu(); toggleFullscreen(); });
  wire('sound-toggle', e => {
    soundOn = !soundOn;
    e.currentTarget.textContent = soundOn ? '🔊 Som: ON' : '🔇 Som: OFF';
    if (!soundOn && 'speechSynthesis' in window) speechSynthesis.cancel();
  });
  wire('music-toggle', e => {
    musicOn = !musicOn;
    e.currentTarget.textContent = musicOn ? '🎵 Música: ON' : '🎵 Música: OFF';
    if (musicOn) startMusic(); else stopMusic();
  });

  // Barra inferior
  wire('bottom-home', () => {
    try { playClick(); } catch(e) {}
    stopTimer();
    if (typeof stopAutoNext === 'function') stopAutoNext();
    const ss = $('start-screen'), ga = $('game-area'), es = $('end-screen');
    if (ga) ga.classList.add('hidden');
    if (es) es.classList.add('hidden');
    if (ss) ss.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  wire('bottom-code', () => { try { playClick(); } catch(e) {} showCodeEntry(); });
  wire('bottom-tutorial', () => { try { playClick(); } catch(e) {} openTutorial(); });
  wire('bottom-notes', () => openDiary());
  wire('bottom-credits', () => openCredits());
  wire('bottom-season', () => cycleSeason());
  wire('bottom-bg', () => { try { playClick(); } catch(e) {} changeBackground(); });
  wire('bottom-sound', e => {
    soundOn = !soundOn;
    e.currentTarget.textContent = soundOn ? '🔊' : '🔇';
    if (!soundOn && 'speechSynthesis' in window) speechSynthesis.cancel();
  });
  wire('bottom-music', e => {
    musicOn = !musicOn;
    e.currentTarget.textContent = musicOn ? '🎵' : '🔕';
    if (musicOn) startMusic(); else stopMusic();
  });
  wire('bottom-fullscreen', () => toggleFullscreen());
}

// Helpers reutilizáveis
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
  else document.exitFullscreen?.();
}

function cycleSeason() {
  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  const idx = seasons.indexOf(GameState.currentSeason);
  applySeason(seasons[(idx + 1) % seasons.length]);
}

function openDiary() {
  try { playClick(); } catch(e) {}
  const current = localStorage.getItem('korea_diary') || '';
  openModal(`
    <h3>📔 Diário</h3>
    <textarea id="diary-area" style="width:100%; min-height:150px; padding:10px; border:2px solid var(--dourado); border-radius:8px; font-family:'Nanum Brush Script', cursive; font-size:1.3em; resize:vertical;">${current.replace(/</g, '&lt;')}</textarea>
    <button class="primary-btn" id="diary-save" style="margin-top:12px; padding:10px 24px; font-size:0.9em;">💾 Salvar</button>
  `);
  const ds = $('diary-save');
  if (ds) ds.onclick = () => {
    localStorage.setItem('korea_diary', $('diary-area').value);
    burstConfetti(20);
    ds.textContent = '✅ Salvo!';
    setTimeout(() => ds.textContent = '💾 Salvar', 1500);
  };
}

function openCredits() {
  try { playClick(); } catch(e) {}
  openModal(`
    <h3>ℹ️ Sobre</h3>
    <p style="font-size:0.9em; line-height: 1.6; color: #555; text-align: left;">
      <strong>🇰🇷 Descubra a Coreia — Edição Ariza Suprema</strong><br><br>
      <em>Uma homenagem à professora Ariza!</em><br><br>
      <strong>✨ Recursos:</strong><br>
      • 8 modos de jogo<br>
      • 35+ mini jogos<br>
      • 60 conquistas<br>
      • 20 cartas TCG<br>
      • 8 pets coreanos<br><br>
      🌸 <strong>선생님, 감사합니다!</strong> 🌸<br>
      🇰🇷 화이팅! 🇰🇷
    </p>
  `);
}

// ============ BIND TUTORIAL ============
function bindTutorialButtons() {
  const tutorialNext = $('tutorial-next');
  if (tutorialNext) tutorialNext.onclick = () => {
    try { playClick(); } catch(e) {}
    if (typeof tutorialStep !== 'undefined' && typeof totalTutorialSteps !== 'undefined') {
      if (tutorialStep < totalTutorialSteps - 1) showTutorialStep(tutorialStep + 1);
      else closeTutorial();
    }
  };

  const tutorialSkip = $('tutorial-skip');
  if (tutorialSkip) tutorialSkip.onclick = () => { try { playClick(); } catch(e) {} closeTutorial(); };

  const tutorialBtn2 = $('tutorial-btn2');
  if (tutorialBtn2) tutorialBtn2.onclick = () => { try { playClick(); } catch(e) {} openTutorial(); };
}

// ============ ATALHOS DE TECLADO ============
function bindKeyboardShortcuts() {
  document.addEventListener('keydown', e => {
    const ga = $('game-area');
    if (!ga || ga.classList.contains('hidden')) return;
    if (['1', '2', '3', '4'].includes(e.key)) {
      const btns = document.querySelectorAll('.answer-btn');
      const idx = parseInt(e.key) - 1;
      if (btns[idx] && !btns[idx].disabled) btns[idx].click();
    }
    const nb = $('next-btn');
    if (e.key === 'Enter' && nb && !nb.classList.contains('hidden')) nb.click();
    const hb = $('hint-btn');
    if (e.key.toLowerCase() === 'h' && hb && !hb.disabled) hb.click();
    const fb = $('fifty-btn');
    if (e.key.toLowerCase() === 'f' && fb && !fb.disabled) fb.click();
    if (e.key === 'Escape') closeAllModals();
  });
}

// ============ DELEGAÇÃO DE AÇÕES (MINIGAMES E MODOS) ============
function bindActionDelegation() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const action = btn.dataset.action;
    try { playClick(); } catch(err) {}

    const handlers = {
      daily: 'showDailyReward', shop: 'showShop', cards: 'showCards', stats: 'showStats',
      skills: 'showSkillTree', tarot: 'showTarot', treasure: 'showTreasure',
      hangul: 'showHangulGame', 'hangul-conv': 'showHangulConverter',
      memory: 'showMemoryGame', puzzle: 'showPuzzleGame', paint: 'showPaint',
      calligraphy: 'showCalligraphy', karaoke: 'showKaraoke', hanbok: 'showHanbok',
      sijo: 'showSijo', go: 'showGo',
      world: 'showWorld', palaces: 'showPalaces', characters: 'showCharacters',
      cinema: 'showCinema', saju: 'showSaju', names: 'showNames', phrases: 'showPhrases',
      idol: 'showIdol', farm: 'showFarm', restaurant: 'showRestaurant',
      constellation: 'showConstellations', spa: 'showSpa',
      piano: 'showPiano', dice: 'showDice', fortune: 'showFortune',
      'korea-map': 'showKoreaMap', timeline: 'showTimeline',
      'quick-quiz': 'showQuickQuiz', 'food-quiz': 'showFoodQuiz',
      'word-quiz': 'showWordQuiz',
      pet: 'showPet', 'pet-select': 'showPetSelect', 'pet-battle': 'showPetBattle',
      missions: 'showMissions', achievements: 'showAchievements',
      code: 'showCodeEntry',
      sudoku: 'showSudoku', maze: 'showMaze', reaction: 'showReaction',
      mandala: 'showMandala', pixel: 'showPixelArt', drum: 'showDrum',
      scratch: 'showScratch', slot: 'showSlot', 'tcg-battle': 'showTCGBattle',
      tea: 'showTeaCeremony'
    };

    const fnName = handlers[action];
    if (!fnName) return;

    const fn = window[fnName];
    if (typeof fn !== 'function') {
      console.error(`❌ Função "${fnName}" não existe (ação: ${action})`);
      return;
    }

    try { fn(); }
    catch (err) { console.error(`❌ Erro em ${fnName}():`, err); }
  });
}