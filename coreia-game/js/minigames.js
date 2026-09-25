// ==================== TODOS OS MINI JOGOS ====================

/* ==================== MEMÓRIA 6x4 ==================== */
function showMemoryGame() {
  const symbols = ['🌸', '🍜', '🎵', '🏯', '👘', '🥋', '🎭', '☯️', '🐉', '🦊', '🥁', '🎨'];
  let cards = shuffle([...symbols, ...symbols]);
  let flipped = [], matched = 0, moves = 0, canFlip = true;
  const totalPairs = symbols.length;

  openModal(miniGameHeader('🧠', 'Jogo da Memória', 'Encontre todos os pares de símbolos coreanos!', 
    '🎯 Clique nas cartas para virar. Encontre os <strong>12 pares</strong> iguais!<br>⏱️ Cada par vale <strong>+5 moedas</strong> (total: 60 moedas).<br>💡 Menos movimentos = mais pontos!'
  ) + `
    <div id="memory-info" style="font-family: 'Black Han Sans'; color: #0047a0; margin-bottom: 10px; font-size: 0.95em;">Movimentos: 0 | Pares: 0/${totalPairs}</div>
    <div class="memory-grid" id="memory-grid"></div>
    <button class="btn-secondary" id="memory-reset" style="margin-top: 12px;">🔄 Reiniciar</button>
  `);

  function render() {
    const g = $('memory-grid');
    if (!g) return;
    g.innerHTML = '';
    cards.forEach((sym, i) => {
      const c = document.createElement('div');
      c.className = 'memory-card';
      c.textContent = sym;
      c.onclick = () => flip(i, c);
      g.appendChild(c);
    });
  }

  function flip(i, el) {
    if (!canFlip || el.classList.contains('flipped') || el.classList.contains('matched')) return;
    el.classList.add('flipped');
    playClick();
    flipped.push({ i, el });
    if (flipped.length === 2) {
      moves++;
      canFlip = false;
      const [a, b] = flipped;
      if (cards[a.i] === cards[b.i]) {
        a.el.classList.add('matched');
        b.el.classList.add('matched');
        matched++;
        playCorrect();
        burstConfetti(8);
        flipped = [];
        canFlip = true;
        const info = $('memory-info');
        if (info) info.textContent = `Movimentos: ${moves} | Pares: ${matched}/${totalPairs}`;
        if (matched === totalPairs) {
          setTimeout(() => {
            GameState.coins += 60;
            addXP(30);
            saveGame();
            updateHUD();
            burstConfetti(150);
            burstFireworks(8);
            playVictory();
            checkAchievement('memory');
          }, 400);
        }
      } else {
        setTimeout(() => {
          a.el.classList.remove('flipped');
          b.el.classList.remove('flipped');
          flipped = [];
          canFlip = true;
        }, 800);
        playWrong();
      }
    }
  }

  render();
  const rb = $('memory-reset');
  if (rb) rb.onclick = () => {
    cards = shuffle([...symbols, ...symbols]);
    flipped = []; matched = 0; moves = 0; canFlip = true;
    const info = $('memory-info');
    if (info) info.textContent = `Movimentos: 0 | Pares: 0/${totalPairs}`;
    render();
    playClick();
  };
}

/* ==================== PUZZLE 4x4 ==================== */
function showPuzzleGame() {
  const SIZE = 4;
  let tiles = [...Array(SIZE * SIZE).keys()].map(i => (i + 1) % (SIZE * SIZE));
  let moves = 0, solved = false;

  function isSolvable(arr) {
    let inv = 0;
    const f = arr.filter(x => x !== 0);
    for (let i = 0; i < f.length; i++)
      for (let j = i + 1; j < f.length; j++)
        if (f[i] > f[j]) inv++;
    return inv % 2 === 0;
  }
  function isSolved() {
    for (let i = 0; i < SIZE * SIZE - 1; i++) if (tiles[i] !== i + 1) return false;
    return tiles[tiles.length - 1] === 0;
  }
  function shuffleBoard() {
    do { tiles.sort(() => Math.random() - 0.5); }
    while (!isSolvable(tiles) || isSolved());
  }

  openModal(miniGameHeader('🧩', 'Quebra-Cabeça 4x4', 'Desafio avançado com 15 peças!', 
    '🎯 Ordene os números de <strong>1 a 15</strong>!<br>🖱️ Clique em peças adjacentes ao espaço vazio.<br>💰 Recompensa: <strong>60 moedas</strong> + 45 XP.'
  ) + `
    <div id="puzzle-info" style="font-family: 'Black Han Sans'; color: #0047a0; margin-bottom: 10px;">Movimentos: 0</div>
    <div class="puzzle-grid" id="puzzle-grid"></div>
    <button class="btn-secondary" id="puzzle-reset" style="margin-top: 12px;">🔄 Reiniciar</button>
  `);

  function render() {
    const g = $('puzzle-grid');
    if (!g) return;
    g.innerHTML = '';
    tiles.forEach((t, i) => {
      const el = document.createElement('div');
      el.className = 'puzzle-tile' + (t === 0 ? ' empty' : '');
      el.textContent = t === 0 ? '' : t;
      if (t !== 0) el.onclick = () => move(i);
      g.appendChild(el);
    });
    const info = $('puzzle-info');
    if (info) info.textContent = `Movimentos: ${moves}`;
  }

  function move(i) {
    if (solved) return;
    const e = tiles.indexOf(0);
    const [r1, c1] = [Math.floor(i / SIZE), i % SIZE];
    const [r2, c2] = [Math.floor(e / SIZE), e % SIZE];
    if (Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1) {
      [tiles[i], tiles[e]] = [tiles[e], tiles[i]];
      moves++;
      playClick();
      render();
      if (isSolved()) {
        solved = true;
        setTimeout(() => {
          GameState.coins += 60;
          addXP(45);
          saveGame();
          updateHUD();
          burstConfetti(150);
          burstFireworks(5);
          playVictory();
          checkAchievement('puzzle');
        }, 300);
      }
    }
  }

  shuffleBoard();
  render();
  const rb = $('puzzle-reset');
  if (rb) rb.onclick = () => { shuffleBoard(); moves = 0; solved = false; render(); playClick(); };
}

/* ==================== HANGUL ==================== */
function showHangulGame() {
  const words = [
    { hangul: '김치', roman: 'Kimchi', emoji: '🍜' },
    { hangul: '서울', roman: 'Seul', emoji: '🏯' },
    { hangul: '사랑', roman: 'Sarang', emoji: '❤️' },
    { hangul: '친구', roman: 'Chingu', emoji: '👥' },
    { hangul: '한국', roman: 'Hanguk', emoji: '🇰🇷' },
    { hangul: '음악', roman: 'Eumak', emoji: '🎵' },
    { hangul: '꽃', roman: 'Kkot', emoji: '🌸' },
    { hangul: '하늘', roman: 'Haneul', emoji: '☁️' },
    { hangul: '바다', roman: 'Bada', emoji: '🌊' },
    { hangul: '별', roman: 'Byeol', emoji: '⭐' },
    { hangul: '아리자', roman: 'Ariza', emoji: '👩‍🏫' },
    { hangul: '선생님', roman: 'Seonsaengnim', emoji: '📚' }
  ];

  openModal(miniGameHeader('🇰🇷', 'Hangul Master', 'Monte palavras coreanas!', 
    '🎯 Monte a palavra coreana clicando nas letras corretas.<br>💡 Cada acerto: <strong>+20 moedas</strong> + 15 XP.<br>⭐ Tente montar <strong>todas as palavras</strong> incluindo o nome da professora!'
  ) + `
    <div id="hangul-goal" style="font-family: 'Nanum Myeongjo'; font-size: 1.2em; color: #0047a0; margin-bottom: 10px; min-height: 30px;"></div>
    <div id="hangul-board" style="display:flex; justify-content:center; gap:5px; margin:10px 0; flex-wrap:wrap;"></div>
    <div id="hangul-options" style="display:flex; flex-wrap:wrap; justify-content:center; gap:3px;"></div>
    <div id="hangul-feedback" style="min-height:26px; margin: 8px 0; font-weight:700;"></div>
    <button class="btn-secondary" id="hangul-skip" style="margin-top:10px;">🔀 Nova Palavra</button>
  `);

  let currentWord, currentProgress = [];

  function newWord() {
    currentWord = pick(words);
    const chars = currentWord.hangul.split('');
    currentProgress = [];
    const goal = $('hangul-goal');
    if (goal) goal.innerHTML = `${currentWord.emoji} <strong>${currentWord.roman}</strong>`;
    const board = $('hangul-board');
    if (board) {
      board.innerHTML = '';
      chars.forEach(() => {
        const t = document.createElement('div');
        t.className = 'hangul-tile';
        t.style.cssText = 'width:50px; height:50px; background:linear-gradient(135deg,#fff,#fdf6e3); border:3px solid #d4af37; border-radius:10px; display:flex; align-items:center; justify-content:center; font-family:"Nanum Myeongjo"; font-size:1.5em; font-weight:800; color:#0047a0; box-shadow: 0 4px 12px rgba(0,0,0,0.1);';
        board.appendChild(t);
      });
    }
    const options = $('hangul-options');
    if (options) {
      options.innerHTML = '';
      const distractors = ['가', '나', '다', '라', '마', '바', '사', '아', '자', '차'].filter(c => !chars.includes(c)).slice(0, 3);
      shuffle([...chars, ...distractors]).forEach(c => {
        const b = document.createElement('button');
        b.style.cssText = 'width:46px; height:46px; background:linear-gradient(135deg,#cd2e3a,#8b1a24); color:white; border:2px solid #d4af37; border-radius:10px; cursor:pointer; font-size:1.3em; font-family:"Nanum Myeongjo"; font-weight:800; margin:3px; transition: all 0.3s; box-shadow: 0 4px 10px rgba(205,46,58,0.4);';
        b.textContent = c;
        b.onmouseenter = () => b.style.transform = 'scale(1.1) translateY(-3px)';
        b.onmouseleave = () => b.style.transform = '';
        b.onclick = () => tryLetter(c, b);
        options.appendChild(b);
      });
    }
    const fb = $('hangul-feedback');
    if (fb) fb.textContent = '';
  }

  function tryLetter(c, btn) {
    const target = currentWord.hangul[currentProgress.length];
    if (c === target) {
      const tiles = document.querySelectorAll('.hangul-tile');
      tiles[currentProgress.length].textContent = c;
      tiles[currentProgress.length].style.background = 'linear-gradient(135deg,#0047a0,#6a1b9a)';
      tiles[currentProgress.length].style.color = 'white';
      tiles[currentProgress.length].style.transform = 'scale(1.1)';
      currentProgress.push(c);
      btn.disabled = true;
      btn.style.opacity = '0.3';
      playTone(600 + currentProgress.length * 100, 0.15);
      if (currentProgress.length === currentWord.hangul.length) {
        const fb = $('hangul-feedback');
        if (fb) fb.innerHTML = '🎉 <span style="color:#4caf50; font-size:1.1em;">Parabéns!</span>';
        playCorrect();
        burstConfetti(50);
        speak(currentWord.hangul, 'ko-KR');
        checkAchievement('hangul');
        GameState.coins += 20;
        addXP(15);
        saveGame();
        updateHUD();
        setTimeout(newWord, 2000);
      }
    } else {
      const fb = $('hangul-feedback');
      if (fb) fb.innerHTML = '❌ <span style="color:#cd2e3a">Tente outra!</span>';
      playWrong();
      btn.style.animation = 'shake 0.5s';
      setTimeout(() => btn.style.animation = '', 500);
    }
  }

  newWord();
  const sb = $('hangul-skip');
  if (sb) sb.onclick = () => { playClick(); newWord(); };
}

/* ==================== PINTURA ==================== */
function showPaint() {
  openModal(miniGameHeader('🎨', 'Pintura Minhwa', 'Arte tradicional coreana!', 
    '🖌️ Desenhe livremente com o mouse ou dedo.<br>🌸 Use o carimbo para adicionar flores.<br>💾 Salve sua obra de arte como imagem!<br>💰 Ganhe <strong>25 moedas</strong> ao salvar.'
  ) + `
    <canvas class="paint-canvas" id="paint-canvas" width="500" height="280"></canvas>
    <div class="palette" id="palette"></div>
    <div class="btn-row" style="margin-top:10px;">
      <button class="btn-secondary" id="paint-clear">🗑️ Limpar</button>
      <button class="btn-secondary" id="paint-stamp">🌸 Carimbo</button>
      <button class="btn-secondary" id="paint-brush-sm">✏️ Fino</button>
      <button class="btn-secondary" id="paint-brush-lg">🖌️ Grosso</button>
      <button class="btn-secondary" id="paint-save">💾 Salvar</button>
    </div>
  `);

  const canvas = $('paint-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#fdf6e3');
  gradient.addColorStop(1, '#f5ecd8');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < 300; i++) {
    ctx.fillStyle = `rgba(139,115,85,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1, 1);
  }
  
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 4;
  let painting = false, currentColor = '#cd2e3a';

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * (canvas.width / r.width), y: (cy - r.top) * (canvas.height / r.height) };
  }

  canvas.addEventListener('pointerdown', e => { painting = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('pointermove', e => {
    if (!painting) return;
    const p = getPos(e);
    ctx.strokeStyle = currentColor;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    if (Math.random() > 0.9) {
      const s = document.createElement('div');
      s.className = 'sparkle';
      s.textContent = '✨';
      s.style.left = e.clientX + 'px';
      s.style.top = e.clientY + 'px';
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 800);
    }
  });
  canvas.addEventListener('pointerup', () => painting = false);
  canvas.addEventListener('pointerleave', () => painting = false);

  const colors = ['#cd2e3a', '#0047a0', '#d4af37', '#00a86b', '#6a1b9a', '#ff6b35', '#ffb7c5', '#000000'];
  const palette = $('palette');
  if (palette) {
    colors.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'color-swatch' + (c === currentColor ? ' active' : '');
      sw.style.background = c;
      sw.onclick = () => {
        document.querySelectorAll('.color-swatch').forEach(x => x.classList.remove('active'));
        sw.classList.add('active');
        currentColor = c;
      };
      palette.appendChild(sw);
    });
  }

  const cb = $('paint-clear');
  if (cb) cb.onclick = () => { ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height); };
  const st = $('paint-stamp');
  if (st) st.onclick = () => {
    const flowers = ['🌸', '🌺', '💮', '🏵️', '🌷'];
    ctx.font = '40px serif';
    ctx.textAlign = 'center';
    ctx.fillText(pick(flowers), rand(30, canvas.width - 30), rand(30, canvas.height - 30));
    playCorrect();
    burstConfetti(20);
  };
  const bs = $('paint-brush-sm');
  if (bs) bs.onclick = () => { ctx.lineWidth = 2; playClick(); };
  const bl = $('paint-brush-lg');
  if (bl) bl.onclick = () => { ctx.lineWidth = 12; playClick(); };
  
  const sv = $('paint-save');
  if (sv) sv.onclick = () => {
    const link = document.createElement('a');
    link.download = 'arte-ariza-coreana.png';
    link.href = canvas.toDataURL();
    link.click();
    checkAchievement('painter');
    GameState.coins += 25;
    addXP(20);
    saveGame();
    updateHUD();
    burstConfetti(50);
    playUnlock();
  };
}

/* ==================== CALIGRAFIA ==================== */
function showCalligraphy() {
  const chars = ['한', '글', '사', '랑', '꽃', '별', '달', '해', '산', '물', '아', '리', '자'];
  let currentChar = pick(chars);

  openModal(miniGameHeader('✍️', 'Caligrafia Coreana', 'Trace caracteres Hangul com elegância!', 
    '🖌️ Trace o caractere com o mouse ou dedo.<br>💡 Siga o guia pontilhado de fundo.<br>🔀 Mude o caractere para praticar mais!<br>💰 Ganhe <strong>20 moedas</strong> ao desenhar.'
  ) + `
    <div style="font-family: 'Nanum Myeongjo'; font-size: 3em; color: #0047a0; margin-bottom: 10px; text-shadow: 0 5px 15px rgba(0,71,160,0.3);" id="calli-target">${currentChar}</div>
    <canvas class="calligraphy-canvas" id="calli-canvas" width="360" height="360"></canvas>
    <div class="btn-row" style="margin-top:10px;">
      <button class="btn-secondary" id="calli-clear">🗑️ Limpar</button>
      <button class="btn-secondary" id="calli-next">🔀 Próximo</button>
    </div>
  `);

  const canvas = $('calli-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function drawGuide() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(212,175,55,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(212,175,55,0.5)';
    ctx.setLineDash([8, 8]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0); ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2); ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(212,175,55,0.2)';
    ctx.beginPath();
    ctx.moveTo(0, 0); ctx.lineTo(canvas.width, canvas.height);
    ctx.moveTo(canvas.width, 0); ctx.lineTo(0, canvas.height);
    ctx.stroke();
    ctx.font = '260px "Nanum Myeongjo", serif';
    ctx.fillStyle = 'rgba(0,71,160,0.10)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(currentChar, canvas.width / 2, canvas.height / 2);
  }

  drawGuide();
  let painting = false, hasDrawn = false;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 8;

  function getPos(e) {
    const r = canvas.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: (cx - r.left) * (canvas.width / r.width), y: (cy - r.top) * (canvas.height / r.height) };
  }

  canvas.addEventListener('pointerdown', e => { painting = true; const p = getPos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); });
  canvas.addEventListener('pointermove', e => { if (!painting) return; const p = getPos(e); ctx.strokeStyle = '#0a0a0a'; ctx.lineTo(p.x, p.y); ctx.stroke(); });
  canvas.addEventListener('pointerup', () => {
    painting = false;
    if (!hasDrawn) {
      hasDrawn = true;
      checkAchievement('calligrapher');
      GameState.coins += 20;
      addXP(15);
      saveGame();
      updateHUD();
      burstConfetti(30);
    }
  });

  const cb = $('calli-clear');
  if (cb) cb.onclick = drawGuide;
  const nb = $('calli-next');
  if (nb) nb.onclick = () => {
    currentChar = pick(chars);
    const t = $('calli-target');
    if (t) t.textContent = currentChar;
    drawGuide();
    playClick();
  };
}

/* ==================== PIANO ==================== */
function showPiano() {
  const notes = [
    { note: '도', freq: 261.63 }, { note: '레', freq: 293.66 },
    { note: '미', freq: 329.63 }, { note: '파', freq: 349.23 },
    { note: '솔', freq: 392.00 }, { note: '라', freq: 440.00 },
    { note: '시', freq: 493.88 }, { note: '도', freq: 523.25 },
    { note: '레', freq: 587.33 }, { note: '미', freq: 659.25 }
  ];

  openModal(miniGameHeader('🎹', 'Piano Coreano', 'Toque músicas tradicionais!', 
    '🎵 Toque as teclas para ouvir as notas.<br>🎼 A escala é a pentatônica coreana.<br>🎁 Cada nota tocada vale <strong>+1 moeda</strong>.<br>🎹 Tente tocar uma melodia!'
  ) + `
    <div style="display:flex; justify-content:center; gap:3px; margin:15px 0; padding:15px; background:linear-gradient(180deg, #1a1a1a, #000); border-radius:15px; overflow-x:auto; box-shadow: 0 10px 40px rgba(0,0,0,0.5);" id="piano"></div>
    <div id="piano-info" style="min-height:30px; font-family:Black Han Sans; color:#0047a0; font-size: 1.1em;">🎵 Toque uma tecla!</div>
    <button class="btn-secondary" id="piano-demo" style="margin-top: 10px;">🎼 Tocar Arirang</button>
  `);

  const piano = $('piano');
  if (!piano) return;
  notes.forEach((n, i) => {
    const key = document.createElement('div');
    key.style.cssText = 'width:52px; height:130px; background:linear-gradient(180deg, #fff 0%, #e0e0e0 100%); border-radius:0 0 8px 8px; cursor:pointer; display:flex; align-items:flex-end; justify-content:center; padding-bottom:10px; font-family:Black Han Sans; font-size:0.85em; color:#0a0a0a; transition:all 0.1s; flex-shrink:0; box-shadow: 0 4px 8px rgba(0,0,0,0.3), inset 0 -4px 8px rgba(0,0,0,0.1); border-top: 3px solid #d4af37;';
    key.textContent = n.note;
    key.onclick = () => {
      playTone(n.freq, 0.8, 'sine', 0.15);
      key.style.background = 'linear-gradient(180deg, #d4af37 0%, #b8941f 100%)';
      key.style.color = 'white';
      key.style.transform = 'translateY(3px)';
      setTimeout(() => {
        key.style.background = 'linear-gradient(180deg, #fff 0%, #e0e0e0 100%)';
        key.style.color = '#0a0a0a';
        key.style.transform = '';
      }, 200);
      const info = $('piano-info');
      if (info) info.innerHTML = `🎵 Tocando: <strong>${n.note}</strong>`;
      GameState.coins += 1;
      addXP(1);
      saveGame();
      updateHUD();
      if (i === 0 || i === 7) checkAchievement('pianist');
    };
    piano.appendChild(key);
  });

  const demoBtn = $('piano-demo');
  if (demoBtn) demoBtn.onclick = () => {
    const arirang = [
      392.00, 349.23, 293.66, 329.63, 349.23, 392.00,
      440.00, 392.00, 349.23, 329.63, 293.66
    ];
    arirang.forEach((f, i) => {
      setTimeout(() => playTone(f, 0.5, 'sine', 0.15), i * 400);
    });
    const info = $('piano-info');
    if (info) info.innerHTML = '🎼 Tocando Arirang... 감동적이에요!';
  };
}

/* ==================== DADO ==================== */
function showDice() {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  let rolls = 0, totalCoins = 0;

  openModal(miniGameHeader('🎲', 'Dado Coreano', 'Tente a sorte no dado!', 
    '🎲 Role o dado quantas vezes quiser!<br>💰 Cada resultado dá moedas diferentes:<br>⚀=0, ⚁=3, ⚂=6, ⚃=10, ⚄=20, ⚅=40<br>⭐ Tire 5 ou 6 para ganhar bônus!'
  ) + `
    <div id="dice-display" style="font-size:7em; text-align:center; margin: 20px 0; animation: float 3s ease-in-out infinite; filter: drop-shadow(0 15px 40px rgba(212,175,55,0.6));">⚀</div>
    <div id="dice-result" style="font-family:Black Han Sans; color:#0047a0; margin-top:15px; font-size:1.1em; min-height:30px;"></div>
    <div id="dice-stats" style="font-family:Black Han Sans; color:#d4af37; margin: 15px 0; font-size: 0.9em;">Rolagens: 0 | Total ganho: 0🪙</div>
    <button class="primary-btn" id="dice-roll" style="padding:14px 40px; font-size:1em;">🎲 Rolar Dado</button>
  `);

  const btn = $('dice-roll');
  if (btn) btn.onclick = () => {
    const result = rand(1, 6);
    const display = $('dice-display');
    if (display) {
      display.style.animation = 'none';
      display.offsetHeight;
      display.style.animation = 'shake 0.5s';
      display.textContent = faces[result - 1];
    }
    const rewards = { 1: 0, 2: 3, 3: 6, 4: 10, 5: 20, 6: 40 };
    GameState.coins += rewards[result];
    totalCoins += rewards[result];
    rolls++;
    addXP(4);
    saveGame();
    updateHUD();
    const r = $('dice-result');
    if (r) r.innerHTML = `🎲 Tirou <strong>${result}</strong>! +<strong>${rewards[result]}</strong> moedas!`;
    const s = $('dice-stats');
    if (s) s.innerHTML = `Rolagens: ${rolls} | Total ganho: ${totalCoins}🪙`;
    if (result >= 5) {
      burstConfetti(50);
      playVictory();
      checkAchievement('gambler');
    } else if (result >= 3) {
      playCorrect();
      burstConfetti(20);
    } else {
      playWrong();
    }
  };
}

/* ==================== TARÔ ==================== */
function showTarot() {
  const cards = [
    { icon: '🌸', name: 'Flor de Cerejeira', meaning: 'Renascimento e beleza' },
    { icon: '🐉', name: 'Dragão', meaning: 'Poder e sorte' },
    { icon: '🍵', name: 'Tigela de Chá', meaning: 'Paz interior' },
    { icon: '🏯', name: 'Palácio', meaning: 'Estabilidade' },
    { icon: '🌙', name: 'Lua', meaning: 'Intuição' },
    { icon: '☯️', name: 'Taegeuk', meaning: 'Equilíbrio' },
    { icon: '🦊', name: 'Gumiho', meaning: 'Astúcia' },
    { icon: '🎋', name: 'Bambu', meaning: 'Flexibilidade' },
    { icon: '🌸', name: 'Ariza', meaning: 'Sabedoria e inspiração' },
    { icon: '🏮', name: 'Lanterna', meaning: 'Iluminação' }
  ];
  let flipped = false;

  openModal(miniGameHeader('🔮', 'Tarô Coreano', 'Revele sua sorte!', 
    '🔮 Clique na carta para revelar seu destino.<br>💫 Cada leitura vale <strong>+12 moedas</strong>.<br>✨ Tente tirar a carta da Ariza!'
  ) + `
    <div id="tarot-card" style="width:180px; height:280px; background:linear-gradient(135deg,#6a1b9a,#0047a0); border:4px solid #d4af37; border-radius:18px; display:flex; align-items:center; justify-content:center; flex-direction:column; padding:20px; color:white; margin:20px auto; cursor:pointer; transition:all 0.8s; font-family:'Nanum Myeongjo'; text-align:center; box-shadow: 0 20px 60px rgba(106,27,154,0.5);">
      <div style="font-size:3em; margin-bottom:10px;">🌟</div>
      <div style="font-size:1.1em; font-weight:700;">Clique aqui</div>
      <div style="font-size:0.75em; opacity: 0.8;">Revele sua sorte...</div>
    </div>
  `);

  const el = $('tarot-card');
  if (el) el.onclick = () => {
    if (flipped) return;
    const card = pick(cards);
    el.style.background = 'linear-gradient(135deg,#fdf6e3,#f0e6d2)';
    el.style.color = '#0047a0';
    el.style.transform = 'rotateY(360deg) scale(1.05)';
    el.innerHTML = `
      <div style="font-size:3em; margin-bottom:10px;">${card.icon}</div>
      <div style="font-size:1.1em; font-weight:700;">${card.name}</div>
      <div style="font-size:0.75em;">${card.meaning}</div>
    `;
    playUnlock();
    burstConfetti(50);
    checkAchievement('tarot-master');
    GameState.coins += 12;
    addXP(10);
    saveGame();
    updateHUD();
    flipped = true;
    if (card.name === 'Ariza') {
      setTimeout(() => {
        burstFireworks(10);
        speak('아리자', 'ko-KR');
      }, 500);
    }
  };
}

/* ==================== TESOURO ==================== */
function showTreasure() {
  let opened = false;

  openModal(miniGameHeader('💎', 'Cofre do Tesouro', 'Recompensas épicas aguardam!', 
    '💎 Clique no baú para abrir.<br>🎁 Sorteio aleatório entre várias recompensas.<br>🍀 Se tiver sorte, ganha uma CARTA RARA!<br>⚠️ Cada abertura é única nesta sessão.'
  ) + `
    <div id="treasure-chest" style="font-size:7em; text-align:center; cursor:pointer; animation: float 2s ease-in-out infinite; filter: drop-shadow(0 15px 40px rgba(212,175,55,0.7));">🎁</div>
    <div id="treasure-result" style="min-height:60px; font-family: Black Han Sans; color: #0047a0; margin-top: 15px; font-size: 1.1em;"></div>
  `);

  const chest = $('treasure-chest');
  if (chest) chest.onclick = () => {
    if (opened) return;
    opened = true;
    chest.textContent = '🎊';
    chest.style.animation = 'shake 0.5s';
    const rewards = [
      { name: '+25 moedas!', icon: '💰', coins: 25 },
      { name: '+15 moedas!', icon: '🪙', coins: 15 },
      { name: '+40 moedas!', icon: '💎', coins: 40 },
      { name: '+10 + carta!', icon: '🃏', coins: 10, card: true },
      { name: '+30 moedas!', icon: '💵', coins: 30 }
    ];
    const r = pick(rewards);
    let result = `${r.icon} ${r.name}`;
    GameState.coins += r.coins;
    if (r.card) {
      const locked = collectibleCards.filter(c => !GameState.collectedCards.has(c.id));
      if (locked.length) {
        const c = pick(locked);
        GameState.collectedCards.add(c.id);
        result += `<br>🃏 <strong>${c.emoji} ${c.name} (${c.rarity})</strong>!`;
        setTimeout(() => burstFireworks(8), 500);
      }
    }
    const resultEl = $('treasure-result');
    if (resultEl) resultEl.innerHTML = result;
    saveGame();
    updateHUD();
    burstConfetti(80);
    burstFireworks(6);
    playVictory();
  };
}

/* ==================== FORTUNA ==================== */
function showFortune() {
  const fortunes = [
    '🌸 Grandes oportunidades virão em breve. Esteja preparado!',
    '🐉 O dragão protege seu caminho. Sorte nos estudos!',
    '🍵 Encontre paz no silêncio. A resposta está dentro de você.',
    '🌙 Sua intuição está afiada. Confie nos seus sonhos.',
    '☯️ Equilíbrio é a chave. Não se sobrecarregue.',
    '🔥 Sua paixão iluminará o caminho. Persista!',
    '🌸 Uma pessoa sábia chamada Ariza te inspirará hoje!',
    '🏮 A luz da lanterna guia seus passos. Vá em frente!'
  ];

  openModal(miniGameHeader('🔮', 'Adivinhação Coreana', 'Receba sua sorte do dia!', 
    '🔮 Clique no botão para revelar sua fortuna.<br>💰 Cada leitura vale <strong>+8 moedas</strong>.<br>🍀 As mensagens mudam a cada consulta!'
  ) + `
    <div style="text-align:center; font-size:6em; margin:20px 0; animation: float 3s ease-in-out infinite; filter: drop-shadow(0 10px 30px rgba(106,27,154,0.5));">🎋</div>
    <button class="primary-btn" id="fortune-btn" style="padding:14px 40px; font-size:1em;">✨ Revelar Fortuna</button>
    <div id="fortune-result" style="margin-top:20px;"></div>
  `);

  const btn = $('fortune-btn');
  if (btn) btn.onclick = () => {
    const f = pick(fortunes);
    const r = $('fortune-result');
    if (r) r.innerHTML = `
      <div style="padding:25px; background:linear-gradient(135deg,#6a1b9a,#0047a0); border-radius:20px; color:white; font-family:'Nanum Myeongjo'; font-size:1.1em; line-height:1.8; border:3px solid #d4af37; box-shadow: 0 15px 40px rgba(106,27,154,0.5); animation: fadeIn 0.5s;">
        ${f}
      </div>
    `;
    burstConfetti(50);
    playUnlock();
    GameState.coins += 8;
    addXP(6);
    saveGame();
    updateHUD();
  };
}

/* ==================== KARAOKÊ ==================== */
function showKaraoke() {
  const songs = [
    {
      title: '아리랑 (Arirang)',
      words: ['아리랑', '아리랑', '아리랑', '고개로', '넘어', '간다'],
      notes: [261.63, 293.66, 329.63, 392.00, 349.23, 293.66, 261.63]
    }
  ];
  const current = songs[0];

  openModal(miniGameHeader('🎤', 'Karaokê Coreano', 'Cante a música tradicional coreana!', 
    '🎤 Clique em ▶️ Tocar para ouvir a música.<br>🎵 Acompanhe a letra que acende no ritmo!<br>⭐ Arirang é o hino não oficial da Coreia.<br>💰 Ganhe <strong>+15 moedas</strong> ao completar.'
  ) + `
    <div id="karaoke-lyrics" style="font-family: 'Nanum Myeongjo'; font-size: 1.5em; color: #0047a0; text-align: center; padding: 25px; min-height: 120px; line-height: 2; background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,183,197,0.15)); border-radius: 15px; margin: 15px 0; border: 2px dashed #d4af37;"></div>
    <button class="btn-secondary" id="karaoke-play" style="font-size: 1em; padding: 12px 30px;">▶️ Tocar</button>
  `);

  const lyr = $('karaoke-lyrics');
  if (lyr) {
    lyr.innerHTML = `<div style="font-size: 0.7em; color: #888; margin-bottom: 15px;">${current.title}</div>`;
    current.words.forEach((w, i) => {
      const span = document.createElement('span');
      span.textContent = w + ' ';
      span.id = 'kw-' + i;
      lyr.appendChild(span);
    });
  }

  const btn = $('karaoke-play');
  if (btn) btn.onclick = () => {
    current.notes.forEach((f, i) => {
      setTimeout(() => {
        playTone(f, 0.6, 'sine', 0.14);
        document.querySelectorAll('#karaoke-lyrics span').forEach(w => w.style.background = '');
        const w = $('kw-' + i);
        if (w) {
          w.style.background = 'linear-gradient(135deg,#cd2e3a,#d4af37)';
          w.style.color = 'white';
          w.style.padding = '4px 10px';
          w.style.borderRadius = '8px';
        }
        if (i === current.notes.length - 1) {
          setTimeout(() => {
            document.querySelectorAll('#karaoke-lyrics span').forEach(w => {
              w.style.background = '';
              w.style.color = '';
              w.style.padding = '';
            });
            checkAchievement('karaoke-star');
            GameState.coins += 15;
            addXP(12);
            saveGame();
            updateHUD();
            burstConfetti(60);
          }, 600);
        }
      }, i * 700);
    });
  };
}

/* ==================== HANBOK ==================== */
function showHanbok() {
  const colors = ['#cd2e3a', '#0047a0', '#d4af37', '#00a86b', '#6a1b9a', '#ff6b35', '#ffb7c5', '#0a0a0a'];

  openModal(miniGameHeader('👘', 'Hanbok Designer', 'Crie seu hanbok personalizado!', 
    '👘 Clique nas cores para personalizar seu hanbok.<br>🎨 Combine topo (상의) e saia (하의).<br>💾 Salve seu design e ganhe recompensa!<br>💰 <strong>+12 moedas</strong> ao salvar.'
  ) + `
    <div style="width:200px; height:290px; margin:15px auto; position:relative; background: linear-gradient(135deg, rgba(0,0,0,0.03), rgba(0,0,0,0.08)); border-radius:15px; padding:20px; box-shadow: inset 0 0 30px rgba(0,0,0,0.1);">
      <div id="hb-top" style="width:120px; height:100px; margin:0 auto; background:#cd2e3a; border-radius:25px 25px 8px 8px; transition:all 0.5s; box-shadow: 0 8px 20px rgba(0,0,0,0.2);"></div>
      <div id="hb-skirt" style="width:155px; height:135px; margin:8px auto 0; background:#0047a0; border-radius:8px 8px 25px 25px; transition:all 0.5s; box-shadow: 0 8px 20px rgba(0,0,0,0.2);"></div>
    </div>
    <div style="display:flex; gap:25px; justify-content:center; flex-wrap:wrap;">
      <div>
        <div style="font-size:0.85em; font-weight:700; color:#0047a0; margin-bottom:8px;">상의 Topo</div>
        <div id="hb-top-colors" style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;"></div>
      </div>
      <div>
        <div style="font-size:0.85em; font-weight:700; color:#0047a0; margin-bottom:8px;">하의 Saia</div>
        <div id="hb-skirt-colors" style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;"></div>
      </div>
    </div>
    <button class="btn-secondary" id="hb-save" style="margin-top:15px;">💾 Salvar Design</button>
  `);

  function makeSwatches(containerId, target) {
    const c = $(containerId);
    if (!c) return;
    colors.forEach(col => {
      const sw = document.createElement('div');
      sw.style.cssText = 'width:30px; height:30px; border-radius:50%; cursor:pointer; border:3px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.25); transition: all 0.3s;';
      sw.style.background = col;
      sw.onmouseenter = () => sw.style.transform = 'scale(1.2)';
      sw.onmouseleave = () => sw.style.transform = '';
      sw.onclick = () => {
        const el = $(target === 'top' ? 'hb-top' : 'hb-skirt');
        if (el) el.style.background = col;
        playTone(600, 0.1);
      };
      c.appendChild(sw);
    });
  }
  makeSwatches('hb-top-colors', 'top');
  makeSwatches('hb-skirt-colors', 'skirt');

  const btn = $('hb-save');
  if (btn) btn.onclick = () => {
    checkAchievement('hanbok-designer');
    GameState.coins += 12;
    addXP(10);
    saveGame();
    updateHUD();
    burstConfetti(40);
    playUnlock();
  };
}

/* ==================== SIJO ==================== */
function showSijo() {
  const poems = [
    { kor: '청산리 벽계수야', pt: 'Montanhas azuis, riachos verdes', author: 'Hwang Jini' },
    { kor: '동짓달 기나긴 밤을', pt: 'Noite longa do solstício', author: 'Hwang Jini' },
    { kor: '이 몸이 죽고 죽어', pt: 'Morrer e morrer novamente', author: 'Jeong Mong-ju' },
    { kor: '어져 내 일이야', pt: 'O que posso fazer', author: 'Anônimo' }
  ];
  let idx = 0;

  openModal(miniGameHeader('📜', 'Poesia Sijo', 'Poesia tradicional coreana!', 
    '📜 Leia e ouça a poesia em coreano.<br>🎵 Sijo tem estrutura de 3 linhas.<br>💡 Clique em 🔊 para ouvir.<br>💰 <strong>+8 moedas</strong> a cada poema.'
  ) + `
    <div id="sijo-poem" style="font-family: 'Nanum Myeongjo'; font-size: 1.2em; line-height: 2; text-align: center; padding: 20px; background: linear-gradient(135deg, rgba(212,175,55,0.1), rgba(255,183,197,0.1)); border-radius: 15px; border: 2px dashed #d4af37; margin: 15px 0; color: #0047a0; min-height: 150px;"></div>
    <div class="btn-row">
      <button class="btn-secondary" id="sijo-speak">🔊 Ouvir</button>
      <button class="btn-secondary" id="sijo-copy">📋 Copiar</button>
      <button class="btn-secondary" id="sijo-next">📖 Próximo Poema</button>
    </div>
  `);

  function render() {
    const p = poems[idx];
    const el = $('sijo-poem');
    if (el) el.innerHTML = `
      <div style="font-size: 1.5em; color: #cd2e3a; margin-bottom: 15px; font-weight: 800;">${p.kor}</div>
      <em style="display: block; margin-bottom: 10px;">"${p.pt}"</em>
      <div style="font-size: 0.75em; color: #888;">— ${p.author}</div>
    `;
  }
  render();

  const sb = $('sijo-speak');
  if (sb) sb.onclick = () => speak(poems[idx].kor, 'ko-KR');
  const cb = $('sijo-copy');
  if (cb) cb.onclick = () => {
    const p = poems[idx];
    const text = `${p.kor}\n"${p.pt}"\n— ${p.author}`;
    copyToClipboard(text, cb);
  };
  const nb = $('sijo-next');
  if (nb) nb.onclick = () => {
    idx = (idx + 1) % poems.length;
    render();
    checkAchievement('sijo-lover');
    GameState.coins += 8;
    addXP(6);
    saveGame();
    updateHUD();
    playClick();
  };
}

/* ==================== GO ==================== */
function showGo() {
  const SIZE = 9;
  let board = Array(SIZE).fill().map(() => Array(SIZE).fill(null));
  let gameOver = false;

  openModal(miniGameHeader('⚫', 'Go (Baduk)', 'Jogo estratégico coreano!', 
    '⚫ Você é as pedras <strong>pretas (●)</strong>.<br>🎯 Faça <strong>5 em linha</strong> para vencer!<br>🤖 A IA joga com as <strong>brancas (○)</strong>.<br>💰 Vencer vale <strong>+35 moedas</strong>.'
  ) + `
    <div id="go-board" style="display:grid; grid-template-columns:repeat(9, 1fr); gap:1px; background:#8b6914; padding:10px; border-radius:10px; max-width:340px; margin:15px auto; box-shadow: 0 15px 40px rgba(0,0,0,0.4);"></div>
    <div id="go-info" style="font-family: Black Han Sans; color: #0047a0; margin-top: 12px; font-size:1em;">🎯 Sua vez!</div>
    <button class="btn-secondary" id="go-reset" style="margin-top:10px;">🔄 Reiniciar</button>
  `);

  function render() {
    const g = $('go-board');
    if (!g) return;
    g.innerHTML = '';
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement('div');
        cell.style.cssText = 'aspect-ratio:1; background:linear-gradient(135deg,#deb887,#c9a86a); border:1px solid rgba(139,115,85,0.5); display:flex; align-items:center; justify-content:center; cursor:pointer; font-size:1.3em; transition: all 0.2s;';
        if (board[r][c] === 'black') { cell.textContent = '●'; cell.style.color = '#0a0a0a'; }
        else if (board[r][c] === 'white') { cell.textContent = '○'; cell.style.color = '#ffffff'; cell.style.textShadow = '1px 1px 2px black'; }
        cell.onmouseenter = () => { if (!board[r][c]) cell.style.background = 'linear-gradient(135deg,#f5deb3,#deb887)'; };
        cell.onmouseleave = () => { if (!board[r][c]) cell.style.background = 'linear-gradient(135deg,#deb887,#c9a86a)'; };
        cell.onclick = () => place(r, c);
        g.appendChild(cell);
      }
    }
  }

  function checkWin(player) {
    const dirs = [[1,0],[0,1],[1,1],[1,-1]];
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        for (const [dr, dc] of dirs) {
          let count = 0;
          for (let k = 0; k < 5; k++) {
            const nr = r + dr * k, nc = c + dc * k;
            if (nr < 0 || nr >= SIZE || nc < 0 || nc >= SIZE || board[nr][nc] !== player) break;
            count++;
          }
          if (count === 5) return true;
        }
      }
    }
    return false;
  }

  function place(r, c) {
    if (gameOver || board[r][c]) return;
    board[r][c] = 'black';
    playTone(600, 0.1);
    render();
    if (checkWin('black')) {
      const i = $('go-info');
      if (i) i.innerHTML = '🎉 <span style="color:#4caf50; font-size:1.2em;">VOCÊ VENCEU!</span>';
      playVictory();
      burstConfetti(100);
      checkAchievement('baduk');
      GameState.coins += 35;
      addXP(30);
      saveGame();
      updateHUD();
      gameOver = true;
      return;
    }
    setTimeout(aiMove, 400);
  }

  function aiMove() {
    if (gameOver) return;
    const empty = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (!board[r][c]) empty.push({ r, c });
    if (!empty.length) return;
    let best = pick(empty);
    const blacks = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (board[r][c] === 'black') blacks.push({ r, c });
    if (blacks.length) {
      const n = pick(blacks);
      let minD = Infinity;
      for (const e of empty) {
        const d = Math.abs(e.r - n.r) + Math.abs(e.c - n.c);
        if (d < minD) { minD = d; best = e; }
      }
    }
    board[best.r][best.c] = 'white';
    playTone(400, 0.1);
    render();
    if (checkWin('white')) {
      const i = $('go-info');
      if (i) i.innerHTML = '😢 <span style="color:#cd2e3a;">IA venceu! Tente novamente</span>';
      playWrong();
      gameOver = true;
    } else {
      const i = $('go-info');
      if (i) i.textContent = '🎯 Sua vez!';
    }
  }

  render();
  const rb = $('go-reset');
  if (rb) rb.onclick = () => {
    board = Array(SIZE).fill().map(() => Array(SIZE).fill(null));
    gameOver = false;
    const i = $('go-info');
    if (i) i.textContent = '🎯 Sua vez!';
    render();
    playClick();
  };
}

/* ==================== MUNDO ==================== */
function showWorld() {
  const places = {
    'Gyeongbokgung': { desc: 'O maior palácio de Seul', fact: '7.000 quartos!' },
    'Torre N Seoul': { desc: 'Torre de 236m', fact: 'Vista panorâmica!' },
    'Templo Bulguksa': { desc: 'Templo milenar', fact: 'UNESCO!' },
    'Ilha de Jeju': { desc: 'Ilha vulcânica', fact: 'Maior tubo de lava!' },
    'Mercado de Seul': { desc: 'Mercado tradicional', fact: 'Desde 1905!' }
  };

  openModal(miniGameHeader('🌆', 'Explore a Coreia', 'Conheça pontos turísticos!', 
    '🌆 Clique nos locais para saber mais.<br>🏯 Cada local vale <strong>+6 moedas</strong>.<br>💡 Descubra curiosidades sobre cada um!'
  ) + `
    <div style="width:100%; height:320px; background:linear-gradient(180deg,#87ceeb 0%,#e0f6ff 55%,#8b7355 55%,#6b4423 100%); border-radius:15px; position:relative; overflow:hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.3);">
      <div style="position:absolute;top:30px;right:60px;width:70px;height:70px;background:radial-gradient(circle,#ffeb3b,#ff9800);border-radius:50%;box-shadow:0 0 80px rgba(255,235,59,0.9);animation: float 6s ease-in-out infinite;"></div>
      <div style="position:absolute;top:60px;left:10%;font-size:2em;animation: float 8s ease-in-out infinite;">☁️</div>
      <div style="position:absolute;left:8%;bottom:42%;font-size:3em;cursor:pointer;transition: all 0.3s;" data-place="Gyeongbokgung" onmouseover="this.style.transform='translateY(-12px) scale(1.15)'" onmouseout="this.style.transform=''">🏯</div>
      <div style="position:absolute;left:28%;bottom:42%;font-size:3em;cursor:pointer;transition: all 0.3s;" data-place="Torre N Seoul" onmouseover="this.style.transform='translateY(-12px) scale(1.15)'" onmouseout="this.style.transform=''">🗼</div>
      <div style="position:absolute;left:48%;bottom:42%;font-size:3em;cursor:pointer;transition: all 0.3s;" data-place="Templo Bulguksa" onmouseover="this.style.transform='translateY(-12px) scale(1.15)'" onmouseout="this.style.transform=''">⛩️</div>
      <div style="position:absolute;left:68%;bottom:42%;font-size:3em;cursor:pointer;transition: all 0.3s;" data-place="Ilha de Jeju" onmouseover="this.style.transform='translateY(-12px) scale(1.15)'" onmouseout="this.style.transform=''">🏝️</div>
      <div style="position:absolute;left:85%;bottom:42%;font-size:3em;cursor:pointer;transition: all 0.3s;" data-place="Mercado de Seul" onmouseover="this.style.transform='translateY(-12px) scale(1.15)'" onmouseout="this.style.transform=''">🏪</div>
    </div>
    <div id="world-info" style="min-height:60px; font-family: Black Han Sans; color: #0047a0; margin: 15px 0; font-size:0.95em; padding: 12px; background: rgba(212,175,55,0.1); border-radius: 12px;">👆 Clique em um local para saber mais!</div>
  `);

  document.querySelectorAll('[data-place]').forEach(b => {
    b.onclick = () => {
      playClick();
      const info = places[b.dataset.place];
      const el = $('world-info');
      if (el) el.innerHTML = `<strong style="color: #cd2e3a; font-size: 1.1em;">${b.dataset.place}</strong><br><small style="color:#666">${info.desc}<br>💡 ${info.fact}</small>`;
      GameState.coins += 6;
      addXP(5);
      saveGame();
      updateHUD();
      checkAchievement('world-explorer');
      burstConfetti(15);
    };
  });
}

/* ==================== PALÁCIOS ==================== */
function showPalaces() {
  const palaces = [
    { name: 'Gyeongbokgung', kor: '경복궁', year: 1395, emoji: '🏯' },
    { name: 'Changdeokgung', kor: '창덕궁', year: 1405, emoji: '🏛️' },
    { name: 'Deoksugung', kor: '덕수궁', year: 1592, emoji: '🕍' },
    { name: 'Changgyeonggung', kor: '창경궁', year: 1484, emoji: '🏰' },
    { name: 'Gyeonghuigung', kor: '경희궁', year: 1616, emoji: '🏯' }
  ];

  openModal(miniGameHeader('🏯', 'Palácios de Seul', 'Conheça os 5 grandes palácios!', 
    '🏯 Clique em cada palácio para ouvir o nome em coreano.<br>💡 Cada um tem história única!<br>💰 <strong>+8 moedas</strong> por palácio visitado.'
  ) + `<div id="palaces-list" style="display:grid; gap:10px;"></div>`);

  const list = $('palaces-list');
  if (!list) return;
  palaces.forEach(p => {
    const el = document.createElement('div');
    el.style.cssText = 'padding:15px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; text-align:left; cursor:pointer; transition: all 0.3s; box-shadow: 0 4px 12px rgba(0,0,0,0.08);';
    el.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items: center; gap: 10px;">
        <span style="font-size: 1.8em;">${p.emoji}</span>
        <div style="flex: 1;">
          <div style="font-family:Black Han Sans; color:#0047a0; font-size: 1em;">${p.name}</div>
          <div style="font-family:'Nanum Myeongjo'; color:#cd2e3a; font-size:1.2em;">${p.kor}</div>
        </div>
        <div style="font-family:Black Han Sans; color:#d4af37; font-size: 1.1em;">${p.year}</div>
      </div>
    `;
    el.onmouseenter = () => el.style.transform = 'translateX(8px)';
    el.onmouseleave = () => el.style.transform = '';
    el.onclick = () => {
      burstConfetti(20);
      GameState.coins += 8;
      addXP(8);
      saveGame();
      updateHUD();
      speak(p.kor, 'ko-KR');
    };
    list.appendChild(el);
  });
}

/* ==================== PERSONAGENS ==================== */
function showCharacters() {
  const chars = [
    { emoji: '👑', name: 'Rei Sejong', kor: '세종대왕', desc: 'Criador do Hangul' },
    { emoji: '⚔️', name: 'Yi Sun-sin', kor: '이순신', desc: 'Almirante herói' },
    { emoji: '🎨', name: 'Shin Saimdang', kor: '신사임당', desc: 'Artista e poetisa' },
    { emoji: '📚', name: 'Yun Dong-ju', kor: '윤동주', desc: 'Poeta da resistência' },
    { emoji: '🏛️', name: 'Kim Gu', kor: '김구', desc: 'Líder da independência' },
    { emoji: '✍️', name: 'Han Yong-un', kor: '한용운', desc: 'Monge e poeta' }
  ];

  openModal(miniGameHeader('👥', 'Personagens Históricos', 'Figuras importantes da Coreia!', 
    '👥 Clique em cada personagem para ouvir seu nome.<br>🎓 Descubra quem foram essas figuras!<br>💰 <strong>+5 moedas</strong> por personagem.'
  ) + `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
      ${chars.map(c => `
        <div style="padding:15px 10px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; cursor:pointer; text-align:center; transition: all 0.3s;" data-char="${c.kor}" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform=''">
          <span style="font-size:2.5em; display:block;">${c.emoji}</span>
          <div style="font-family:'Black Han Sans'; font-size:0.9em; color:#0047a0; margin-top: 5px;">${c.name}</div>
          <div style="font-family:'Nanum Myeongjo'; color:#cd2e3a; font-size:1em;">${c.kor}</div>
          <div style="font-size: 0.7em; color: #888; margin-top: 4px;">${c.desc}</div>
        </div>
      `).join('')}
    </div>
  `);

  document.querySelectorAll('[data-char]').forEach(el => {
    el.onclick = () => {
      speak(el.dataset.char, 'ko-KR');
      burstConfetti(15);
      GameState.coins += 5;
      addXP(5);
      saveGame();
      updateHUD();
    };
  });
}

/* ==================== CINEMA ==================== */
function showCinema() {
  const movies = [
    { emoji: '🦑', name: 'Round 6', year: 2021, desc: 'Sobrevivência' },
    { emoji: '🏠', name: 'Parasita', year: 2019, desc: 'Oscar de Melhor Filme' },
    { emoji: '🚂', name: 'Train to Busan', year: 2016, desc: 'Zumbis' },
    { emoji: '🔥', name: 'Oldboy', year: 2003, desc: 'Clássico' },
    { emoji: '👧', name: 'The Handmaiden', year: 2016, desc: 'Drama' },
    { emoji: '🌊', name: 'Memories of Murder', year: 2003, desc: 'Policial' }
  ];

  openModal(miniGameHeader('🎬', 'Cinema Coreano', 'Filmes famosos mundialmente!', 
    '🎬 Conheça os filmes coreanos mais famosos!<br>🏆 Parasita ganhou o Oscar de Melhor Filme.<br>🦑 Round 6 foi a série mais assistida da Netflix.<br>💰 <strong>+4 moedas</strong> por filme.'
  ) + `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:10px 0;">
      ${movies.map(m => `
        <div data-movie="${m.name}" style="padding:15px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; cursor:pointer; text-align:center; transition: all 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform=''">
          <div style="font-size:2.2em;">${m.emoji}</div>
          <div style="font-family:Black Han Sans; font-size:0.95em; color: #0047a0; margin-top: 6px;">${m.name}</div>
          <div style="font-size: 0.7em; color: #888;">${m.year} • ${m.desc}</div>
        </div>
      `).join('')}
    </div>
  `);

  document.querySelectorAll('[data-movie]').forEach(el => {
    el.onclick = () => {
      burstConfetti(20);
      GameState.coins += 4;
      addXP(4);
      saveGame();
      updateHUD();
      playCorrect();
    };
  });
}

/* ==================== SAJU ==================== */
function showSaju() {
  const animals = [
    { emoji: '🐀', name: 'Rato', trait: 'Inteligente e astuto' },
    { emoji: '🐂', name: 'Búfalo', trait: 'Trabalhador e confiável' },
    { emoji: '🐅', name: 'Tigre', trait: 'Corajoso e competitivo' },
    { emoji: '🐇', name: 'Coelho', trait: 'Gentil e artístico' },
    { emoji: '🐉', name: 'Dragão', trait: 'Ambicioso e carismático' },
    { emoji: '🐍', name: 'Serpente', trait: 'Sábio e misterioso' },
    { emoji: '🐎', name: 'Cavalo', trait: 'Energético e aventureiro' },
    { emoji: '🐐', name: 'Cabra', trait: 'Criativo e empático' },
    { emoji: '🐒', name: 'Macaco', trait: 'Engenhoso e curioso' },
    { emoji: '🐓', name: 'Galo', trait: 'Confiante e honesto' },
    { emoji: '🐕', name: 'Cão', trait: 'Leal e protetor' },
    { emoji: '🐖', name: 'Porco', trait: 'Generoso e sortudo' }
  ];
  const elements = ['Madeira 🌳', 'Fogo 🔥', 'Terra ⛰️', 'Metal ⚙️', 'Água 💧'];

  openModal(miniGameHeader('🌟', 'Saju — Astrologia', 'Descubra seu signo coreano!', 
    '🌟 Digite seu ano de nascimento.<br>🎋 Descubra seu animal do zodíaco!<br>💫 Veja o elemento associado.<br>💰 <strong>+10 moedas</strong> por consulta.'
  ) + `
    <input type="number" id="saju-year" min="1900" max="2030" value="2000" placeholder="Ano de nascimento" style="width:100%; padding:15px; border:2px solid #d4af37; border-radius:12px; margin:15px 0; text-align:center; font-size:1.1em; font-family: 'Black Han Sans';">
    <button class="primary-btn" id="saju-calc" style="padding:14px 40px; font-size:1em;">✨ Calcular</button>
    <div id="saju-result" style="min-height:100px; margin-top: 20px;"></div>
  `);

  const btn = $('saju-calc');
  if (btn) btn.onclick = () => {
    const year = parseInt($('saju-year').value) || 2000;
    const animalIdx = ((year - 1900) % 12 + 12) % 12;
    const elementIdx = (Math.floor((year - 1900) / 2) % 5 + 5) % 5;
    const animal = animals[animalIdx];
    const r = $('saju-result');
    if (r) r.innerHTML = `
      <div style="padding: 20px; background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(205,46,58,0.1)); border-radius: 15px; border: 2px solid #d4af37; animation: fadeIn 0.5s;">
        <div style="font-size: 4.5em; animation: float 3s ease-in-out infinite;">${animal.emoji}</div>
        <div style="font-family: Black Han Sans; color: #cd2e3a; font-size: 1.3em; margin: 8px 0;">Ano do ${animal.name}</div>
        <div style="font-size: 0.85em; color: #666; margin-bottom: 10px;">${animal.trait}</div>
        <div style="font-size: 0.9em; color: #0047a0; font-family: 'Black Han Sans';">Elemento: ${elements[elementIdx]}</div>
      </div>
    `;
    burstConfetti(50);
    playUnlock();
    GameState.coins += 10;
    addXP(10);
    saveGame();
    updateHUD();
    checkAchievement('sa ju');
  };
}

/* ==================== NOMES ==================== */
function showNames() {
  const surnames = [
    { hangul: '김', roman: 'Kim' }, { hangul: '이', roman: 'Lee' },
    { hangul: '박', roman: 'Park' }, { hangul: '최', roman: 'Choi' },
    { hangul: '정', roman: 'Jung' }, { hangul: '강', roman: 'Kang' }
  ];
  const givenNames = [
    { hangul: '민준', roman: 'Min-jun', meaning: 'Inteligente e talentoso' },
    { hangul: '서연', roman: 'Seo-yeon', meaning: 'Gentil e bela' },
    { hangul: '도윤', roman: 'Do-yun', meaning: 'Caminho da verdade' },
    { hangul: '하은', roman: 'Ha-eun', meaning: 'Graça prateada' },
    { hangul: '지호', roman: 'Ji-ho', meaning: 'Sabedoria e sorte' },
    { hangul: '수아', roman: 'Su-a', meaning: 'Água elegante' },
    { hangul: '아리자', roman: 'Ariza', meaning: 'Sabedoria e inspiração 🌸' }
  ];

  openModal(miniGameHeader('📛', 'Gerador de Nomes', 'Descubra seu nome coreano!', 
    '📛 Digite seu nome real.<br>✨ Vou gerar um nome coreano personalizado!<br>💡 Baseado nas sílabas do seu nome.<br>💰 <strong>+8 moedas</strong> por nome gerado.'
  ) + `
    <input type="text" id="name-input" placeholder="Digite seu nome..." style="width:100%; padding:15px; border:2px solid #d4af37; border-radius:12px; text-align:center; font-size: 1em;">
    <button class="primary-btn" id="name-calc" style="margin-top:15px; padding:14px 40px; font-size:1em;">✨ Gerar Nome</button>
    <div id="name-result" style="min-height:100px; margin-top: 20px;"></div>
  `);

  const btn = $('name-calc');
  if (btn) btn.onclick = () => {
    const inputName = $('name-input').value.trim();
    if (!inputName) {
      const r = $('name-result');
      if (r) r.innerHTML = '<div style="color:#cd2e3a; padding: 15px;">✍️ Digite um nome!</div>';
      return;
    }
    const s = surnames[inputName.length % surnames.length];
    const g = givenNames[(inputName.charCodeAt(0) + inputName.length) % givenNames.length];
    const r = $('name-result');
    if (r) r.innerHTML = `
      <div style="padding: 20px; background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(205,46,58,0.1)); border-radius: 15px; border: 2px solid #d4af37; animation: fadeIn 0.5s;">
        <div style="font-family: 'Nanum Myeongjo'; font-size: 3em; color: #cd2e3a; margin-bottom: 8px;">${s.hangul}${g.hangul}</div>
        <div style="font-family: Black Han Sans; color: #0047a0; font-size: 1.2em;">${s.roman} ${g.roman}</div>
        <div style="font-size: 0.85em; color: #666; margin-top: 8px;">Significado: ${g.meaning}</div>
      </div>
    `;
    playUnlock();
    burstConfetti(60);
    speak(g.hangul, 'ko-KR');
    GameState.coins += 8;
    addXP(8);
    saveGame();
    updateHUD();
  };
}

/* ==================== FRASES COM COPIAR ==================== */
function showPhrases() {
  const phrases = [
    { kor: '안녕하세요', rom: 'Annyeonghaseyo', pt: 'Olá' },
    { kor: '감사합니다', rom: 'Gamsahamnida', pt: 'Obrigado(a)' },
    { kor: '사랑해요', rom: 'Saranghaeyo', pt: 'Eu te amo' },
    { kor: '화이팅', rom: 'Hwaiting', pt: 'Força!' },
    { kor: '대박', rom: 'Daebak', pt: 'Incrível!' },
    { kor: '친구', rom: 'Chingu', pt: 'Amigo' },
    { kor: '선생님', rom: 'Seonsaengnim', pt: 'Professor(a)' },
    { kor: '아리자', rom: 'Ariza', pt: 'Ariza 🌸' }
  ];

  openModal(miniGameHeader('💬', 'Frases em Coreano', 'Aprenda expressões essenciais!', 
    '💬 Clique em cada frase para ouvir a pronúncia.<br>🔊 Áudio em coreano autêntico.<br>📋 Use o botão COPIAR para salvar cada frase!<br>💰 <strong>+2 moedas</strong> por frase.'
  ) + `
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:10px 0;">
      ${phrases.map((p, i) => `
        <div style="padding:15px 10px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; text-align:center; transition: all 0.3s;" data-index="${i}">
          <div style="font-family: 'Nanum Myeongjo'; font-size: 1.4em; color: #cd2e3a; font-weight: 700; cursor: pointer;" class="phrase-play" data-kor="${p.kor}">${p.kor}</div>
          <div style="font-size: 0.75em; color: #0047a0; font-weight: 700; margin-top: 4px;">${p.rom}</div>
          <div style="font-size: 0.8em; color: #666; margin-top: 2px;">${p.pt}</div>
          <button class="copy-btn" data-copy="${p.kor}|${p.rom}|${p.pt}">📋 Copiar</button>
        </div>
      `).join('')}
    </div>
  `);

  document.querySelectorAll('.phrase-play').forEach(el => {
    el.onclick = () => {
      speak(el.dataset.kor, 'ko-KR');
      playTone(700, 0.2);
      GameState.coins += 2;
      addXP(3);
      saveGame();
      updateHUD();
    };
  });

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const [kor, rom, pt] = btn.dataset.copy.split('|');
      const text = `${kor}\n${rom} — ${pt}`;
      copyToClipboard(text, btn);
      GameState.coins += 2;
      addXP(2);
      saveGame();
      updateHUD();
    };
  });
}

/* ==================== IDOL ==================== */
function showIdol() {
  let stats = { energia: 100, popularidade: 10, dinheiro: 50, fans: 100 };
  const logs = [];

  openModal(miniGameHeader('🎤', 'K-Pop Idol Manager', 'Gerencie seu grupo de K-Pop!', 
    '🎤 Treine seu grupo para aumentar popularidade.<br>🎵 Faça shows para ganhar dinheiro e fãs.<br>💤 Descansem para recuperar energia.<br>⚠️ Se cansar muito, não consegue performar!'
  ) + `
    <div id="idol-stats" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:15px 0;"></div>
    <div style="margin:15px 0; display:flex; gap:8px; justify-content:center; flex-wrap:wrap;">
      <button class="btn-secondary" id="idol-train">💪 Treinar</button>
      <button class="btn-secondary" id="idol-perform">🎤 Show</button>
      <button class="btn-secondary" id="idol-rest">💤 Descansar</button>
    </div>
    <div id="idol-log" style="min-height:80px; font-size:0.85em; padding:12px; background: rgba(212,175,55,0.1); border-radius:12px; text-align:left;"></div>
  `);

  function render() {
    const s = $('idol-stats');
    if (s) s.innerHTML = `
      <div class="hud-badge" style="justify-content:center; padding: 10px;">⚡ Energia: ${stats.energia}%</div>
      <div class="hud-badge" style="justify-content:center; padding: 10px;">⭐ Pop: ${stats.popularidade}</div>
      <div class="hud-badge" style="justify-content:center; padding: 10px;">💰 $: ${stats.dinheiro}k</div>
      <div class="hud-badge" style="justify-content:center; padding: 10px;">👥 Fãs: ${stats.fans}</div>
    `;
    const l = $('idol-log');
    if (l) l.innerHTML = logs.slice(-4).reverse().join('<br>');
  }

  const tb = $('idol-train');
  if (tb) tb.onclick = () => {
    if (stats.energia < 20) { logs.push('❌ Cansado! Descanse primeiro.'); render(); return; }
    stats.energia -= 20;
    stats.popularidade += 2;
    logs.push('💪 Treinaram! +2 popularidade');
    render();
    playClick();
  };
  const pb = $('idol-perform');
  if (pb) pb.onclick = () => {
    if (stats.energia < 30) { logs.push('❌ Cansados! Descanse primeiro.'); render(); return; }
    if (stats.popularidade < 15) { logs.push('❌ Popularidade baixa!'); render(); return; }
    stats.energia -= 30;
    stats.dinheiro += stats.popularidade * 2;
    stats.fans += stats.popularidade * 50;
    logs.push(`🎤 Show! +${stats.popularidade * 50} fãs`);
    playCorrect();
    burstConfetti(30);
    GameState.coins += 10;
    addXP(10);
    saveGame();
    updateHUD();
    if (stats.fans >= 3000) checkAchievement('idol-manager');
    render();
  };
  const rb = $('idol-rest');
  if (rb) rb.onclick = () => {
    stats.energia = Math.min(100, stats.energia + 40);
    logs.push('💤 Descansaram bem');
    render();
    playClick();
  };
  render();
}

/* ==================== FAZENDA ==================== */
function showFarm() {
  const crops = ['🌱', '🌿', '🥬', '🍚', '🌾', '🥕', '🧄', '🌶️'];
  let harvested = 0;

  openModal(miniGameHeader('🌾', 'Fazenda Coreana', 'Cultive alimentos!', 
    '🌾 Clique nas plantações para cultivá-las.<br>🌱 Cada planta passa por 3 estágios.<br>🌾 Quando madura, colha para ganhar!<br>💰 <strong>+5 moedas</strong> por colheita.'
  ) + `
    <div id="farm-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:10px; margin:15px 0;"></div>
    <div id="farm-info" style="font-family:Black Han Sans; color:#0047a0; font-size:1em;">🌾 Colheita: 0</div>
  `);

  const grid = $('farm-grid');
  if (!grid) return;
  for (let i = 0; i < 12; i++) {
    let stage = 0;
    const plot = document.createElement('div');
    plot.style.cssText = 'aspect-ratio:1; background:linear-gradient(135deg,#8b7355,#6b4423); border:2px solid #d4af37; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:2em; cursor:pointer; transition: all 0.3s;';
    plot.textContent = '🌱';
    plot.onclick = () => {
      if (stage < 3) {
        stage++;
        plot.textContent = crops[(i + stage) % crops.length];
        plot.style.transform = `scale(${1 + stage * 0.05})`;
        playTone(400 + stage * 150, 0.2);
        if (stage === 3) {
          harvested++;
          const info = $('farm-info');
          if (info) info.textContent = `🌾 Colheita: ${harvested}`;
          GameState.coins += 5;
          addXP(4);
          saveGame();
          updateHUD();
          burstConfetti(15);
          if (harvested >= 5) checkAchievement('gardener');
          setTimeout(() => {
            stage = 0;
            plot.textContent = '🌱';
            plot.style.transform = '';
          }, 1500);
        }
      }
    };
    grid.appendChild(plot);
  }
}

/* ==================== RESTAURANTE ==================== */
function showRestaurant() {
  const dishes = [
    { emoji: '🍜', name: 'Kimchi Jjigae' }, { emoji: '🍚', name: 'Bibimbap' },
    { emoji: '🥩', name: 'Bulgogi' }, { emoji: '🍢', name: 'Tteokbokki' },
    { emoji: '🥟', name: 'Mandu' }, { emoji: '🍲', name: 'Ramyun' }
  ];
  let ordersServed = 0;
  let currentOrder;

  openModal(miniGameHeader('🍽️', 'Restaurante Coreano', 'Atenda seus clientes!', 
    '🍽️ Cada cliente pede um prato.<br>🎯 Clique no prato correto!<br>💰 <strong>+3 moedas</strong> por pedido correto.<br>⭐ 10 pedidos = conquista!'
  ) + `
    <div style="font-size:4em; text-align:center; margin: 10px 0;" id="rest-customer">🧑</div>
    <div id="rest-order" style="font-family:Black Han Sans; color:#0047a0; text-align:center; min-height:35px; font-size: 1.1em;"></div>
    <div id="rest-options" style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:15px 0;"></div>
    <div id="rest-score" style="font-family:Black Han Sans; color:#d4af37; text-align:center; font-size: 1em;">Pedidos: 0/10</div>
  `);

  function newOrder() {
    currentOrder = pick(dishes);
    const cust = $('rest-customer');
    if (cust) cust.textContent = pick(['🧑', '👩', '👨', '🧓', '👧', '👦']);
    const order = $('rest-order');
    if (order) order.innerHTML = `"Quero <strong>${currentOrder.name}</strong> ${currentOrder.emoji}!"`;
    const opts = $('rest-options');
    if (!opts) return;
    opts.innerHTML = '';
    const shuffled = shuffle(dishes).slice(0, 4);
    if (!shuffled.find(d => d.name === currentOrder.name)) shuffled[0] = currentOrder;
    shuffled.forEach(d => {
      const b = document.createElement('button');
      b.className = 'btn-secondary';
      b.style.padding = '14px';
      b.style.fontSize = '0.95em';
      b.innerHTML = `${d.emoji} ${d.name}`;
      b.onclick = () => {
        if (d.name === currentOrder.name) {
          ordersServed++;
          const sc = $('rest-score');
          if (sc) sc.textContent = `Pedidos: ${ordersServed}/10`;
          GameState.coins += 3;
          addXP(3);
          saveGame();
          updateHUD();
          playCorrect();
          burstConfetti(15);
          if (ordersServed >= 10) checkAchievement('chef-master');
          setTimeout(newOrder, 500);
        } else {
          playWrong();
          b.style.background = '#cd2e3a';
          b.style.color = 'white';
        }
      };
      opts.appendChild(b);
    });
  }
  newOrder();
}

/* ==================== CONSTELAÇÕES ==================== */
function showConstellations() {
  const stars = [
    { x: '20%', y: '30%', name: 'Jiknyeo', meaning: 'A Tecelã' },
    { x: '80%', y: '25%', name: 'Gyeonu', meaning: 'O Pastor' },
    { x: '50%', y: '60%', name: 'Bukgeukseong', meaning: 'Estrela Polar' },
    { x: '30%', y: '70%', name: 'Samtaeseong', meaning: 'As Três Estrelas' },
    { x: '70%', y: '75%', name: 'Chilseong', meaning: 'As Sete Estrelas' }
  ];

  openModal(miniGameHeader('✨', 'Constelações Coreanas', 'Explore o céu noturno!', 
    '✨ Clique nas estrelas para descobrir seus nomes.<br>🌟 Cada estrela tem significado especial.<br>💰 <strong>+3 moedas</strong> por estrela.'
  ) + `
    <div id="const-canvas" style="position:relative; width:100%; height:300px; background:radial-gradient(circle, #1a1a3a 0%, #000 100%); border-radius:15px; border:2px solid #d4af37; overflow:hidden; box-shadow: inset 0 0 50px rgba(212,175,55,0.2);"></div>
    <div id="const-info" style="font-family:Black Han Sans; color:#0047a0; margin-top:15px; font-size:1em; min-height:30px;">✨ Clique nas estrelas!</div>
  `);

  const canvas = $('const-canvas');
  if (!canvas) return;
  stars.forEach((s, i) => {
    const star = document.createElement('div');
    star.style.cssText = `position:absolute; left:${s.x}; top:${s.y}; width:10px; height:10px; background:white; border-radius:50%; box-shadow:0 0 15px white, 0 0 30px rgba(255,255,255,0.5); cursor:pointer; animation:twinkle 2s infinite; animation-delay:${i * 0.3}s; transition: all 0.3s;`;
    star.onmouseenter = () => star.style.transform = 'scale(1.5)';
    star.onmouseleave = () => star.style.transform = '';
    star.onclick = () => {
      const info = $('const-info');
      if (info) info.innerHTML = `⭐ <strong>${s.name}</strong> — ${s.meaning}`;
      playTone(800, 0.3);
      GameState.coins += 3;
      addXP(3);
      saveGame();
      updateHUD();
      burstConfetti(10);
    };
    canvas.appendChild(star);
  });
}

/* ==================== SPA ==================== */
function showSpa() {
  const texts = ['Respire fundo...', 'Solte a tensão...', 'Sinta o calor...', 'Paz interior...', 'Mente vazia...', 'Coração tranquilo...'];
  let idx = 0;

  openModal(miniGameHeader('💆', 'Spa Coreano Virtual', 'Relaxe em um jjimjilbang!', 
    '💆 Aprecie as mensagens de relaxamento.<br>🧘 Medite por alguns segundos.<br>💰 Clique em Relaxar para ganhar <strong>+15 moedas</strong>.<br>⭐ Jjimjilbang é um spa coreano tradicional.'
  ) + `
    <div style="text-align:center; padding:30px;">
      <div style="font-size:6em; animation: float 4s infinite;">🧖</div>
      <div style="font-family:Black Han Sans; color:#0047a0; margin:15px 0; font-size: 1.1em; min-height: 30px;" id="spa-text">Respire fundo...</div>
      <div style="font-size:0.85em; color:#666;">Sauna • Banho quente • Descanso</div>
    </div>
    <button class="primary-btn" id="spa-relax" style="padding:12px 30px; font-size:0.95em;">🧘 Relaxar (+15🪙)</button>
  `);

  const interval = setInterval(() => {
    idx = (idx + 1) % texts.length;
    const t = $('spa-text');
    if (t) t.textContent = texts[idx];
    playTone(300 + idx * 50, 0.6, 'sine', 0.04);
  }, 2000);

  const btn = $('spa-relax');
  if (btn) btn.onclick = () => {
    GameState.coins += 15;
    addXP(12);
    saveGame();
    updateHUD();
    checkAchievement('meditator');
    burstConfetti(40);
    playUnlock();
    const t = $('spa-text');
    if (t) t.textContent = '✨ Renovado! +15 moedas';
  };

  const observer = new MutationObserver(() => {
    if (!document.body.contains($('spa-text'))) { clearInterval(interval); observer.disconnect(); }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

/* ==================== SUDOKU ==================== */
function showSudoku() {
  const solution = [[1,2,3,4],[3,4,1,2],[2,1,4,3],[4,3,2,1]];
  const puzzle = solution.map(row => row.map(v => Math.random() > 0.5 ? v : 0));

  openModal(miniGameHeader('🔢', 'Sudoku Coreano 4x4', 'Desafio de lógica!', 
    '🔢 Cada linha, coluna e bloco 2x2 deve ter os números <strong>1-4</strong>.<br>🖱️ Clique nas células vazias para preencher (1 → 2 → 3 → 4 → 1).<br>💰 Vitória vale <strong>+35 moedas</strong>!'
  ) + `
    <div id="sudoku-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:5px; max-width:260px; margin:15px auto; background:#000; padding:8px; border-radius:10px;"></div>
    <div id="sudoku-feedback" style="min-height:30px; font-family:Black Han Sans; color:#0047a0; margin-top:12px;"></div>
    <button class="btn-secondary" id="sudoku-check" style="margin-top:10px;">✅ Verificar</button>
  `);

  const grid = $('sudoku-grid');
  if (!grid) return;
  puzzle.forEach((row, r) => {
    row.forEach((val, c) => {
      const cell = document.createElement('div');
      cell.style.cssText = `aspect-ratio:1; background:${val ? 'linear-gradient(135deg,#0047a0,#6a1b9a)' : 'linear-gradient(135deg,#fff,#fdf6e3)'}; color:${val ? 'white' : '#0047a0'}; border-radius:8px; display:flex; align-items:center; justify-content:center; font-family:Black Han Sans; font-size:1.5em; cursor:pointer; transition: all 0.3s; border: 2px solid #d4af37;`;
      cell.textContent = val || '';
      if (!val) {
        cell.onclick = () => {
          const current = parseInt(cell.textContent) || 0;
          const next = current >= 4 ? 1 : current + 1;
          cell.textContent = next;
          cell.style.transform = 'scale(1.1)';
          setTimeout(() => cell.style.transform = '', 200);
          playClick();
        };
      }
      grid.appendChild(cell);
    });
  });
  const btn = $('sudoku-check');
  if (btn) btn.onclick = () => {
    const cells = grid.querySelectorAll('div');
    let correct = true;
    cells.forEach((cell, i) => {
      const r = Math.floor(i / 4), c = i % 4;
      if (parseInt(cell.textContent) !== solution[r][c]) correct = false;
    });
    const fb = $('sudoku-feedback');
    if (correct) {
      if (fb) fb.innerHTML = '🎉 <span style="color:#4caf50; font-size: 1.1em;">Correto! Parabéns!</span>';
      GameState.coins += 35;
      addXP(30);
      saveGame();
      updateHUD();
      burstConfetti(60);
      playVictory();
      checkAchievement('puzzle');
    } else {
      if (fb) fb.innerHTML = '❌ <span style="color:#cd2e3a">Alguns erros! Tente novamente.</span>';
      playWrong();
    }
  };
}

/* ==================== LABIRINTO ==================== */
function showMaze() {
  const SIZE = 7;
  let obstacles = [];
  for (let i = 0; i < 6; i++) {
    let r, c;
    do {
      r = rand(0, SIZE-1);
      c = rand(0, SIZE-1);
    } while ((r === 0 && c === 0) || (r === SIZE-1 && c === SIZE-1) || obstacles.some(o => o.r === r && o.c === c));
    obstacles.push({ r, c });
  }
  let pos = { r: 0, c: 0 };
  let moves = 0;

  openModal(miniGameHeader('🌀', 'Labirinto Coreano', 'Chegue ao destino!', 
    '🌀 Use as teclas <strong>W A S D</strong> ou <strong>setas</strong> para mover 🐯.<br>🚧 Evite as paredes (🪨)!<br>🎯 Chegue até 🏁 para vencer!<br>💰 <strong>+25 moedas</strong> ao escapar.'
  ) + `
    <div id="maze-grid" style="display:grid; grid-template-columns:repeat(${SIZE},1fr); gap:4px; max-width:300px; margin:15px auto; background:#000; padding:8px; border-radius:12px;"></div>
    <div id="maze-info" style="font-family:Black Han Sans; color:#0047a0; margin-top:12px; font-size: 1em;">🎯 Chegue até 🏁! Movimentos: 0</div>
  `);

  function render() {
    const grid = $('maze-grid');
    if (!grid) return;
    grid.innerHTML = '';
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const cell = document.createElement('div');
        const isObstacle = obstacles.some(o => o.r === r && o.c === c);
        const isEnd = r === SIZE-1 && c === SIZE-1;
        let bg = 'linear-gradient(135deg,#fdf6e3,#fff)';
        if (isEnd) bg = 'linear-gradient(135deg,#4caf50,#2e7d32)';
        else if (isObstacle) bg = 'linear-gradient(135deg,#333,#111)';
        cell.style.cssText = `aspect-ratio:1; background:${bg}; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:1.3em;`;
        if (r === pos.r && c === pos.c) cell.textContent = '🐯';
        else if (isEnd) cell.textContent = '🏁';
        else if (isObstacle) cell.textContent = '🪨';
        grid.appendChild(cell);
      }
    }
    const info = $('maze-info');
    if (info) info.textContent = `🎯 Movimentos: ${moves} | Chegue até 🏁`;
  }

  function move(dr, dc) {
    const nr = pos.r + dr, nc = pos.c + dc;
    if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
      if (obstacles.some(o => o.r === nr && o.c === nc)) { playWrong(); return; }
      pos.r = nr;
      pos.c = nc;
      moves++;
      render();
      if (pos.r === SIZE-1 && pos.c === SIZE-1) {
        const info = $('maze-info');
        if (info) info.innerHTML = `🎉 <span style="color:#4caf50;">Escapou em ${moves} movimentos!</span>`;
        GameState.coins += 25;
        addXP(20);
        saveGame();
        updateHUD();
        burstConfetti(60);
        playVictory();
      }
    }
  }

  function handler(e) {
    if (!document.body.contains($('maze-grid'))) {
      document.removeEventListener('keydown', handler);
      return;
    }
    if (e.key === 'w' || e.key === 'ArrowUp') move(-1, 0);
    else if (e.key === 's' || e.key === 'ArrowDown') move(1, 0);
    else if (e.key === 'a' || e.key === 'ArrowLeft') move(0, -1);
    else if (e.key === 'd' || e.key === 'ArrowRight') move(0, 1);
  }
  document.addEventListener('keydown', handler);
  render();
}

/* ==================== REFLEXO ==================== */
function showReaction() {
  openModal(miniGameHeader('⚡', 'Teste de Reflexo', 'Velocidade é tudo!', 
    '⚡ Espere a caixa ficar VERDE.<br>🎯 Clique o mais rápido possível!<br>⏱️ Tempo < 300ms = 🏆 Incrível!<br>💰 Quanto mais rápido, mais moedas!'
  ) + `
    <div id="reaction-area" style="width:100%; height:220px; background:#cd2e3a; border-radius:15px; display:flex; align-items:center; justify-content:center; color:white; font-family:Black Han Sans; font-size:1.4em; cursor:pointer; margin:15px 0; transition: all 0.3s; box-shadow: 0 10px 30px rgba(205,46,58,0.4);">
      ⏳ Espere ficar verde...
    </div>
    <div id="reaction-result" style="min-height:50px; font-family:Black Han Sans; color:#0047a0; font-size:1.1em;"></div>
  `);

  const area = $('reaction-area');
  if (!area) return;
  let ready = false;
  let startTime = 0;
  const delay = rand(2500, 6000);
  setTimeout(() => {
    if (!area) return;
    area.style.background = 'linear-gradient(135deg, #4caf50, #2e7d32)';
    area.textContent = '🎯 CLIQUE!';
    area.style.boxShadow = '0 10px 40px rgba(76,175,80,0.6)';
    ready = true;
    startTime = Date.now();
  }, delay);
  area.onclick = () => {
    if (!ready) {
      area.textContent = '❌ Muito cedo! Tente novamente';
      area.style.background = '#666';
      playWrong();
      return;
    }
    const rt = Date.now() - startTime;
    const r = $('reaction-result');
    if (r) r.innerHTML = `⏱️ Tempo: <strong style="font-size: 1.3em;">${rt}ms</strong><br>${rt < 250 ? '🏆 INCRÍVEL! +25🪙' : rt < 400 ? '⚡ Muito bom! +15🪙' : rt < 600 ? '👍 Bom! +10🪙' : '🐢 +5🪙'}`;
    area.style.background = 'linear-gradient(135deg, #ffb74d, #ff9800)';
    area.textContent = `${rt}ms`;
    const reward = rt < 250 ? 25 : rt < 400 ? 15 : rt < 600 ? 10 : 5;
    GameState.coins += reward;
    addXP(15);
    saveGame();
    updateHUD();
    burstConfetti(40);
    playVictory();
    checkAchievement('fast');
  };
}

/* ==================== MANDALA ==================== */
function showMandala() {
  openModal(miniGameHeader('🌺', 'Mandala Coreana', 'Arte circular simétrica!', 
    '🌺 Clique e arraste para criar padrões simétricos.<br>🎨 Desenha em 8 direções ao mesmo tempo!<br>💾 Salve sua mandala como imagem!<br>💰 Ganhe <strong>+15 moedas</strong> por criar.'
  ) + `
    <canvas class="paint-canvas" id="mandala-canvas" width="400" height="400"></canvas>
    <div class="palette" id="mandala-palette" style="margin-top: 15px;"></div>
    <div class="btn-row" style="margin-top: 10px;">
      <button class="btn-secondary" id="mandala-clear">🗑️ Limpar</button>
      <button class="btn-secondary" id="mandala-save">💾 Salvar</button>
    </div>
  `);

  const canvas = $('mandala-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fdf6e3';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const cx = canvas.width / 2, cy = canvas.height / 2;
  let currentColor = '#cd2e3a';
  const colors = ['#cd2e3a', '#0047a0', '#d4af37', '#00a86b', '#6a1b9a', '#ff6b35', '#ffb7c5', '#000000'];

  const palette = $('mandala-palette');
  if (palette) {
    colors.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'color-swatch' + (c === currentColor ? ' active' : '');
      sw.style.background = c;
      sw.onclick = () => {
        document.querySelectorAll('#mandala-palette .color-swatch').forEach(x => x.classList.remove('active'));
        sw.classList.add('active');
        currentColor = c;
      };
      palette.appendChild(sw);
    });
  }

  let drawing = false;
  canvas.addEventListener('pointerdown', e => { drawing = true; draw(e); });
  canvas.addEventListener('pointermove', e => { if (drawing) draw(e); });
  canvas.addEventListener('pointerup', () => {
    if (drawing) {
      drawing = false;
      if (!showMandala.rewarded) {
        showMandala.rewarded = true;
        checkAchievement('mandala-maker');
        GameState.coins += 15;
        addXP(12);
        saveGame();
        updateHUD();
        burstConfetti(30);
      }
    }
  });

  function draw(e) {
    const r = canvas.getBoundingClientRect();
    const cx2 = e.touches ? e.touches[0].clientX : e.clientX;
    const cy2 = e.touches ? e.touches[0].clientY : e.clientY;
    const x = cx2 - r.left;
    const y = cy2 - r.top;
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);
    ctx.fillStyle = currentColor;
    for (let i = 0; i < 8; i++) {
      const a = angle + (Math.PI / 4) * i;
      const px = cx + Math.cos(a) * dist;
      const py = cy + Math.sin(a) * dist;
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const cb = $('mandala-clear');
  if (cb) cb.onclick = () => { ctx.fillStyle = '#fdf6e3'; ctx.fillRect(0, 0, canvas.width, canvas.height); };
  const sb = $('mandala-save');
  if (sb) sb.onclick = () => {
    const link = document.createElement('a');
    link.download = 'mandala-ariza.png';
    link.href = canvas.toDataURL();
    link.click();
    burstConfetti(40);
  };
}

/* ==================== PIXEL ART ==================== */
function showPixelArt() {
  const SIZE = 16;
  openModal(miniGameHeader('🖼️', 'Pixel Art Coreano', 'Crie arte em pixels!', 
    '🖼️ Clique nas células para colorir.<br>🎨 Escolha uma cor na paleta.<br>💾 Salve sua obra!<br>💰 <strong>+20 moedas</strong> por criar.'
  ) + `
    <div id="pixel-grid" style="display:grid; grid-template-columns:repeat(${SIZE},1fr); gap:1px; max-width:420px; margin:15px auto; background:#ccc; padding:4px; border-radius:8px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);"></div>
    <div class="palette" id="pixel-palette" style="margin-top: 15px;"></div>
    <div class="btn-row" style="margin-top: 10px;">
      <button class="btn-secondary" id="pixel-clear">🗑️ Limpar</button>
      <button class="btn-secondary" id="pixel-save">💾 Salvar</button>
    </div>
  `);

  let currentColor = '#cd2e3a';
  const colors = ['#cd2e3a', '#0047a0', '#d4af37', '#00a86b', '#6a1b9a', '#ff6b35', '#ffb7c5', '#000000', '#ffffff'];
  const palette = $('pixel-palette');
  if (palette) {
    colors.forEach(c => {
      const sw = document.createElement('div');
      sw.className = 'color-swatch' + (c === currentColor ? ' active' : '');
      sw.style.background = c;
      sw.onclick = () => {
        document.querySelectorAll('#pixel-palette .color-swatch').forEach(x => x.classList.remove('active'));
        sw.classList.add('active');
        currentColor = c;
      };
      palette.appendChild(sw);
    });
  }
  const grid = $('pixel-grid');
  if (!grid) return;
  for (let i = 0; i < SIZE * SIZE; i++) {
    const cell = document.createElement('div');
    cell.style.cssText = 'aspect-ratio:1; background:white; cursor:pointer; transition: transform 0.1s;';
    cell.onclick = () => {
      cell.style.background = currentColor;
      cell.style.transform = 'scale(1.2)';
      setTimeout(() => cell.style.transform = '', 150);
    };
    grid.appendChild(cell);
  }
  const cb = $('pixel-clear');
  if (cb) cb.onclick = () => { grid.querySelectorAll('div').forEach(c => c.style.background = 'white'); };
  const sb = $('pixel-save');
  if (sb) sb.onclick = () => {
    GameState.coins += 20;
    addXP(15);
    saveGame();
    updateHUD();
    checkAchievement('pixel-artist');
    burstConfetti(40);
  };
}

/* ==================== TAMBOR ==================== */
function showDrum() {
  const drums = [
    { emoji: '🥁', name: 'Buk', freq: 200, color: '#cd2e3a' },
    { emoji: '🪘', name: 'Janggu', freq: 300, color: '#0047a0' },
    { emoji: '🔔', name: 'Kkwaenggwari', freq: 800, color: '#d4af37' },
    { emoji: '🎺', name: 'Nabal', freq: 500, color: '#00a86b' }
  ];
  let sequence = [];
  let playerInput = [];
  let round = 0;
  let score = 0;

  openModal(miniGameHeader('🥁', 'Tambor Coreano', 'Repita a sequência de sons!', 
    '🥁 Observe a sequência de sons e luzes.<br>🎯 Repita clicando nos tambores na mesma ordem.<br>🎵 Similar ao "Simon Says"!<br>💰 Cada round completo vale +4 moedas.'
  ) + `
    <div id="drum-sequence" style="min-height:50px; text-align:center; font-size:1.8em; margin:15px 0; font-family: Black Han Sans; color: #d4af37;"></div>
    <div id="drum-display" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin:15px 0;">
      ${drums.map((d, i) => `
        <div data-drum="${i}" style="padding:25px 10px; background:linear-gradient(135deg,#fff,#fdf6e3); border:3px solid #d4af37; border-radius:15px; cursor:pointer; text-align:center; transition:all 0.2s; box-shadow: 0 6px 15px rgba(0,0,0,0.1);">
          <div style="font-size:2.2em;">${d.emoji}</div>
          <div style="font-family:Black Han Sans; font-size:0.75em; color:#0047a0; margin-top:5px;">${d.name}</div>
        </div>
      `).join('')}
    </div>
    <div id="drum-feedback" style="min-height:30px; font-family:Black Han Sans; color:#0047a0; font-size: 1em;"></div>
    <button class="btn-secondary" id="drum-start" style="margin-top:12px;">▶️ Começar</button>
  `);

  function playSequence() {
    playerInput = [];
    const fb = $('drum-feedback');
    if (fb) fb.textContent = '👀 Observe a sequência...';
    sequence.forEach((d, i) => {
      setTimeout(() => {
        const btn = document.querySelector(`[data-drum="${d}"]`);
        if (btn) {
          const orig = btn.style.background;
          btn.style.background = `linear-gradient(135deg, ${drums[d].color}, ${drums[d].color}dd)`;
          btn.style.transform = 'scale(1.15)';
          playTone(drums[d].freq, 0.4);
          setTimeout(() => {
            btn.style.background = orig;
            btn.style.transform = '';
          }, 400);
        }
      }, i * 700);
    });
    setTimeout(() => {
      const fb = $('drum-feedback');
      if (fb) fb.textContent = '🎯 Sua vez! Repita a sequência!';
    }, sequence.length * 700 + 500);
  }

  const sb = $('drum-start');
  if (sb) sb.onclick = () => { round = 0; score = 0; sequence = []; nextRound(); playClick(); };

  function nextRound() {
    round++;
    sequence.push(rand(0, 3));
    const seq = $('drum-sequence');
    if (seq) seq.textContent = `🎵 Round ${round}`;
    setTimeout(playSequence, 600);
  }

  document.querySelectorAll('[data-drum]').forEach(btn => {
    btn.onclick = () => {
      const d = parseInt(btn.dataset.drum);
      playTone(drums[d].freq, 0.3);
      btn.style.transform = 'scale(0.9)';
      setTimeout(() => btn.style.transform = '', 150);
      playerInput.push(d);
      if (playerInput.length === sequence.length) {
        const correct = playerInput.every((v, i) => v === sequence[i]);
        if (correct) {
          score++;
          const fb = $('drum-feedback');
          if (fb) fb.innerHTML = `✅ Round ${round} correto!`;
          GameState.coins += 4;
          addXP(5);
          saveGame();
          updateHUD();
          burstConfetti(20);
          if (round >= 5) {
            const fb2 = $('drum-feedback');
            if (fb2) fb2.innerHTML = `🎉 ${score}/5 rounds! Você é um mestre do Samulnori!`;
            GameState.coins += 25;
            addXP(25);
            saveGame();
            updateHUD();
            burstConfetti(80);
            playVictory();
            checkAchievement('drummer');
            return;
          }
          setTimeout(nextRound, 1500);
        } else {
          const fb = $('drum-feedback');
          if (fb) fb.innerHTML = '❌ Errou! Recomeçando...';
          playWrong();
          setTimeout(() => { round = 0; score = 0; sequence = []; nextRound(); }, 1500);
        }
      }
    };
  });
}

/* ==================== RASPADINHA ==================== */
function showScratch() {
  let scratched = false;
  openModal(miniGameHeader('🎰', 'Raspadinha Coreana', 'Raspe para revelar!', 
    '🎰 Clique na área cinza para raspar.<br>🎁 Um prêmio aleatório será revelado!<br>💰 Pode ganhar de 0 a 80 moedas!<br>🍀 Tente a sorte!'
  ) + `
    <div id="scratch-area" style="width:280px; height:180px; background:linear-gradient(135deg,#999,#666); border-radius:20px; margin:20px auto; display:flex; align-items:center; justify-content:center; color:white; font-family:Black Han Sans; font-size:1.4em; cursor:pointer; border:4px solid #d4af37; box-shadow: 0 15px 40px rgba(0,0,0,0.3); transition: all 0.5s;">
      🎁 RASPE AQUI 🎁
    </div>
    <div id="scratch-result" style="min-height:50px; font-family:Black Han Sans; color:#0047a0; font-size:1.2em; text-align: center;"></div>
  `);
  const area = $('scratch-area');
  if (!area) return;
  area.onclick = () => {
    if (scratched) return;
    scratched = true;
    const prizes = [
      { emoji: '💰', name: '+30 moedas', coins: 30 },
      { emoji: '💎', name: '+60 moedas', coins: 60 },
      { emoji: '🎊', name: '+15 moedas', coins: 15 },
      { emoji: '⭐', name: '+25 moedas', coins: 25 },
      { emoji: '😢', name: 'Nada...', coins: 0 },
      { emoji: '🍀', name: '+80 moedas!', coins: 80 }
    ];
    const p = pick(prizes);
    GameState.coins += p.coins;
    addXP(10);
    saveGame();
    updateHUD();
    area.style.background = p.coins > 0 ? 'linear-gradient(135deg,#4caf50,#2e7d32)' : 'linear-gradient(135deg,#666,#333)';
    area.textContent = p.emoji;
    const r = $('scratch-result');
    if (r) r.innerHTML = `${p.emoji} ${p.name}`;
    if (p.coins > 0) { playVictory(); burstConfetti(60); checkAchievement('scratch-win'); }
    else playWrong();
  };
}

/* ==================== SLOT ==================== */
function showSlot() {
  const symbols = ['🍒', '🔔', '💎', '⭐', '7️⃣', '🌸', '🍀'];
  openModal(miniGameHeader('🎰', 'Caça-Níquel Coreano', 'Gire e tente a sorte!', 
    '🎰 Custa <strong>10 moedas</strong> por rodada.<br>⭐ 3 símbolos iguais = JACKPOT de 200 moedas!<br>💰 2 símbolos iguais = +20 moedas.<br>🍀 Tente a sorte!'
  ) + `
    <div style="display:flex; justify-content:center; gap:15px; margin:25px 0;">
      <div class="slot-reel">❓</div>
      <div class="slot-reel">❓</div>
      <div class="slot-reel">❓</div>
    </div>
    <div id="slot-result" style="min-height:40px; font-family:Black Han Sans; color:#0047a0; font-size:1.1em; text-align: center;"></div>
    <button class="primary-btn" id="slot-spin" style="padding:14px 40px; font-size:1em; margin-top:15px;">🎰 Girar (10🪙)</button>
  `);
  const btn = $('slot-spin');
  if (btn) btn.onclick = () => {
    if (GameState.coins < 10) { playWrong(); alert('Moedas insuficientes!'); return; }
    GameState.coins -= 10;
    saveGame();
    updateHUD();
    const reels = document.querySelectorAll('.slot-reel');
    let spins = 0;
    const interval = setInterval(() => {
      reels.forEach(r => r.textContent = pick(symbols));
      playTone(500 + spins * 50, 0.05);
      spins++;
      if (spins > 15) {
        clearInterval(interval);
        const final = [pick(symbols), pick(symbols), pick(symbols)];
        reels.forEach((r, i) => r.textContent = final[i]);
        const isJackpot = final[0] === final[1] && final[1] === final[2];
        const isPair = final[0] === final[1] || final[1] === final[2] || final[0] === final[2];
        let reward = 0, msg = '';
        if (isJackpot) { reward = 200; msg = '🎉 JACKPOT! +200 moedas!'; burstFireworks(10); }
        else if (isPair) { reward = 20; msg = '⭐ Par! +20 moedas'; }
        else { msg = '😢 Tente novamente!'; }
        GameState.coins += reward;
        addXP(10);
        saveGame();
        updateHUD();
        const r = $('slot-result');
        if (r) r.innerHTML = msg;
        if (reward > 0) { playVictory(); burstConfetti(60); checkAchievement('gambler'); }
        else playWrong();
      }
    }, 100);
  };
}

/* ==================== TCG ==================== */
function showTCGBattle() {
  const owned = collectibleCards.filter(c => GameState.collectedCards.has(c.id));
  if (owned.length < 2) {
    openModal(miniGameHeader('🃏', 'Batalha TCG', 'Precisa de 2+ cartas!', 
      '🃏 Você precisa de pelo menos 2 cartas para batalhar.<br>🎴 Ganhe cartas nos quizzes e mini jogos!'
    ));
    return;
  }
  const myCard = pick(owned);
  const enemyCard = pick(collectibleCards.filter(c => c.id !== myCard.id));
  const myPower = myCard.atk + myCard.def + rand(1, 10);
  const enemyPower = enemyCard.atk + enemyCard.def + rand(1, 10);
  const won = myPower > enemyPower;
  openModal(miniGameHeader('🃏', 'Batalha TCG', 'Duelo de cartas!', 
    '🃏 Sua melhor carta vs carta inimiga.<br>⚔️ Poder = Ataque + Defesa + Sorte.<br>🏆 Quem tiver mais poder vence!<br>💰 Vitória vale +25 moedas.'
  ) + `
    <div class="battle-field">
      <div>
        <div class="tcg-card ${myCard.rarity.toLowerCase()}" style="width:120px; margin:0 auto;">
          <div class="tcg-emoji">${myCard.emoji}</div>
          <div class="tcg-name">${myCard.name}</div>
          <div class="tcg-stats"><span>⚔️${myCard.atk}</span><span>🛡️${myCard.def}</span></div>
        </div>
      </div>
      <div class="battle-vs">VS</div>
      <div>
        <div class="tcg-card ${enemyCard.rarity.toLowerCase()}" style="width:120px; margin:0 auto;">
          <div class="tcg-emoji">${enemyCard.emoji}</div>
          <div class="tcg-name">${enemyCard.name}</div>
          <div class="tcg-stats"><span>⚔️${enemyCard.atk}</span><span>🛡️${enemyCard.def}</span></div>
        </div>
      </div>
    </div>
    <div style="font-family:Black Han Sans; color:#0047a0; font-size:1.1em; margin:15px 0;">
      ⚔️ Seu poder: <strong>${myPower}</strong> | Inimigo: <strong>${enemyPower}</strong>
    </div>
    <div style="font-family:Black Han Sans; color:${won ? '#4caf50' : '#cd2e3a'}; font-size:1.3em; margin-top: 15px;">
      ${won ? '🎉 VOCÊ VENCEU!' : '😢 Você perdeu!'}
    </div>
  `);
  if (won) {
    GameState.coins += 25;
    addXP(20);
    saveGame();
    updateHUD();
    burstConfetti(80);
    burstFireworks(5);
    playVictory();
    checkAchievement('tcg-master');
  } else playWrong();
}

/* ==================== PET BATTLE ==================== */
function showPetBattle() {
  if (!GameState.selectedPet) { showPetSelect(); return; }
  const pet = petsData.find(p => p.id === GameState.selectedPet);
  const enemies = ['🐺', '🐻', '🦁', '🐊', '🦅'];
  const enemyEmoji = pick(enemies);
  let myHP = 100, enemyHP = 100, defending = false;
  const logs = [];

  openModal(miniGameHeader('⚔️', 'Batalha de Pets', `${pet.name} vs Inimigo!`, 
    '⚔️ Seu pet luta contra um inimigo.<br>👊 Atacar: dano médio<br>🛡️ Defender: reduz dano recebido<br>✨ Especial: dano grande (custa energia)<br>💰 Vitória vale +25 moedas.'
  ) + `
    <div class="battle-field">
      <div class="battle-fighter">
        <div class="battle-fighter-avatar">${pet.emoji}</div>
        <div class="battle-fighter-name">${pet.name}</div>
        <div class="battle-hp"><div class="battle-hp-fill" id="my-pet-hp" style="width:100%"></div></div>
      </div>
      <div class="battle-vs">VS</div>
      <div class="battle-fighter">
        <div class="battle-fighter-avatar">${enemyEmoji}</div>
        <div class="battle-fighter-name">Inimigo</div>
        <div class="battle-hp"><div class="battle-hp-fill" id="enemy-pet-hp" style="width:100%; background:linear-gradient(90deg,#cd2e3a,#8b1a24)"></div></div>
      </div>
    </div>
    <div id="pet-battle-log" style="min-height:70px; padding:12px; background:rgba(212,175,55,0.1); border-radius:12px; font-size:0.9em; text-align:left; margin:10px 0;"></div>
    <div class="btn-row">
      <button class="btn-secondary" id="pet-attack">⚔️ Atacar</button>
      <button class="btn-secondary" id="pet-defend">🛡️ Defender</button>
      <button class="btn-secondary" id="pet-special">✨ Especial</button>
    </div>
  `);
  const log = msg => { logs.push(msg); const el = $('pet-battle-log'); if (el) el.innerHTML = logs.slice(-5).join('<br>'); };
  const updateHP = () => {
    const mh = $('my-pet-hp'), eh = $('enemy-pet-hp');
    if (mh) mh.style.width = myHP + '%';
    if (eh) eh.style.width = enemyHP + '%';
  };
  const enemyTurn = () => {
    if (enemyHP <= 0 || myHP <= 0) return;
    setTimeout(() => {
      const dmg = defending ? rand(3, 8) : rand(8, 18);
      myHP = Math.max(0, myHP - dmg);
      log(`💥 Inimigo causou ${dmg}!`);
      updateHP();
      defending = false;
      if (myHP <= 0) { log('❌ Você perdeu!'); playWrong(); }
    }, 500);
  };
  const ab = $('pet-attack');
  if (ab) ab.onclick = () => {
    if (enemyHP <= 0 || myHP <= 0) return;
    const dmg = rand(10, 25) + GameState.petLevel * 2;
    enemyHP = Math.max(0, enemyHP - dmg);
    log(`⚔️ ${pet.name} causou ${dmg}!`);
    updateHP();
    playTone(600, 0.2);
    if (enemyHP <= 0) {
      log('🎉 Você venceu!');
      playVictory();
      burstConfetti(80);
      GameState.coins += 25;
      addXP(20);
      saveGame();
      updateHUD();
      checkAchievement('pet-owner');
      return;
    }
    enemyTurn();
  };
  const db = $('pet-defend');
  if (db) db.onclick = () => {
    if (enemyHP <= 0 || myHP <= 0) return;
    defending = true;
    log('🛡️ Defendendo...');
    enemyTurn();
  };
  const spb = $('pet-special');
  if (spb) spb.onclick = () => {
    if (enemyHP <= 0 || myHP <= 0) return;
    if (GameState.petEnergy < 20) { log('⚡ Sem energia!'); playWrong(); return; }
    GameState.petEnergy -= 20;
    const dmg = rand(20, 40) + GameState.petLevel * 3;
    enemyHP = Math.max(0, enemyHP - dmg);
    log(`✨ ESPECIAL! ${dmg} de dano!`);
    updateHP();
    playTone(900, 0.4);
    saveGame();
    if (enemyHP <= 0) {
      log('🎉 Você venceu!');
      playVictory();
      burstConfetti(100);
      GameState.coins += 40;
      addXP(30);
      saveGame();
      updateHUD();
      return;
    }
    enemyTurn();
  };
}

/* ==================== MAPA ==================== */
function showKoreaMap() {
  const cities = [
    { name: 'Seul', x: '35%', y: '25%', info: '🏛️ Capital — 10 milhões de habitantes' },
    { name: 'Busan', x: '65%', y: '80%', info: '⚓ Segunda maior, porto importante' },
    { name: 'Incheon', x: '25%', y: '28%', info: '✈️ Aeroporto internacional' },
    { name: 'Daegu', x: '55%', y: '60%', info: '🍎 Cidade das maçãs' },
    { name: 'Jeju', x: '40%', y: '95%', info: '🏝️ Ilha vulcânica paradisíaca' },
    { name: 'Gyeongju', x: '70%', y: '55%', info: '🏯 Antiga capital do reino Silla' }
  ];

  openModal(miniGameHeader('🗺️', 'Mapa da Coreia', 'Explore as cidades!', 
    '🗺️ Clique em cada cidade para descobrir informações.<br>🏙️ Conheça as principais cidades da Coreia!<br>💰 <strong>+4 moedas</strong> por cidade visitada.'
  ) + `
    <div id="korea-map" style="width:100%; height:420px; background:linear-gradient(135deg,#87ceeb 0%, #b0e0e6 50%, #87ceeb 100%); border-radius:15px; position:relative; overflow:hidden; border:3px solid #d4af37; box-shadow: 0 15px 40px rgba(0,0,0,0.2);">
      ${cities.map(c => `<div style="position:absolute; left:${c.x}; top:${c.y}; padding:10px 14px; background:linear-gradient(135deg, rgba(205,46,58,0.95), rgba(139,26,36,0.95)); color:white; border-radius:25px; font-family:Black Han Sans; font-size:0.8em; cursor:pointer; border:2px solid #d4af37; transition:all 0.3s; box-shadow: 0 5px 15px rgba(0,0,0,0.3);" data-city="${c.name}" data-info="${c.info}" onmouseover="this.style.transform='scale(1.15)'; this.style.zIndex='10';" onmouseout="this.style.transform=''; this.style.zIndex='';">
        📍 ${c.name}
      </div>`).join('')}
    </div>
    <div id="map-info" style="min-height:60px; font-family:Black Han Sans; color:#0047a0; margin-top:15px; font-size:0.95em; padding: 12px; background: rgba(212,175,55,0.1); border-radius: 12px;">👆 Clique em uma cidade!</div>
  `);
  document.querySelectorAll('[data-city]').forEach(city => {
    city.onclick = () => {
      const info = $('map-info');
      if (info) info.innerHTML = `<strong>${city.dataset.city}</strong><br><small style="color:#666">${city.dataset.info}</small>`;
      GameState.coins += 4;
      addXP(4);
      saveGame();
      updateHUD();
      checkAchievement('map-explorer');
      burstConfetti(15);
    };
  });
}

/* ==================== TIMELINE ==================== */
function showTimeline() {
  const events = [
    { year: '2333 a.C.', text: 'Fundação de Gojoseon por Dangun' },
    { year: '57 a.C.', text: 'Início do período dos Três Reinos' },
    { year: '918 d.C.', text: 'Fundação da Dinastia Goryeo' },
    { year: '1392', text: 'Fundação da Dinastia Joseon' },
    { year: '1443', text: 'Rei Sejong cria o Hangul' },
    { year: '1592', text: 'Invasão japonesa — Yi Sun-sin defende' },
    { year: '1910', text: 'Início da ocupação japonesa' },
    { year: '1945', text: 'Libertação da Coreia' },
    { year: '1988', text: 'Olimpíadas de Seul' },
    { year: '2020', text: 'Filme Parasita ganha Oscar' }
  ];

  openModal(miniGameHeader('📅', 'Linha do Tempo Coreana', '5000 anos de história!', 
    '📅 Clique em cada evento para aprender mais.<br>🏛️ Da fundação até os dias modernos.<br>💰 <strong>+3 moedas</strong> por evento.'
  ) + `
    <div style="padding:20px 0; max-height: 500px; overflow-y: auto;">
      ${events.map((e, i) => `
        <div class="timeline-item" style="padding:15px 20px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; margin-bottom:12px; text-align:left; cursor:pointer; transition: all 0.3s;" onmouseover="this.style.transform='translateX(8px)'" onmouseout="this.style.transform=''">
          <div style="font-family:Black Han Sans; color:#cd2e3a; font-size:1.2em;">${e.year}</div>
          <div style="font-size:0.9em; color:#555; margin-top: 5px;">${e.text}</div>
        </div>
      `).join('')}
    </div>
  `);
  document.querySelectorAll('.timeline-item').forEach(el => {
    el.onclick = () => {
      burstConfetti(15);
      GameState.coins += 3;
      addXP(3);
      saveGame();
      updateHUD();
      checkAchievement('historian');
    };
  });
}

/* ==================== QUIZZES ==================== */
function showQuickQuiz() {
  const questions = [
    { q: 'Capital da Coreia do Sul?', a: ['Seul', 'Busan', 'Incheon'], c: 0 },
    { q: 'Prato nacional?', a: ['Sushi', 'Kimchi', 'Ramen'], c: 1 },
    { q: 'Alfabeto coreano?', a: ['Kanji', 'Hiragana', 'Hangul'], c: 2 },
    { q: 'Arte marcial?', a: ['Karate', 'Taekwondo', 'Judo'], c: 1 },
    { q: 'Ano novo coreano?', a: ['Seollal', 'Chuseok', 'Tet'], c: 0 },
    { q: 'Bebida coreana de arroz?', a: ['Sake', 'Soju', 'Vinho'], c: 1 },
    { q: 'Rei que criou o Hangul?', a: ['Sejong', 'Taejo', 'Jeongjo'], c: 0 }
  ];
  let idx = 0, score = 0;
  openModal(miniGameHeader('⚡', 'Quiz Rápido', '7 perguntas rápidas!', 
    '⚡ Responda as 7 perguntas.<br>🎯 Cada acerto vale +3 moedas.<br>⭐ Acertar tudo dá bônus extra!'
  ) + `<div id="quick-quiz-content"></div>`);
  function render() {
    const c = $('quick-quiz-content');
    if (!c) return;
    if (idx >= questions.length) {
      c.innerHTML = `
        <div style="font-size:4em; text-align:center;">🎉</div>
        <div style="font-family:Black Han Sans; color:#0047a0; text-align:center; margin-top:15px; font-size: 1.3em;">
          ${score}/${questions.length} acertos!
        </div>
      `;
      burstConfetti(80);
      playVictory();
      if (score === questions.length) {
        GameState.coins += 20;
        addXP(15);
      }
      saveGame();
      updateHUD();
      return;
    }
    const q = questions[idx];
    c.innerHTML = `
      <div style="font-family:Black Han Sans; color:#0047a0; margin-bottom:12px; font-size: 1.1em;">Pergunta ${idx + 1}/${questions.length}</div>
      <div style="font-size:1.15em; margin-bottom:20px; font-weight:700;">${q.q}</div>
      <div style="display:grid; gap:10px;">
        ${q.a.map((a, i) => `<button class="btn-secondary" style="padding:14px; font-size:1em;" data-q="${i}">${a}</button>`).join('')}
      </div>
    `;
    document.querySelectorAll('[data-q]').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.q);
        if (i === q.c) {
          score++;
          GameState.coins += 3;
          playCorrect();
          btn.style.background = 'linear-gradient(135deg,#4caf50,#2e7d32)';
          btn.style.color = 'white';
        } else {
          playWrong();
          btn.style.background = 'linear-gradient(135deg,#cd2e3a,#8b1a24)';
          btn.style.color = 'white';
        }
        saveGame();
        updateHUD();
        idx++;
        setTimeout(render, 800);
      };
    });
  }
  render();
}

function showFoodQuiz() {
  const foods = [
    { emoji: '🥬', name: 'Kimchi', desc: 'Repolho fermentado' },
    { emoji: '🍚', name: 'Bibimbap', desc: 'Arroz misturado' },
    { emoji: '🍢', name: 'Tteokbokki', desc: 'Bolinhos picantes' },
    { emoji: '🥩', name: 'Bulgogi', desc: 'Carne grelhada' },
    { emoji: '🥟', name: 'Mandu', desc: 'Dumplings' },
    { emoji: '🍜', name: 'Ramyun', desc: 'Macarrão' },
    { emoji: '🍲', name: 'Kimchi Jjigae', desc: 'Sopa de kimchi' },
    { emoji: '🍶', name: 'Soju', desc: 'Bebida de arroz' },
    { emoji: '🍡', name: 'Songpyeon', desc: 'Bolinho de arroz' }
  ];
  openModal(miniGameHeader('🍜', 'Comidas Coreanas', 'Conheça os pratos típicos!', 
    '🍜 Clique em cada prato para aprender.<br>🍚 Kimchi é o prato nacional!<br>💰 <strong>+3 moedas</strong> por prato.'
  ) + `
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin:15px 0;" id="food-quiz"></div>
    <div id="food-info" style="min-height:50px; font-family:Black Han Sans; color:#0047a0; text-align: center; font-size: 1em;"></div>
  `);
  const grid = $('food-quiz');
  if (!grid) return;
  foods.forEach(f => {
    const el = document.createElement('div');
    el.style.cssText = 'padding:18px 10px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; text-align:center; cursor:pointer; transition: all 0.3s;';
    el.innerHTML = `<div style="font-size:2.5em;">${f.emoji}</div><div style="font-family:Black Han Sans; font-size:0.85em; color:#0047a0; margin-top:5px;">${f.name}</div>`;
    el.onmouseenter = () => el.style.transform = 'scale(1.05)';
    el.onmouseleave = () => el.style.transform = '';
    el.onclick = () => {
      const info = $('food-info');
      if (info) info.innerHTML = `${f.emoji} <strong>${f.name}</strong><br><small>${f.desc}</small>`;
      GameState.coins += 3;
      addXP(3);
      saveGame();
      updateHUD();
      burstConfetti(15);
      playCorrect();
    };
    grid.appendChild(el);
  });
}

function showWordQuiz() {
  const questions = [
    { q: '안녕하세요 significa?', a: ['Olá', 'Tchau', 'Obrigado'], c: 0 },
    { q: '김치 é qual comida?', a: ['Sopa', 'Kimchi', 'Arroz'], c: 1 },
    { q: '사랑 significa?', a: ['Ódio', 'Amor', 'Medo'], c: 1 },
    { q: '한국 significa?', a: ['China', 'Japão', 'Coreia'], c: 2 },
    { q: '친구 significa?', a: ['Família', 'Inimigo', 'Amigo'], c: 2 },
    { q: '선생님 significa?', a: ['Aluno', 'Professor', 'Diretor'], c: 1 },
    { q: '아리자 significa?', a: ['Amor', 'Ariza', 'Amigo'], c: 1 }
  ];
  let idx = 0, score = 0;
  openModal(miniGameHeader('📝', 'Quiz de Palavras', 'Teste seu coreano!', 
    '📝 Traduza as palavras coreanas.<br>🎯 7 palavras para testar.<br>⭐ Acertar todas dá bônus!'
  ) + `<div id="wq-content"></div>`);
  function render() {
    const c = $('wq-content');
    if (!c) return;
    if (idx >= questions.length) {
      c.innerHTML = `
        <div style="font-size:4em; text-align:center;">🎉</div>
        <div style="font-family:Black Han Sans; color:#0047a0; text-align:center; margin-top:15px; font-size: 1.3em;">
          ${score}/${questions.length} acertos!
        </div>
      `;
      GameState.coins += 20;
      addXP(18);
      saveGame();
      updateHUD();
      burstConfetti(80);
      playVictory();
      return;
    }
    const q = questions[idx];
    c.innerHTML = `
      <div style="font-family:Black Han Sans; color:#0047a0; margin-bottom:12px; font-size: 1.1em;">Palavra ${idx + 1}/${questions.length}</div>
      <div style="font-family:'Nanum Myeongjo'; font-size:1.5em; margin-bottom:20px; color: #cd2e3a;">${q.q}</div>
      <div style="display:grid; gap:10px;">
        ${q.a.map((a, i) => `<button class="btn-secondary" style="padding:14px; font-size:1em;" data-ans="${i}">${a}</button>`).join('')}
      </div>
    `;
    document.querySelectorAll('[data-ans]').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.ans);
        if (i === q.c) {
          score++;
          playCorrect();
          btn.style.background = 'linear-gradient(135deg,#4caf50,#2e7d32)';
          btn.style.color = 'white';
        } else {
          playWrong();
          btn.style.background = 'linear-gradient(135deg,#cd2e3a,#8b1a24)';
          btn.style.color = 'white';
        }
        idx++;
        setTimeout(render, 800);
      };
    });
  }
  render();
}

/* ==================== CARTAS ==================== */
function showCards() {
  openModal(miniGameHeader('🃏', 'Coleção TCG', 'Suas cartas colecionáveis!', 
    '🃏 Colecione cartas de raridades: Comum, Raro, Épico e Lendário.<br>🎴 Ganhe cartas nos quizzes e mini jogos!<br>⭐ Tente colecionar todas!'
  ) + `
    <p style="color:#666; font-size:0.9em; margin-bottom:15px;">${GameState.collectedCards.size}/${collectibleCards.length} coletadas</p>
    <div class="cards-grid">
      ${collectibleCards.map(card => {
        const owned = GameState.collectedCards.has(card.id);
        return `
          <div class="tcg-card ${owned ? card.rarity.toLowerCase() : 'locked'}">
            <div class="tcg-emoji">${owned ? card.emoji : '❓'}</div>
            <div class="tcg-name">${owned ? card.name : '???'}</div>
            <div class="tcg-stats">${owned ? `<span>⚔️${card.atk}</span><span>🛡️${card.def}</span>` : ''}</div>
          </div>
        `;
      }).join('')}
    </div>
  `);
}

/* ==================== LOJA ==================== */
function showShop() {
  const items = [
    { id: 'theme-red', icon: '🔴', name: 'Tema Vermelho', price: 500 },
    { id: 'theme-blue', icon: '🔵', name: 'Tema Azul', price: 500 },
    { id: 'theme-gold', icon: '🟡', name: 'Tema Dourado', price: 1000 },
    { id: 'boost', icon: '⚡', name: 'Boost XP +80', price: 800 },
    { id: 'cardpack', icon: '🎴', name: 'Pacote 5 Cartas', price: 1200 },
    { id: 'petfood', icon: '🍖', name: 'Comida Pet x10', price: 200 }
  ];
  openModal(miniGameHeader('🛒', 'Loja Coreana', 'Preços altos, recompensas épicas!', 
    '🛒 Compre itens especiais para melhorar seu jogo!<br>💰 Preços entre 200 e 1200 moedas.<br>💡 Jogue muito para acumular!'
  ) + `
    <div style="font-family: Black Han Sans; font-size: 1.3em; color: #d4af37; margin-bottom: 15px;">🪙 ${GameState.coins}</div>
    <div class="shop-grid" id="shop-grid"></div>
  `);
  function renderShop() {
    const g = $('shop-grid');
    if (!g) return;
    g.innerHTML = '';
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'shop-item';
      el.innerHTML = `<span class="shop-icon">${item.icon}</span><div class="shop-name">${item.name}</div><div class="shop-price">🪙 ${item.price}</div>`;
      el.onclick = () => {
        if (GameState.coins < item.price) { playWrong(); alert(`Moedas insuficientes! Você tem ${GameState.coins}, precisa de ${item.price}.`); return; }
        GameState.coins -= item.price;
        if (item.id === 'theme-red') document.documentElement.style.setProperty('--vermelho', '#ff0000');
        else if (item.id === 'theme-blue') document.documentElement.style.setProperty('--azul', '#00bcd4');
        else if (item.id === 'theme-gold') document.documentElement.style.setProperty('--dourado', '#ffd700');
        else if (item.id === 'boost') addXP(80);
        else if (item.id === 'cardpack') {
          for (let i = 0; i < 5; i++) {
            const locked = collectibleCards.filter(c => !GameState.collectedCards.has(c.id));
            if (locked.length) {
              const c = pick(locked);
              GameState.collectedCards.add(c.id);
            }
          }
        }
        saveGame();
        updateHUD();
        playUnlock();
        burstConfetti(30);
        renderShop();
      };
      g.appendChild(el);
    });
  }
  renderShop();
}

/* ==================== STATS ==================== */
function showStats() {
  const scores = getScores();
  const totalScore = scores.reduce((a, b) => a + b.score, 0);
  const avgScore = scores.length ? Math.floor(totalScore / scores.length) : 0;
  openModal(miniGameHeader('📊', 'Estatísticas', 'Seu progresso completo!', 
    '📊 Veja suas estatísticas detalhadas.<br>🎮 Partidas, média e recorde.<br>💡 Acompanhe seu progresso!'
  ) + `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; text-align: left;">
      <div class="hud-badge" style="justify-content: center; padding: 10px;">✨ Nível: ${GameState.playerLevel}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">🪙 Moedas: ${GameState.coins}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">🏆 Conquistas: ${GameState.unlockedAchievements.size}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">🃏 Cartas: ${GameState.collectedCards.size}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">🎮 Partidas: ${scores.length}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">📈 Média: ${avgScore}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">🥇 Recorde: ${scores[0]?.score || 0}</div>
      <div class="hud-badge" style="justify-content: center; padding: 10px;">🐯 Pet: ${GameState.selectedPet ? petsData.find(p => p.id === GameState.selectedPet)?.name : 'Nenhum'}</div>
    </div>
    <button class="btn-secondary" id="stats-reset" style="margin-top:15px;">🗑️ Zerar Tudo</button>
  `);
  const btn = $('stats-reset');
  if (btn) btn.onclick = resetGame;
}

/* ==================== SKILLS ==================== */
function showSkillTree() {
  const skills = [
    { id: 's1', icon: '⚡', name: 'Speed+' }, { id: 's2', icon: '🧠', name: 'Smart' },
    { id: 's3', icon: '💰', name: 'Gold+' }, { id: 's4', icon: '🍀', name: 'Luck' },
    { id: 's5', icon: '🔥', name: 'Streak+' }, { id: 's6', icon: '🎯', name: 'Precision' },
    { id: 's7', icon: '❤️', name: 'Life+' }, { id: 's8', icon: '⭐', name: 'Star' }
  ];
  openModal(miniGameHeader('🌳', 'Árvore de Habilidades', 'Melhore suas habilidades!', 
    '🌳 Gaste pontos de habilidade para desbloquear poderes.<br>⭐ Ganhe 1 ponto por nível.<br>💡 Cada habilidade dá um bônus!'
  ) + `
    <p style="color:#666; font-size:0.9em; margin-bottom:15px;">Pontos: <strong style="color: #d4af37; font-size: 1.3em;">${GameState.skillPoints}</strong></p>
    <div id="skill-tree" style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px; margin:15px 0;"></div>
  `);
  function renderTree() {
    const g = $('skill-tree');
    if (!g) return;
    g.innerHTML = '';
    skills.forEach(s => {
      const owned = GameState.unlockedSkills.has(s.id);
      const el = document.createElement('div');
      el.style.cssText = `aspect-ratio:1; background:${owned ? 'linear-gradient(135deg,#00a86b,#4caf50)' : 'rgba(0,0,0,0.05)'}; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; cursor:pointer; font-size:0.7em; padding:8px; border:2px solid ${owned ? '#d4af37' : 'transparent'}; opacity:${owned ? 1 : (GameState.skillPoints > 0 ? 0.9 : 0.5)}; transition: all 0.3s;`;
      el.innerHTML = `<span style="font-size:1.6em;">${s.icon}</span><div style="margin-top: 4px; font-family: 'Black Han Sans';">${s.name}</div>`;
      el.onmouseenter = () => el.style.transform = 'scale(1.05)';
      el.onmouseleave = () => el.style.transform = '';
      el.onclick = () => {
        if (!owned && GameState.skillPoints > 0) {
          GameState.skillPoints--;
          GameState.unlockedSkills.add(s.id);
          GameState.coins += 20;
          saveGame();
          updateHUD();
          playUnlock();
          burstConfetti(30);
          renderTree();
        }
      };
      g.appendChild(el);
    });
  }
  renderTree();
}

/* ==================== CHÁ ==================== */
function showTeaCeremony() {
  const teas = [
    { emoji: '🍵', name: 'Nokcha', korName: '녹차', desc: 'Chá verde' },
    { emoji: '🌿', name: 'Insamcha', korName: '인삼차', desc: 'Ginseng' },
    { emoji: '🍯', name: 'Yujacha', korName: '유자차', desc: 'Cítrico' },
    { emoji: '🌾', name: 'Bori-cha', korName: '보리차', desc: 'Cevada' },
    { emoji: '🌸', name: 'Maesil-cha', korName: '매실차', desc: 'Ameixa' },
    { emoji: '🫚', name: 'Saenggang-cha', korName: '생강차', desc: 'Gengibre' }
  ];
  openModal(miniGameHeader('🍵', 'Cerimônia do Chá', 'Aprenda sobre chás coreanos!', 
    '🍵 Escolha um chá para preparar.<br>🎋 Cerimônia tradicional coreana.<br>💰 <strong>+10 moedas</strong> por preparo.'
  ) + `
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; margin:15px 0;" id="tea-setup"></div>
    <div id="tea-stage" style="min-height:100px; font-family: 'Nanum Myeongjo'; font-size: 1.1em; color: #0047a0; padding: 15px; background: rgba(212,175,55,0.1); border-radius: 12px;"></div>
  `);
  const setup = $('tea-setup');
  if (!setup) return;
  teas.forEach(tea => {
    const el = document.createElement('div');
    el.style.cssText = 'padding:15px 10px; background:linear-gradient(135deg,#fff,#fdf6e3); border:2px solid #d4af37; border-radius:12px; cursor:pointer; text-align:center; transition: all 0.3s;';
    el.innerHTML = `<span style="font-size:2.2em; display:block; margin-bottom:5px;">${tea.emoji}</span><strong style="color: #0047a0;">${tea.korName}</strong><br><small style="color: #666;">${tea.name} — ${tea.desc}</small>`;
    el.onmouseenter = () => el.style.transform = 'translateY(-3px)';
    el.onmouseleave = () => el.style.transform = '';
    el.onclick = () => {
      document.querySelectorAll('#tea-setup > div').forEach(x => x.style.background = 'linear-gradient(135deg,#fff,#fdf6e3)');
      el.style.background = 'linear-gradient(135deg,#00a86b,#4caf50)';
      el.style.color = 'white';
      const stage = $('tea-stage');
      if (stage) stage.innerHTML = `<div style="font-size: 3.5em; text-align: center; animation: float 2s infinite;">${tea.emoji}</div><div style="text-align:center; margin-top: 10px;">Preparando ${tea.name}...</div>`;
      playTone(400, 0.5);
      setTimeout(() => {
        const stage2 = $('tea-stage');
        if (stage2) stage2.innerHTML = `<div style="font-size: 3.5em; text-align: center;">${tea.emoji}</div><div style="text-align:center; margin-top: 10px; color: #00a86b; font-weight: 700;">✓ ${tea.name} pronto! 감사합니다</div>`;
        speak(tea.korName, 'ko-KR');
        playCorrect();
        checkAchievement('tea-master');
        GameState.coins += 10;
        addXP(8);
        saveGame();
        updateHUD();
        burstConfetti(30);
      }, 1800);
    };
    setup.appendChild(el);
  });
}

/* ==================== MISSÕES ==================== */
function showMissions() {
  const today = new Date().toDateString();
  if (GameState.lastMissions !== today) {
    GameState.completedMissions.clear();
    GameState.lastMissions = today;
    saveGame();
  }
  openModal(miniGameHeader('📅', 'Missões Diárias', 'Completadas recompensas!', 
    '📅 Complete missões para ganhar moedas.<br>⭐ Renovam a cada dia!<br>💰 Recompensas de 25 a 100 moedas.'
  ) + `
    <div id="missions-list">
      ${missionsList.map(m => `
        <div class="mission-card ${GameState.completedMissions.has(m.id) ? 'completed' : ''}" data-mission="${m.id}">
          <div style="font-size:2.2em;">${m.icon}</div>
          <div style="flex:1;">
            <div style="font-family:Black Han Sans; font-size:0.95em;">${m.title}</div>
            <div style="font-size:0.8em; opacity: 0.85;">${m.desc}</div>
          </div>
          <div style="font-family:Black Han Sans; color:${GameState.completedMissions.has(m.id) ? 'white' : '#d4af37'}; font-size: 1.1em;">🪙 ${m.reward}</div>
        </div>
      `).join('')}
    </div>
  `);
  document.querySelectorAll('[data-mission]').forEach(el => {
    el.onclick = () => {
      const id = el.dataset.mission;
      if (GameState.completedMissions.has(id)) { playWrong(); return; }
      const m = missionsList.find(x => x.id === id);
      GameState.completedMissions.add(id);
      GameState.coins += m.reward;
      addXP(20);
      saveGame();
      updateHUD();
      el.classList.add('completed');
      burstConfetti(40);
      playUnlock();
      if (GameState.completedMissions.size >= 10) checkAchievement('mission-master');
    };
  });
}

/* ==================== ACHIEVEMENTS ==================== */
function showAchievements() {
  openModal(miniGameHeader('🏆', 'Conquistas', `Desbloqueadas: ${GameState.unlockedAchievements.size}/${achievementsList.length}`, 
    '🏆 Conquistas desbloqueadas por feitos no jogo.<br>⭐ Mostre seu progresso!'
  ) + `
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; max-height:450px; overflow-y:auto; padding:10px;">
      ${achievementsList.map(a => `
        <div style="padding:10px 5px; background:${GameState.unlockedAchievements.has(a.id) ? 'linear-gradient(135deg,rgba(212,175,55,0.3),rgba(205,46,58,0.15))' : 'rgba(0,0,0,0.05)'}; border:2px solid ${GameState.unlockedAchievements.has(a.id) ? '#d4af37' : 'transparent'}; border-radius:10px; text-align:center; font-size:0.75em;">
          <span style="font-size:1.8em; display:block;">${a.icon}</span>
          <div style="font-weight:700; color:#0047a0; margin-top: 4px;">${a.name}</div>
          <div style="font-size:0.75em; color:#888; margin-top:2px;">${a.desc}</div>
        </div>
      `).join('')}
    </div>
  `);
}

/* ==================== PET ==================== */
function showPet() {
  if (!GameState.selectedPet) { showPetSelect(); return; }
  const pet = petsData.find(p => p.id === GameState.selectedPet);
  openModal(miniGameHeader(pet.emoji, pet.name, `Bônus: ${pet.bonus}`, 
    '🐯 Cuide do seu pet para ganhar bônus!<br>🍖 Alimente (10🪙) — Aumenta fome<br>🎾 Brinque — Aumenta felicidade<br>💪 Treine — Ganha XP e moedas<br>⭐ Pets felizes dão bônus especiais!'
  ) + `
    <div style="text-align:center; padding:20px; background:linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,183,197,0.15)); border-radius:20px; margin:15px 0;">
      <div style="font-size:6em; animation: float 3s infinite;">${pet.emoji}</div>
      <div style="font-family:Black Han Sans; color:#cd2e3a; font-size:1.3em; margin:10px 0;">Nível ${GameState.petLevel}</div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:15px;">
        <div style="padding:10px; background:white; border-radius:12px; border:2px solid #d4af37; font-size:0.8em; font-weight:700;">🍖 Fome<br><span style="font-size: 1.2em; color: #0047a0;">${GameState.petHunger}%</span></div>
        <div style="padding:10px; background:white; border-radius:12px; border:2px solid #d4af37; font-size:0.8em; font-weight:700;">😊 Felicidade<br><span style="font-size: 1.2em; color: #0047a0;">${GameState.petHappiness}%</span></div>
        <div style="padding:10px; background:white; border-radius:12px; border:2px solid #d4af37; font-size:0.8em; font-weight:700;">⚡ Energia<br><span style="font-size: 1.2em; color: #0047a0;">${GameState.petEnergy}%</span></div>
      </div>
      <div style="font-family:Black Han Sans; color:#0047a0; font-size:0.95em; margin-top:15px;">XP Pet: ${GameState.petXP}/100</div>
    </div>
    <div class="btn-row">
      <button class="btn-secondary" id="pet-feed">🍖 Alimentar (10🪙)</button>
      <button class="btn-secondary" id="pet-play">🎾 Brincar</button>
      <button class="btn-secondary" id="pet-rest">💤 Descansar</button>
      <button class="btn-secondary" id="pet-train">💪 Treinar</button>
    </div>
    <div class="btn-row" style="margin-top:10px;">
      <button class="btn-secondary" data-action="pet-select">🔄 Trocar Pet</button>
    </div>
  `);
  const fb = $('pet-feed');
  if (fb) fb.onclick = () => {
    if (GameState.coins < 10) { playWrong(); return; }
    GameState.coins -= 10;
    GameState.petHunger = Math.min(100, GameState.petHunger + 25);
    GameState.petHappiness = Math.min(100, GameState.petHappiness + 5);
    GameState.petXP += 3;
    while (GameState.petXP >= 100) { GameState.petXP -= 100; GameState.petLevel++; }
    burstConfetti(15); playCorrect();
    if (GameState.petLevel >= 10) checkAchievement('pet-master');
    saveGame(); updateHUD();
    closeAllModals(); showPet();
  };
  const pb = $('pet-play');
  if (pb) pb.onclick = () => {
    GameState.petHappiness = Math.min(100, GameState.petHappiness + 20);
    GameState.petEnergy = Math.max(0, GameState.petEnergy - 10);
    GameState.petXP += 5;
    while (GameState.petXP >= 100) { GameState.petXP -= 100; GameState.petLevel++; }
    burstConfetti(15); playCorrect();
    saveGame(); updateHUD();
    closeAllModals(); showPet();
  };
  const rb = $('pet-rest');
  if (rb) rb.onclick = () => {
    GameState.petEnergy = Math.min(100, GameState.petEnergy + 30);
    GameState.petHunger = Math.max(0, GameState.petHunger - 5);
    burstConfetti(10); playTone(400, 0.5);
    saveGame(); updateHUD();
    closeAllModals(); showPet();
  };
  const tb = $('pet-train');
  if (tb) tb.onclick = () => {
    if (GameState.petEnergy < 20) { playWrong(); return; }
    GameState.petEnergy -= 20;
    GameState.petXP += 15;
    while (GameState.petXP >= 100) { GameState.petXP -= 100; GameState.petLevel++; }
    GameState.coins += 10; addXP(8);
    burstConfetti(25); playUnlock();
    saveGame(); updateHUD();
    if (GameState.petLevel >= 10) checkAchievement('pet-master');
    closeAllModals(); showPet();
  };
}

function showPetSelect() {
  openModal(miniGameHeader('🎁', 'Escolha seu Pet', 'Cada pet tem um bônus único!', 
    '🐯 Escolha entre 8 pets coreanos!<br>💡 Cada um dá um bônus diferente:<br>🐯 +streak • 🐉 +moedas • 🦊 +cartas<br>🐢 +dica • ⭐ +XP • 🐕 +vida'
  ) + `
    <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:10px; margin:15px 0;">
      ${petsData.map(p => `
        <div class="pet-option" data-pet="${p.id}" style="${GameState.selectedPet === p.id ? 'background: linear-gradient(135deg,#00a86b,#4caf50); color: white;' : ''}">
          <span style="font-size:2.5em; display:block;">${p.emoji}</span>
          <div style="font-family:Black Han Sans; font-size:0.9em; margin-top:6px;">${p.name}</div>
          <div style="font-size:0.7em; margin-top:3px;">${p.bonus}</div>
        </div>
      `).join('')}
    </div>
  `);
  document.querySelectorAll('[data-pet]').forEach(el => {
    el.onclick = () => {
      GameState.selectedPet = el.dataset.pet;
      saveGame(); updateHUD();
      checkAchievement('pet-owner');
      burstConfetti(50); playUnlock();
      closeAllModals(); showPet();
    };
  });
}

/* ==================== DAILY ==================== */
function showDailyReward() {
  const today = new Date().toDateString();
  if (GameState.lastDaily === today) {
    openModal(miniGameHeader('🎁', 'Presente Diário', 'Volte amanhã!', '🎁 Você já pegou seu presente hoje.') + `
      <p style="font-size:1.1em; color:#666; padding:25px; text-align: center;">Você já pegou hoje!<br>Volte amanhã! 🌸</p>
    `);
    return;
  }
  GameState.lastDaily = today;
  const reward = rand(15, 40);
  GameState.coins += reward;
  saveGame(); updateHUD();
  burstConfetti(80); playUnlock();
  speak('축하합니다', 'ko-KR');
  openModal(miniGameHeader('🎁', 'Presente Diário', 'Parabéns!', '🎁 Você ganhou uma recompensa!') + `
    <div style="font-size:5em; margin:20px 0; text-align: center; animation: float 2s infinite;">🎊</div>
    <p style="font-size:1.5em; font-family:Black Han Sans; color:#d4af37; text-align: center;">+${reward} moedas!</p>
    <p style="font-size:0.9em; color:#888; margin-top:15px; text-align: center;">Volte amanhã para mais!</p>
  `);
}

/* ==================== CÓDIGO ==================== */
function showCodeEntry() {
  openModal(miniGameHeader('🔑', 'Códigos Secretos', 'Palavras mágicas coreanas!', 
    '🔑 Digite códigos para ganhar recompensas.<br>💡 Tente palavras coreanas famosas!<br>⭐ Alguns códigos incluem o nome da Ariza!'
  ) + `
    <input type="text" id="code-input" placeholder="DIGITE O CÓDIGO" style="width:100%; padding:15px; border:2px solid #d4af37; border-radius:12px; font-size:1.1em; text-align:center; text-transform:uppercase; font-family:'Black Han Sans'; letter-spacing:4px;">
    <div id="code-feedback" style="min-height:40px; margin:15px 0; font-weight:700; text-align: center; font-size: 1.05em;"></div>
    <button class="primary-btn" id="code-submit" style="padding:12px 30px; font-size:1em; display: block; margin: 0 auto;">🔓 Resgatar</button>
    <div style="margin-top:20px; font-size:0.8em; color:#888; text-align:left; padding:12px; background:rgba(212,175,55,0.1); border-radius:10px; line-height: 1.7;">
      💡 <strong>Tente:</strong> 화이팅 • 대박 • 한국 • KOREA • SEOUL • ARIZA • 선생님
    </div>
  `);
  const btn = $('code-submit');
  if (btn) btn.onclick = () => {
    const code = ($('code-input').value || '').trim().toUpperCase();
    const codes = {
      '화이팅': { coins: 50, msg: '💪 Força! +50 moedas' },
      '대박': { coins: 75, msg: '🎉 Incrível! +75 moedas' },
      '안녕': { coins: 40, msg: '👋 Olá! +40 moedas' },
      '사랑': { coins: 60, msg: '❤️ Amor! +60 moedas' },
      '한국': { coins: 100, msg: '🇰🇷 Coreia! +100 moedas' },
      'KOREA': { coins: 100, msg: '🇰🇷 Korea! +100 moedas' },
      'SEOUL': { coins: 80, msg: '🏙️ Seul! +80 moedas' },
      'ARIZA': { coins: 300, msg: '🌸 HOMENAGEM À ARIZA! +300 moedas + carta exclusiva!' },
      '선생님': { coins: 150, msg: '👩‍🏫 선생님 (Professor)! +150 moedas' }
    };
    const fb = $('code-feedback');
    if (GameState.usedCodes.has(code)) {
      if (fb) fb.innerHTML = '⚠️ <span style="color:#cd2e3a">Código já usado!</span>';
      playWrong();
      return;
    }
    if (codes[code]) {
      GameState.coins += codes[code].coins;
      GameState.usedCodes.add(code);
      saveGame(); updateHUD();
      checkAchievement('code-master');
      burstConfetti(100); burstFireworks(8); playVictory();
      if (fb) fb.innerHTML = `✅ <span style="color:#4caf50">${codes[code].msg}</span>`;
      speak(code === 'ARIZA' ? '아리자' : '축하합니다', 'ko-KR');
      if (code === 'ARIZA') {
        setTimeout(() => burstFireworks(15), 500);
        const locked = collectibleCards.filter(c => !GameState.collectedCards.has(c.id));
        if (locked.length) {
          GameState.collectedCards.add(locked[0].id);
          saveGame();
        }
      }
    } else {
      if (fb) fb.innerHTML = '❌ <span style="color:#cd2e3a">Código inválido!</span>';
      playWrong();
    }
  };
  const input = $('code-input');
  if (input) input.focus();
}