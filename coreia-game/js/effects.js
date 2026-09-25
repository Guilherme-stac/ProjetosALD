// ==================== EFEITOS ====================
function burstConfetti(count = 30) {
  const colors = ['#cd2e3a', '#0047a0', '#d4af37', '#ffb7c5', '#ffffff', '#6a1b9a', '#00a86b'];
  for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = pick(colors);
    c.style.animationDuration = (Math.random() * 2 + 2) + 's';
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.width = c.style.height = rand(5, 12) + 'px';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

function burstFireworks(count = 5) {
  const colors = ['#cd2e3a', '#0047a0', '#d4af37', '#ffb7c5', '#ffffff', '#6a1b9a', '#00a86b'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight * 0.6;
      const color = pick(colors);
      for (let j = 0; j < 22; j++) {
        const f = document.createElement('div');
        f.className = 'firework';
        f.style.left = x + 'px';
        f.style.top = y + 'px';
        f.style.background = color;
        f.style.boxShadow = `0 0 10px ${color}`;
        const angle = (Math.PI * 2 * j) / 22;
        const dist = 70 + Math.random() * 90;
        f.animate([
          { transform: 'translate(0,0) scale(1)', opacity: 1 },
          { transform: `translate(${Math.cos(angle)*dist}px, ${Math.sin(angle)*dist}px) scale(0)`, opacity: 0 }
        ], { duration: 1300, easing: 'cubic-bezier(0.2, 0.8, 0.4, 1)' });
        document.body.appendChild(f);
        setTimeout(() => f.remove(), 1400);
      }
    }, i * 150);
  }
}

function showCombo(n) {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Black Han Sans';font-size:4em;background:linear-gradient(90deg,#cd2e3a,#d4af37);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;z-index:1000;pointer-events:none;animation:comboAnim 1s ease-out forwards;`;
  el.textContent = `${n}x COMBO!`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

const comboStyle = document.createElement('style');
comboStyle.textContent = '@keyframes comboAnim{0%{transform:translate(-50%,-50%) scale(0) rotate(-180deg);opacity:0}50%{transform:translate(-50%,-50%) scale(1.3) rotate(0);opacity:1}100%{transform:translate(-50%,-50%) scale(1) translateY(-100px);opacity:0}}';
document.head.appendChild(comboStyle);

document.addEventListener('click', e => {
  if (e.target.closest('.modal, .mascot, #tutorial-screen')) return;
  if (Math.random() > 0.85) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = pick(['✨', '⭐', '🌟', '💫', '🌸']);
    s.style.left = e.clientX + 'px';
    s.style.top = e.clientY + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});