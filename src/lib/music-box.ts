let audio: HTMLAudioElement | null = null;
let rainGain: GainNode | null = null;
let rainSource: AudioBufferSourceNode | null = null;
let playing = false;
const listeners = new Set<(on: boolean) => void>();

const MUSIC_SRC = "/audio/Happy Birthday to You Aira.mp3";

function ensureRainContext() {
  if (rainSource && rainGain) return;

  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AC();

  const seconds = 2;
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1800;
  bp.Q.value = 0.55;

  rainGain = ctx.createGain();
  rainGain.gain.value = 0.035;

  src.connect(bp);
  bp.connect(rainGain);
  rainGain.connect(ctx.destination);
  src.start();

  rainSource = src;
}

function emit() {
  for (const fn of listeners) fn(playing);
}

export function startMusic() {
  if (typeof window === "undefined") return;

  try {
    if (!audio) {
      audio = new Audio(MUSIC_SRC);
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.55;
      audio.addEventListener("ended", () => {
        if (playing) void audio?.play();
      });
    }

    ensureRainContext();
    if (rainGain) rainGain.gain.value = 0.035;

    const playPromise = audio.play();
    void playPromise.then(() => {
      playing = true;
      emit();
    }).catch(() => {
      /* Browser blocked playback or the audio file is unavailable. */
    });
  } catch {
    /* Audio unavailable. */
  }
}

export function stopMusic() {
  playing = false;
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  if (rainGain) rainGain.gain.value = 0;
  emit();
}

export function toggleMusic() {
  if (playing) stopMusic();
  else startMusic();
}

export function isMusicPlaying() {
  return playing;
}

export function subscribeMusic(fn: (on: boolean) => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
