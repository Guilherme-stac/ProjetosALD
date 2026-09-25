// ==================== UTILITÁRIOS ====================
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = arr => arr[Math.floor(Math.random() * arr.length)];
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);
const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = '✅ Copiado!';
    btn.classList.add('copied');
    playUnlock();
    burstConfetti(30);
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1500);
  }).catch(() => {
    btn.textContent = '⚠️ Erro';
    setTimeout(() => btn.textContent = '📋 Copiar', 1500);
  });
}

function animateElement(el, animation = 'popIn', duration = 500) {
  if (!el) return;
  el.style.animation = 'none';
  el.offsetHeight;
  el.style.animation = `${animation} ${duration}ms ease-out`;
}