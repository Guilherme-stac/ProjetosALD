// ==================== FUNDOS ====================
const BACKGROUNDS = [
  { css: 'linear-gradient(135deg, #2d1b3d 0%, #4a1f2e 50%, #1a1a2e 100%)', url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #4a1f3d 0%, #6a2545 50%, #2a1a3a 100%)', url: 'https://images.unsplash.com/photo-1538485399081-7c897c8ee32c?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #3d2a1a 0%, #4a3020 50%, #1a1a1a 100%)', url: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #1a2a3d 0%, #2a3a5a 50%, #0a0a1a 100%)', url: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #2a3a2a 0%, #3a4a3a 50%, #1a1a2a 100%)', url: 'https://images.unsplash.com/photo-1598514983746-cb7656dc98d0?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #1a1a3d 0%, #3a1a5a 50%, #0a0a1a 100%)', url: 'https://images.unsplash.com/photo-1617464287429-cc3e7ef2c0ca?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #2a1a3d 0%, #3d2a4a 50%, #1a0a2a 100%)', url: 'https://images.unsplash.com/photo-1601645191163-3fc0d5d64e35?w=1920&q=80&auto=format&fit=crop' },
  { css: 'linear-gradient(135deg, #4a1a2a 0%, #6a2a3a 50%, #2a0a1a 100%)', url: 'https://images.unsplash.com/photo-1517154252575-e7fe4d3c40b6?w=1920&q=80&auto=format&fit=crop' }
];

let currentBgIndex = 0;
let activeBgLayer = 1;
let bgIntervalId = null;

function setBackground(index) {
  const bg = BACKGROUNDS[index];
  const currentLayer = $('bg-layer-' + activeBgLayer);
  const nextLayer = $('bg-layer-' + (activeBgLayer === 1 ? 2 : 1));
  if (!nextLayer) return;

  nextLayer.style.backgroundImage = bg.css;
  nextLayer.style.backgroundSize = 'cover';
  nextLayer.style.backgroundPosition = 'center';

  const img = new Image();
  img.onload = () => {
    nextLayer.style.backgroundImage = `${bg.css}, url('${bg.url}')`;
    nextLayer.style.backgroundBlendMode = 'overlay';
  };
  img.onerror = () => { console.log('Imagem falhou, mantendo gradiente'); };
  img.src = bg.url;

  nextLayer.classList.add('active');
  setTimeout(() => { if (currentLayer) currentLayer.classList.remove('active'); }, 100);
  activeBgLayer = activeBgLayer === 1 ? 2 : 1;
  currentBgIndex = index;
}

function changeBackground() {
  const nextIndex = (currentBgIndex + 1) % BACKGROUNDS.length;
  setBackground(nextIndex);
}

function initBackground() {
  if (bgIntervalId) return;
  setBackground(0);
  bgIntervalId = setInterval(changeBackground, 10000);
}