// ==================== PARTÍCULAS ====================
function createStars() {
  const c = $('stars');
  if (!c || c.dataset.done === '1') return;
  c.dataset.done = '1';
  for (let i = 0; i < 120; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    s.style.animationDelay = Math.random() * 3 + 's';
    s.style.animationDuration = (Math.random() * 2 + 2) + 's';
    s.style.width = s.style.height = rand(1, 3) + 'px';
    c.appendChild(s);
  }
}

function createSakura() {
  const c = $('sakura');
  if (!c || c.dataset.done === '1') return;
  c.dataset.done = '1';
  const petals = ['🌸', '🌸', '🌸', '🌺', '💮', '🌸', '🏵️'];
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'sakura';
    p.textContent = pick(petals);
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 8 + 8) + 's';
    p.style.animationDelay = Math.random() * 10 + 's';
    p.style.fontSize = rand(14, 28) + 'px';
    c.appendChild(p);
  }
}

function createFireflies() {
  const c = $('fireflies');
  if (!c || c.dataset.done === '1') return;
  c.dataset.done = '1';
  for (let i = 0; i < 8; i++) {
    const f = document.createElement('div');
    f.className = 'firefly';
    f.style.left = Math.random() * 100 + '%';
    f.style.top = Math.random() * 100 + '%';
    f.style.animationDuration = (Math.random() * 10 + 8) + 's';
    f.style.animationDelay = Math.random() * 5 + 's';
    c.appendChild(f);
  }
}

function initParticles() {
  createStars();
  createSakura();
  createFireflies();
}