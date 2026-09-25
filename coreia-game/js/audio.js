// ==================== ÁUDIO ====================
let audioCtx = null;
let soundOn = true;
let musicOn = false;
let musicInterval = null;

function initAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return false; }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return true;
}

function playTone(freq, duration = 0.15, type = 'sine', vol = 0.12) {
  if (!soundOn || !initAudio()) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch(e) {}
}

const playCorrect = () => [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => setTimeout(() => playTone(f, 0.25, 'sine', 0.13), i * 90));
const playWrong = () => { playTone(220, 0.18, 'sawtooth', 0.1); setTimeout(() => playTone(165, 0.25, 'sawtooth', 0.1), 130); };
const playClick = () => playTone(800, 0.05, 'square', 0.07);
const playTick = () => playTone(1200, 0.03, 'square', 0.04);
const playUnlock = () => [659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => setTimeout(() => playTone(f, 0.28, 'triangle', 0.12), i * 90));
const playVictory = () => [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => setTimeout(() => playTone(f, 0.32, 'sine', 0.13), i * 140));
const playCombo = n => [800, 1000, 1200, 1400].forEach((f, i) => setTimeout(() => playTone(f + n * 50, 0.12, 'square', 0.1), i * 55));

function startMusic() {
  if (!musicOn || !initAudio()) return;
  stopMusic();
  const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00];
  const pattern = [0, 2, 4, 5, 7, 9, 7, 5, 4, 2, 4, 2];
  let idx = 0;
  musicInterval = setInterval(() => {
    if (!musicOn || !audioCtx) return;
    try {
      const note = scale[pattern[idx % pattern.length]];
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.value = note;
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      gain.gain.setValueAtTime(0, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.03, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
      idx++;
    } catch(e) {}
  }, 800);
}

function stopMusic() {
  if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
}

function speak(text, lang = 'ko-KR') {
  if (!soundOn || !('speechSynthesis' in window)) return;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.9;
    u.pitch = 1.1;
    u.volume = 0.6;
    speechSynthesis.speak(u);
  } catch(e) {}
}