// ==================== MODAIS ====================
let currentModal = null;

function openModal(html, showBack = true) {
  closeAllModals();
  const modal = document.createElement('div');
  modal.className = 'modal active';
  const backBtn = showBack
    ? `<div style="margin-top:15px;"><button class="btn-secondary" onclick="closeAllModals()" style="padding:10px 20px;">⬅️ Voltar ao Menu</button></div>`
    : '';
  modal.innerHTML = `<div class="modal-content">${html}${backBtn}</div>`;
  modal.onclick = e => { if (e.target === modal) closeAllModals(); };
  document.body.appendChild(modal);
  currentModal = modal;
  updateBackButton();
  return modal;
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.remove());
  currentModal = null;
  updateBackButton();
}

function updateBackButton() {
  const backBtn = $('back-button');
  if (!backBtn) return;
  if (currentModal) backBtn.classList.add('active');
  else backBtn.classList.remove('active');
}

function miniGameHeader(emoji, title, subtitle, howToPlay) {
  return `
    <div style="text-align: center; margin-bottom: 15px;">
      <div style="font-size: 3.5em; margin-bottom: 5px; animation: float 3s ease-in-out infinite; filter: drop-shadow(0 10px 25px rgba(212,175,55,0.6));">${emoji}</div>
      <h3 style="font-family: 'Black Han Sans'; color: #cd2e3a; font-size: 1.4em; letter-spacing: 2px; text-shadow: 2px 2px 0 #d4af37; margin-bottom: 5px;">${title}</h3>
      <p style="color: #666; font-size: 0.85em; font-style: italic; margin-bottom: 12px;">${subtitle}</p>
      <div style="background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(255,183,197,0.15)); border: 2px dashed #d4af37; border-radius: 12px; padding: 10px 14px; margin-bottom: 15px; text-align: left; font-size: 0.8em; color: #555; line-height: 1.6;">
        <strong style="color: #0047a0; font-family: 'Black Han Sans';">📖 COMO JOGAR:</strong><br>
        ${howToPlay}
      </div>
    </div>
  `;
}