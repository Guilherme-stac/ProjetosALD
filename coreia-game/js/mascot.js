// ==================== MASCOTE ====================
const mascotMessages = [
  '안녕하세요! Bem-vindo(a)! 🇰🇷',
  'Tente códigos secretos! 🔑 Tente "ARIZA"!',
  'Adote um pet coreano! 🐯',
  'Complete missões diárias! 📅',
  'Suba de nível para desbloquear habilidades! ✨',
  '화이팅! Você consegue! 💪',
  'Experimente o modo Chefão! 👹',
  'Cada estação muda o visual! 🍂',
  'Use as teclas 1-4 para responder! ⌨️',
  'As frases coreanas têm botão de copiar! 📋',
  '선생님 Ariza, 감사합니다! 🌸'
];

let mascotInterval;

function initMascot() {
  const m = $('mascot'), bubble = $('mascot-bubble'), text = $('mascot-text');
  if (!m || !bubble || !text) return;
  m.onclick = () => {
    playClick();
    text.textContent = pick(mascotMessages);
    bubble.classList.add('show');
    clearTimeout(mascotInterval);
    mascotInterval = setTimeout(() => bubble.classList.remove('show'), 5000);
  };
  // Rotação automática
  setInterval(() => {
    if (bubble.classList.contains('show')) {
      text.textContent = pick(mascotMessages);
    }
  }, 8000);
}