// Pure Web Audio API Acoustic Micro-Feedback Synthesizer
// Produces subtle hardware-inspired clicks and harmonic chimes without external assets

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.enabled || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  // Subtle mechanical lens click (18ms)
  public playTick(pitchMultiplier = 1) {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(190 * pitchMultiplier, now + 0.022);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + 0.022);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.024);
    } catch {
      // Ignore audio context errors on restricted autoplay
    }
  }

  // Soft crystal harmonic chord when bookmarking or confirming
  public playChime() {
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const freqs = [523.25, 659.25, 987.77]; // C5, E5, B5 major 7th crystal interval

      freqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.028);

        gain.gain.setValueAtTime(0.035, now + i * 0.028);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + i * 0.028 + 0.18);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.028);
        osc.stop(now + i * 0.028 + 0.19);
      });
    } catch {
      // Ignore audio errors
    }
  }
}

export const soundEngine = new SoundEngine();
