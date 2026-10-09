// Slate's own clap and beep, played through Web Audio so a sound can be
// scheduled from a click to land exactly when an animation hits.
type Sound = 'clap' | 'beep';

let context: AudioContext | null = null;
const buffers = new Map<Sound, Promise<AudioBuffer>>();

function audio() {
  context ??= new AudioContext();
  if (context.state === 'suspended') void context.resume();
  return context;
}

function load(name: Sound) {
  let buffer = buffers.get(name);
  if (!buffer) {
    buffer = fetch(`/audio/${name}.wav`)
      .then((res) => res.arrayBuffer())
      .then((data) => audio().decodeAudioData(data));
    buffers.set(name, buffer);
  }
  return buffer;
}

/** Fetch and decode ahead of the first click. */
export function warm(name: Sound) {
  void load(name).catch(() => buffers.delete(name));
}

/** Call from a user gesture. `delay` is in seconds from now. */
export async function play(name: Sound, { volume = 0.8, delay = 0 } = {}) {
  const ctx = audio();
  const when = ctx.currentTime + delay;
  try {
    const source = ctx.createBufferSource();
    source.buffer = await load(name);
    const gain = ctx.createGain();
    gain.gain.value = volume;
    source.connect(gain).connect(ctx.destination);
    source.start(Math.max(when, ctx.currentTime));
  } catch {
    buffers.delete(name);
  }
}
