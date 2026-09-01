type Note = { midi: number; beats: number };

const SONG: Note[] = [
  { midi: 79, beats: 0.3 },
  { midi: 79, beats: 0.2 },
  { midi: 81, beats: 0.5 },
  { midi: 79, beats: 0.5 },
  { midi: 84, beats: 0.5 },
  { midi: 83, beats: 1.15 },
  { midi: 79, beats: 0.3 },
  { midi: 79, beats: 0.2 },
  { midi: 81, beats: 0.5 },
  { midi: 79, beats: 0.5 },
  { midi: 86, beats: 0.5 },
  { midi: 84, beats: 1.15 },
  { midi: 79, beats: 0.3 },
  { midi: 79, beats: 0.2 },
  { midi: 91, beats: 0.5 },
  { midi: 88, beats: 0.5 },
  { midi: 84, beats: 0.5 },
  { midi: 83, beats: 0.5 },
  { midi: 81, beats: 1.0 },
  { midi: 89, beats: 0.3 },
  { midi: 89, beats: 0.2 },
  { midi: 88, beats: 0.5 },
  { midi: 84, beats: 0.5 },
  { midi: 86, beats: 0.5 },
  { midi: 84, beats: 1.4 },
];

const BEAT = 0.42;
const GAP = 1.6;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let rainGain: GainNode | null = null;
let rainSource: AudioBufferSourceNode | null = null;
let playing = false;
let loopTimer: ReturnType<typeof setTimeout> | null = null;
const listeners = new Set<(on: boolean) => void>();

function midiToFreq(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function ensureContext() {
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0.08;
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2400;
  master.connect(filter);
  filter.connect(ctx.destination);
  return ctx;
}

function startRainLayer(audio: AudioContext) {
  if (rainSource || !master) return;
  const seconds = 2;
  const buffer = audio.createBuffer(1, audio.sampleRate * seconds, audio.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

  const src = audio.createBufferSource();
  src.buffer = buffer;
  src.loop = true;

  const bp = audio.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1800;
  bp.Q.value = 0.55;

  rainGain = audio.createGain();
  rainGain.gain.value = 0.035;

  src.connect(bp);
  bp.connect(rainGain);
  rainGain.connect(audio.destination);
  src.start();
  rainSource = src;
}

function playNote(audio: AudioContext, midi: number, time: number, beats: number) {
  if (!master) return;
  const freq = midiToFreq(midi);
  const dur = Math.max(0.18, beats * BEAT * 0.95);

  const tri = audio.createOscillator();
  tri.type = "triangle";
  tri.frequency.setValueAtTime(freq, time);

  const sine = audio.createOscillator();
  sine.type = "sine";
  sine.frequency.setValueAtTime(freq * 2, time);

  const g1 = audio.createGain();
  const g2 = audio.createGain();
  g1.gain.setValueAtTime(0.0001, time);
  g1.gain.exponentialRampToValueAtTime(0.55, time + 0.02);
  g1.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  g2.gain.setValueAtTime(0.0001, time);
  g2.gain.exponentialRampToValueAtTime(0.12, time + 0.02);
  g2.gain.exponentialRampToValueAtTime(0.0001, time + dur * 0.7);

  tri.connect(g1);
  sine.connect(g2);
  g1.connect(master);
  g2.connect(master);
  tri.start(time);
  sine.start(time);
  tri.stop(time + dur + 0.05);
  sine.stop(time + dur + 0.05);
}

function scheduleLoop() {
  if (!playing || !ctx) return;
  const start = ctx.currentTime + 0.05;
  let t = start;
  for (const note of SONG) {
    playNote(ctx, note.midi, t, note.beats);
    t += note.beats * BEAT;
  }
  const waitMs = (t - start + GAP) * 1000;
  loopTimer = setTimeout(scheduleLoop, waitMs);
}

function emit() {
  for (const fn of listeners) fn(playing);
}

export function startMusic() {
  if (typeof window === "undefined") return;
  try {
    const audio = ensureContext();
    void audio.resume();
    startRainLayer(audio);
    if (playing) return;
    playing = true;
    scheduleLoop();
    emit();
  } catch {
    /* autoplay / audio unavailable */
  }
}

export function stopMusic() {
  playing = false;
  if (loopTimer) {
    clearTimeout(loopTimer);
    loopTimer = null;
  }
  if (rainGain) rainGain.gain.value = 0;
  emit();
}

export function toggleMusic() {
  if (playing) stopMusic();
  else {
    if (rainGain) rainGain.gain.value = 0.035;
    startMusic();
  }
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
