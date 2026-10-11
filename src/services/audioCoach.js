// Audio Coach & Procedural Nature Soundscape Service
// Uses Web Speech Synthesis + Web Audio API procedural acoustics (zero external assets needed)

class AudioCoachService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isSpeaking = false;
    this.voice = null;
    this.audioCtx = null;
    this.ambientGain = null;
    this.isAmbientPlaying = false;
    this.wakeLock = null;

    if (this.synth) {
      this.initVoice();
      if (typeof window !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => this.initVoice();
      }
    }
  }

  initVoice() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Prefer clear natural english voices (e.g. Google, Samantha, Daniel, Natural)
    this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Enhanced') || v.name.includes('Samantha') || v.name.includes('Google'))) 
      || voices.find(v => v.lang.startsWith('en')) 
      || voices[0];
  }

  /**
   * Speak coaching cue through headphones / speaker
   */
  speak(text, onEnd) {
    if (!this.synth) return;
    this.synth.cancel(); // Stop any pending utterance

    const utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 0.95; // Slightly calmer, grounded pacing
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (onEnd) onEnd();
    };

    // Haptic buzz on mobile
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([80, 40, 80]);
    }

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  /**
   * Procedural Nature Ambient Generator (Web Audio API)
   * Generates forest breeze, gentle rustling leaves, and subtle bird warbles
   */
  startAmbientNatureSoundscape() {
    if (this.isAmbientPlaying) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      this.audioCtx = new AudioContext();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.ambientGain = this.audioCtx.createGain();
      this.ambientGain.gain.setValueAtTime(0.08, this.audioCtx.currentTime); // Soft soothing volume
      this.ambientGain.connect(this.audioCtx.destination);

      // Pink noise buffer for soft wind
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for wind / rustle
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, this.audioCtx.currentTime);

      // Gentle LFO modulating wind frequency
      const lfo = this.audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.2, this.audioCtx.currentTime); // 0.2 Hz swell
      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(150, this.audioCtx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      whiteNoise.connect(filter);
      filter.connect(this.ambientGain);

      whiteNoise.start();
      lfo.start();

      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn('Procedural Web Audio ambient error:', e);
    }
  }

  stopAmbientNatureSoundscape() {
    if (this.audioCtx) {
      try {
        this.audioCtx.close();
      } catch (e) {
        // ignore
      }
      this.audioCtx = null;
      this.isAmbientPlaying = false;
    }
  }

  /**
   * Request screen Wake Lock so phone stays awake in pocket
   */
  async requestWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        this.wakeLock = await navigator.wakeLock.request('screen');
      }
    } catch (err) {
      console.log('WakeLock not supported or denied');
    }
  }

  releaseWakeLock() {
    if (this.wakeLock) {
      this.wakeLock.release().catch(() => {});
      this.wakeLock = null;
    }
  }
}

export const audioCoach = new AudioCoachService();
