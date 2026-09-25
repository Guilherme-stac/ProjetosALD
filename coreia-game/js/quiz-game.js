// ==================== QUIZ PRINCIPAL ====================
const bosses = [
  { name: 'Dokkaebi', emoji: '👹' }, { name: 'Gumiho', emoji: '🦊' },
  { name: 'Yong', emoji: '🐉' }, { name: 'Gwisin', emoji: '👻' }
];

function startGame() {
  initAudio();
  playClick();
  if (musicOn) startMusic();
  speak('안녕하세요', 'ko-KR');

  if (GameState.gameMode === 'meditacao') {
    startMeditation();
    return;
  }

  GameState.questions = [];
  chaptersData.forEach((ch, chIdx) => {
    let count = 3;
    if (GameState.gameMode === 'maratona' || GameState.gameMode === 'caos') count = ch.questions.length;
    if (GameState.gameMode === 'boss') count = 2;
    if (GameState.gameMode === 'rpg') count = 4;
    const shuffled = shuffle(ch.questions).slice(0, count);
    shuffled.forEach(q => GameState.questions.push({ ...q, chapter: chIdx }));
  });

  if (GameState.gameMode === 'caos') GameState.questions = shuffle(GameState.questions);
  else GameState.questions.sort((a, b) => a.chapter - b.chapter);

  GameState.currentQuestion = 0;
  GameState.score = 0;
  GameState.hits = 0;
  GameState.streak = 0;
  GameState.bestStreak = 0;
  GameState.maxCombo = 0;
  GameState.answerHistory = [];
  GameState.totalTime = 0;
  GameState.currentPlayer = 1;
  GameState.player1Score = 0;
  GameState.player2Score = 0;
  GameState.chaptersCompleted = new Set();
  GameState.wrongCount = 0;
  GameState.karma = 50;
  GameState.bossHP = 100;
  GameState.bossMaxHP = 100;
  GameState.timeAttackLeft = 60;
  GameState.isFrozen = false;
  GameState.doublePoints = false;
  GameState.gameStartTime = Date.now();
  GameState.spentThisQuestion = 0;

  if (GameState.gameMode === 'duo') {
    const sl = $('score-label');
    if (sl) sl.textContent = 'P1 / P2';
    checkAchievement('duo');
  } else {
    const sl = $('score-label');
    if (sl) sl.textContent = 'Pontos';
  }

  if (GameState.gameMode === 'boss') {
    const ba = $('boss-area');
    if (ba) ba.classList.remove('hidden');
    const b = pick(bosses);
    const bn = $('boss-name'), be = $('boss-emoji'), bh = $('boss-hp');
    if (bn) bn.textContent = b.name;
    if (be) be.textContent = b.emoji;
    if (bh) bh.style.width = '100%';
    GameState.questions = GameState.questions.slice(0, 10);
    checkAchievement('boss');
  } else {
    const ba = $('boss-area');
    if (ba) ba.classList.add('hidden');
  }

  if (GameState.gameMode === 'rpg') {
    const ra = $('rpg-area');
    if (ra) ra.classList.remove('hidden');
    updateRPGStats();
    checkAchievement('rpg');
  } else {
    const ra = $('rpg-area');
    if (ra) ra.classList.add('hidden');
  }

  if (GameState.gameMode === 'caos') checkAchievement('chaos');
  if (GameState.gameMode === 'tempo') checkAchievement('time-attack');

  showGameScreen();
  renderChapterPanel();
  loadQuestion();
}

function showGameScreen() {
  const ss = $('start-screen');
  const ga = $('game-area');
  const es = $('end-screen');
  if (ss) ss.classList.add('hidden');
  if (es) es.classList.add('hidden');
  if (ga) ga.classList.remove('hidden');
}

function updateRPGStats() {
  ['forca', 'inteligencia', 'sorte', 'carisma'].forEach(attr => {
    const val = GameState.rpgAttributes[attr];
    const el1 = $(`rpg-${attr}-val`);
    const el2 = $(`rpg-${attr}`);
    if (el1) el1.textContent = val;
    if (el2) el2.style.width = Math.min(100, val * 5) + '%';
  });
}

function renderChapterPanel() {
  const cp = $('chapter-panel');
  if (!cp) return;
  cp.innerHTML = '';
  chaptersData.forEach((ch, i) => {
    const b = document.createElement('div');
    b.className = `chapter-badge ${ch.cssClass}`;
    if (i === GameState.questions[GameState.currentQuestion]?.chapter) b.classList.add('active');
    b.textContent = `${ch.emoji} ${ch.name}`;
    cp.appendChild(b);
  });
}

function loadQuestion() {
  GameState.answered = false;
  GameState.hintUsed = false;
  GameState.usedFifty = false;
  GameState.usedFreeze = false;
  GameState.usedDouble = false;
  GameState.usedTime = false;
  GameState.isFrozen = false;
  GameState.doublePoints = false;

  // 💰 Reset do gasto da pergunta
  GameState.spentThisQuestion = 0;

  const hb = $('hint-box');
  if (hb) hb.classList.remove('show');

  // Reativa botões de poder e limpa estados visuais
  ['hint-btn', 'skip-btn', 'fifty-btn', 'freeze-btn', 'double-btn', 'time-btn'].forEach(id => {
    const el = $(id);
    if (el) {
      el.disabled = false;
      el.classList.remove('active-power', 'no-money');
    }
  });

  // Atualiza contador de moedas na barra de poderes
  const pcv = $('powers-coins-value');
  if (pcv) pcv.textContent = GameState.coins;

  // Para barra de auto-next
  const autoBar = $('auto-next-bar');
  if (autoBar) autoBar.classList.remove('active');
  if (GameState.autoNextInterval) {
    clearInterval(GameState.autoNextInterval);
    GameState.autoNextInterval = null;
  }

  const q = GameState.questions[GameState.currentQuestion];
  if (!q) return;

  const qEl = $('question');
  if (qEl) qEl.innerHTML = `<span class="emoji-wrap">${q.emoji}</span><br>${q.q}`;
  const qn = $('q-number');
  if (qn) qn.textContent = `${GameState.currentQuestion + 1}/${GameState.questions.length}`;
  const pg = $('progress');
  if (pg) pg.style.width = `${(GameState.currentQuestion / GameState.questions.length) * 100}%`;
  const fb = $('feedback');
  if (fb) fb.textContent = '';
  const nb = $('next-btn');
  if (nb) nb.classList.add('hidden');
  const km = $('karma');
  if (km) km.textContent = GameState.karma;
  const cb = $('combo');
  if (cb) cb.textContent = GameState.maxCombo;

  const answersEl = $('answers');
  if (!answersEl) return;
  answersEl.innerHTML = '';
  const keys = ['1', '2', '3', '4'];
  q.answers.forEach((ans, i) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.innerHTML = `<span class="key">${keys[i]}</span><span>${ans}</span>`;
    btn.onclick = () => selectAnswer(i, btn);
    answersEl.appendChild(btn);
  });

  renderChapterPanel();
  startTimer();
}

function startTimer() {
  stopTimer();
  GameState.timeLeft = GameState.timePerQuestion;
  const t = $('timer');
  if (t) { t.style.width = '100%'; t.classList.remove('danger'); }

  GameState.timerInterval = setInterval(() => {
    if (GameState.isFrozen) return;
    GameState.timeLeft -= 0.1;
    const tf = $('timer');
    if (tf) tf.style.width = Math.max(0, (GameState.timeLeft / GameState.timePerQuestion) * 100) + '%';

    if (GameState.gameMode === 'tempo') {
      GameState.timeAttackLeft -= 0.1;
      if (GameState.timeAttackLeft <= 0) {
        stopTimer();
        if (!GameState.answered) endGame();
        return;
      }
    }
    if (GameState.timeLeft <= 5) {
      const t2 = $('timer');
      if (t2) t2.classList.add('danger');
      if (Math.floor(GameState.timeLeft * 10) % 10 === 0) playTick();
    }
    if (GameState.timeLeft <= 0) {
      stopTimer();
      timeOut();
    }
  }, 100);
}

function stopTimer() {
  if (GameState.timerInterval) {
    clearInterval(GameState.timerInterval);
    GameState.timerInterval = null;
  }
}

function startAutoNext() {
  if (GameState.autoNextInterval) clearInterval(GameState.autoNextInterval);
  GameState.autoNextLeft = 10;
  const autoBar = $('auto-next-bar');
  const autoFill = $('auto-next-fill');
  const autoText = $('auto-next-text');
  if (autoBar) autoBar.classList.add('active');
  if (autoFill) autoFill.style.width = '100%';
  if (autoText) autoText.textContent = '⏱️ Próxima em 10s';

  GameState.autoNextInterval = setInterval(() => {
    GameState.autoNextLeft -= 0.1;
    const pct = (GameState.autoNextLeft / 10) * 100;
    if (autoFill) autoFill.style.width = Math.max(0, pct) + '%';
    if (autoText) autoText.textContent = `⏱️ Próxima em ${Math.ceil(GameState.autoNextLeft)}s`;
    if (GameState.autoNextLeft <= 0) {
      clearInterval(GameState.autoNextInterval);
      GameState.autoNextInterval = null;
      const nb = $('next-btn');
      if (nb && !nb.classList.contains('hidden')) nb.click();
    }
  }, 100);
}

function stopAutoNext() {
  if (GameState.autoNextInterval) {
    clearInterval(GameState.autoNextInterval);
    GameState.autoNextInterval = null;
  }
  const autoBar = $('auto-next-bar');
  if (autoBar) autoBar.classList.remove('active');
}

function timeOut() {
  if (GameState.answered) return;
  GameState.answered = true;
  const q = GameState.questions[GameState.currentQuestion];
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(b => b.disabled = true);
  if (buttons[q.correct]) buttons[q.correct].classList.add('correct');
  GameState.streak = 0;
  GameState.wrongCount++;
  GameState.karma = Math.max(0, GameState.karma - 10);
  const s = $('streak');
  if (s) s.textContent = '0🔥';
  const k = $('karma');
  if (k) k.textContent = GameState.karma;
  const fb = $('feedback');
  if (fb) fb.innerHTML = `⏰ <span style="color:#cd2e3a">Tempo! Resposta: ${q.answers[q.correct]}</span>`;
  playWrong();
  if (GameState.gameMode === 'boss') damageBoss(false);
  GameState.answerHistory.push({ q: q.q, correct: q.answers[q.correct], chosen: 'Tempo', ok: false, fact: q.fact, chapter: q.chapter });
  if (GameState.gameMode === 'duo') handleDuoAnswer(false);
  const nb = $('next-btn');
  if (nb) nb.classList.remove('hidden');
  startAutoNext();
}

function selectAnswer(index, btn) {
  if (GameState.answered) return;
  GameState.answered = true;
  stopTimer();

  const q = GameState.questions[GameState.currentQuestion];
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach(b => b.disabled = true);
  ['hint-btn', 'skip-btn', 'fifty-btn', 'freeze-btn', 'double-btn', 'time-btn'].forEach(id => {
    const el = $(id);
    if (el) el.disabled = true;
  });

  const timeBonus = Math.floor(GameState.timeLeft * 2);
  const wasFast = (GameState.timePerQuestion - GameState.timeLeft) < 3;

  if (index === q.correct) {
    btn.classList.add('correct');
    let points = 5 + timeBonus + (GameState.hintUsed ? -5 : 0) + (GameState.usedFifty ? -5 : 0);
    if (GameState.doublePoints) points *= 2;
    points = Math.max(1, points);
    GameState.score += points;
    GameState.hits++;
    GameState.streak++;
    if (GameState.streak > GameState.bestStreak) GameState.bestStreak = GameState.streak;
    if (GameState.streak > GameState.maxCombo) {
      GameState.maxCombo = GameState.streak;
      if (GameState.streak >= 3) {
        showCombo(GameState.streak);
        playCombo(GameState.streak);
      }
    }
    GameState.karma = Math.min(100, GameState.karma + 5);
    const coinGain = Math.floor(points / 3);
    GameState.coins += coinGain;
    addXP(points);

    const sc = $('score'), hs = $('hits'), st = $('streak'), cb = $('combo'), km = $('karma');
    if (sc) { sc.textContent = GameState.score; sc.classList.add('bump'); setTimeout(() => sc.classList.remove('bump'), 500); }
    if (hs) hs.textContent = GameState.hits;
    if (st) st.textContent = GameState.streak + '🔥';
    if (cb) cb.textContent = GameState.maxCombo;
    if (km) km.textContent = GameState.karma;
    updateHUD(); saveGame();

    const bonusText = timeBonus > 0 ? ` (+${timeBonus}⚡)` : '';
    const fb = $('feedback');
    if (fb) fb.innerHTML = `✅ <span style="color:#4caf50">정답! +${points} pts (+${coinGain}🪙)${bonusText}</span>`;
    playCorrect();
    burstConfetti(35);
    speak('정답', 'ko-KR');

    checkAchievement('first');
    if (GameState.streak >= 5) checkAchievement('streak5');
    if (GameState.streak >= 10) checkAchievement('streak10');
    if (GameState.streak >= 20) checkAchievement('streak20');
    if (wasFast) checkAchievement('fast');
    if (GameState.coins >= 500) checkAchievement('coin500');
    if (GameState.coins >= 1000) checkAchievement('coin1000');
    if (GameState.playerLevel >= 10) checkAchievement('level10');
    if (GameState.playerLevel >= 20) checkAchievement('level20');

    if (Math.random() < 0.25) {
      const locked = collectibleCards.filter(c => !GameState.collectedCards.has(c.id));
      if (locked.length) {
        const card = pick(locked);
        GameState.collectedCards.add(card.id);
        saveGame();
        setTimeout(() => {
          const fb2 = $('feedback');
          if (fb2) fb2.innerHTML += `<br><small style="color:#d4af37; font-weight:700;">🃏 Carta: ${card.emoji} ${card.name}!</small>`;
        }, 800);
        if (GameState.collectedCards.size === collectibleCards.length) checkAchievement('collector');
      }
    }

    GameState.answerHistory.push({ q: q.q, correct: q.answers[q.correct], chosen: q.answers[index], ok: true, fact: q.fact, chapter: q.chapter });
    if (GameState.gameMode === 'boss') damageBoss(true);
    if (GameState.gameMode === 'duo') handleDuoAnswer(true);
  } else {
    btn.classList.add('wrong');
    if (buttons[q.correct]) buttons[q.correct].classList.add('correct');
    GameState.streak = 0;
    GameState.wrongCount++;
    GameState.karma = Math.max(0, GameState.karma - 10);
    const s = $('streak'), k = $('karma');
    if (s) s.textContent = '0🔥';
    if (k) k.textContent = GameState.karma;
    const fb = $('feedback');
    if (fb) fb.innerHTML = `❌ <span style="color:#cd2e3a">틀렸어요! Resposta: ${q.answers[q.correct]}</span>`;
    playWrong();
    speak('땡', 'ko-KR');
    if (GameState.gameMode === 'boss') damageBoss(false);
    GameState.answerHistory.push({ q: q.q, correct: q.answers[q.correct], chosen: q.answers[index], ok: false, fact: q.fact, chapter: q.chapter });
    if (GameState.gameMode === 'duo') handleDuoAnswer(false);
  }

  const chapterIdx = q.chapter;
  const chapterQs = GameState.questions.filter(x => x.chapter === chapterIdx);
  const chapterAnswered = GameState.answerHistory.filter(x => x.chapter === chapterIdx);
  if (chapterAnswered.length >= chapterQs.length) {
    GameState.chaptersCompleted.add(chapterIdx);
    checkAchievement('chapter' + (chapterIdx + 1));
  }

  setTimeout(() => {
    const fb3 = $('feedback');
    if (fb3) fb3.innerHTML += `<br><small style="color:#888; font-weight:400; font-style:italic;">💡 ${q.fact}</small>`;
  }, 400);

  const nb = $('next-btn');
  if (nb) nb.classList.remove('hidden');
  startAutoNext();
}

function damageBoss(hit) {
  if (hit) GameState.bossHP = Math.max(0, GameState.bossHP - 8);
  else GameState.bossHP = Math.min(GameState.bossMaxHP, GameState.bossHP + 3);
  const bh = $('boss-hp');
  if (bh) bh.style.width = GameState.bossHP + '%';
  if (GameState.bossHP <= 0) {
    setTimeout(() => {
      const fb = $('feedback');
      if (fb) fb.innerHTML = '🎉 <span style="color:#4caf50">CHEFÃO DERROTADO!</span>';
      burstConfetti(200);
      burstFireworks(10);
      speak('승리', 'ko-KR');
    }, 500);
  }
}

function handleDuoAnswer(correct) {
  if (correct) {
    if (GameState.currentPlayer === 1) GameState.player1Score++;
    else GameState.player2Score++;
  }
  GameState.currentPlayer = GameState.currentPlayer === 1 ? 2 : 1;
}

function endGame() {
  stopTimer();
  stopAutoNext();
  GameState.totalTime = Math.floor((Date.now() - GameState.gameStartTime) / 1000);

  const ss = $('start-screen'), ga = $('game-area'), es = $('end-screen');
  if (ss) ss.classList.add('hidden');
  if (ga) ga.classList.add('hidden');
  if (es) es.classList.remove('hidden');

  playVictory();
  burstFireworks(6);

  const percent = (GameState.hits / Math.max(1, GameState.answerHistory.length)) * 100;
  let trophy, title, msg;

  if (GameState.hits === GameState.questions.length || (GameState.gameMode === 'boss' && GameState.bossHP <= 0)) {
    trophy = '👑'; title = '완벽해요! (Perfeito!)';
    msg = 'Você é um mestre da cultura coreana! 대박!';
    burstConfetti(300); burstFireworks(15);
    checkAchievement('perfect');
    speak('완벽해요', 'ko-KR');
  } else if (percent >= 70) {
    trophy = '🥇'; title = '잘했어요! (Muito bem!)';
    msg = 'Você conhece bastante sobre a Coreia!';
    burstConfetti(180);
    speak('잘했어요', 'ko-KR');
  } else if (percent >= 40) {
    trophy = '🥈'; title = '괜찮아요! (Está ok!)';
    msg = 'Bom começo! Continue explorando!';
    burstConfetti(90);
  } else {
    trophy = '📚'; title = '화이팅! (Força!)';
    msg = 'Hora de mergulhar mais na cultura coreana!';
    speak('화이팅', 'ko-KR');
  }

  if (!GameState.hintUsed) checkAchievement('no-hint');

  const tr = $('trophy'), et = $('end-title'), em = $('end-message');
  if (tr) tr.textContent = trophy;
  if (et) et.textContent = title;
  if (em) em.textContent = msg;

  const fs = $('final-score'), fh = $('final-hits'), fw = $('final-wrong'), ft = $('final-time'), fst = $('final-streak');
  if (fs) fs.textContent = `${GameState.score} pontos`;
  if (fh) fh.textContent = GameState.hits;
  if (fw) fw.textContent = Math.max(0, GameState.answerHistory.length - GameState.hits);
  if (ft) ft.textContent = GameState.totalTime + 's';
  if (fst) fst.textContent = GameState.bestStreak;

  const podium = $('podium');
  if (podium) {
    if (GameState.gameMode === 'duo') {
      podium.classList.remove('hidden');
      let pc = '<h3 style="font-family: Black Han Sans; color: #0047a0; margin-bottom: 6px; font-size: 0.9em;">🏆 PÓDIO FINAL</h3>';
      if (GameState.player1Score > GameState.player2Score) pc += `<div><span style="font-size:1.8em;">🥇</span><br><strong>Jogador 1!</strong><br>${GameState.player1Score} x ${GameState.player2Score}</div>`;
      else if (GameState.player2Score > GameState.player1Score) pc += `<div><span style="font-size:1.8em;">🥇</span><br><strong>Jogador 2!</strong><br>${GameState.player2Score} x ${GameState.player1Score}</div>`;
      else pc += `<div><span style="font-size:1.8em;">🤝</span><br><strong>Empate!</strong><br>${GameState.player1Score} x ${GameState.player2Score}</div>`;
      podium.innerHTML = pc;
    } else podium.classList.add('hidden');
  }

  const ag = $('achievements-grid');
  if (ag) {
    ag.innerHTML = '';
    achievementsList.forEach(a => {
      const div = document.createElement('div');
      div.className = 'achievement' + (GameState.unlockedAchievements.has(a.id) ? ' unlocked' : '');
      div.innerHTML = `<span class="achievement-icon">${a.icon}</span><div class="achievement-name">${a.name}</div>`;
      ag.appendChild(div);
    });
  }

  const hEl = $('history');
  if (hEl) {
    hEl.innerHTML = '';
    GameState.answerHistory.forEach((item, i) => {
      const div = document.createElement('div');
      div.className = 'history-item ' + (item.ok ? 'ok' : 'fail');
      div.innerHTML = `<strong>${i + 1}. ${item.q}</strong>${item.ok ? '✅' : '❌'} ${item.chosen}${!item.ok ? `<br>✔️ ${item.correct}` : ''}`;
      hEl.appendChild(div);
    });
  }

  saveScore(GameState.score, GameState.hits, GameState.questions.length);
  renderLeaderboard();
  saveGame();
}

function renderLeaderboard() {
  const lb = $('leaderboard');
  if (!lb) return;
  const scores = getScores();
  if (!scores.length) { lb.innerHTML = '<em style="color:#888">Sem pontuações ainda</em>'; return; }
  lb.innerHTML = '<h4 style="color: #0047a0; font-family: Black Han Sans; margin-bottom: 5px; font-size: 0.85em;">🏆 Top 5</h4>' +
    scores.map((s, i) => `<div class="leaderboard-row ${i === 0 ? 'top-1' : ''}"><span>${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + 'º'} ${s.date}</span><span><strong>${s.score}</strong> pts</span></div>`).join('');
}

function startMeditation() {
  openModal(`
    <h3>🧘 Meditação Coreana</h3>
    <div style="width:180px; height:180px; border-radius:50%; background:radial-gradient(circle, rgba(212,175,55,0.4), rgba(0,71,160,0.2)); margin:15px auto; display:flex; align-items:center; justify-content:center; border:4px solid #d4af37; animation: float 8s ease-in-out infinite; position:relative;">
      <div style="color:#0a0a0a; font-family:'Nanum Brush Script'; font-size:1.2em;" id="med-text">Inspire</div>
    </div>
    <p id="med-counter" style="color: #0047a0; font-family: Black Han Sans; font-size:0.9em;">Respirações: 0</p>
    <button class="btn-secondary" id="med-close">Concluir</button>
  `);
  let count = 0, idx = 0;
  const texts = ['Inspire', 'Segure', 'Expire', 'Pausa'];
  const interval = setInterval(() => {
    idx = (idx + 1) % 4;
    const t = $('med-text');
    if (!t) return;
    t.textContent = texts[idx];
    if (idx === 0) {
      count++;
      const c = $('med-counter');
      if (c) c.textContent = `Respirações: ${count}`;
      playTone(300 + count * 20, 0.5, 'sine', 0.04);
    }
  }, 2000);
  const btn = $('med-close');
  if (btn) btn.onclick = () => {
    clearInterval(interval);
    checkAchievement('meditator');
    GameState.coins += 40;
    addXP(20);
    saveGame();
    updateHUD();
    burstConfetti(40);
    closeAllModals();
  };
}