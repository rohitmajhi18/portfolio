/**
 * ==========================================================================
 * ROHIT MAJHI // CYBERSECURITY PORTFOLIO
 * Web Audio API Cyber Synthesizer
 * 100% Zero-Dependency Audio Micro-Interactions
 * ==========================================================================
 */

window.CyberAudio = (function () {
  'use strict';

  let audioCtx = null;
  let isMuted = localStorage.getItem('rm_cyber_audio_muted') !== 'false'; // default muted for user comfort

  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, gainValue = 0.05) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy or error
    }
  }

  return {
    isMuted: () => isMuted,

    toggleMute: function () {
      isMuted = !isMuted;
      localStorage.setItem('rm_cyber_audio_muted', isMuted);
      if (!isMuted) {
        this.playSuccess();
      }
      return isMuted;
    },

    playHover: function () {
      playTone(880, 'sine', 0.04, 0.02);
    },

    playClick: function () {
      playTone(520, 'triangle', 0.06, 0.04);
    },

    playTerminalKey: function () {
      playTone(1200 + Math.random() * 400, 'square', 0.02, 0.015);
    },

    playAlert: function () {
      if (isMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(150, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch (e) {}
    },

    playSuccess: function () {
      playTone(660, 'sine', 0.08, 0.04);
      setTimeout(() => playTone(880, 'sine', 0.12, 0.04), 80);
    }
  };
})();
