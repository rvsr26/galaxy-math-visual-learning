// useSound.js — Web Audio API tones + Web Speech API
import { useCallback, useRef } from 'react';

const MILESTONES = [5, 10, 20, 30, 50];

export function useSound(enabled = true) {
    const audioCtxRef = useRef(null);

    const getCtx = () => {
        if (!audioCtxRef.current) {
            const AC = window.AudioContext || window.webkitAudioContext;
            if (AC) audioCtxRef.current = new AC();
        }
        return audioCtxRef.current;
    };

    const playTone = useCallback((freq, duration = 0.3, type = 'sine', volume = 0.15) => {
        if (!enabled) return;
        const ctx = getCtx();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    }, [enabled]);

    const playCorrect = useCallback(() => {
        playTone(523.25, 0.15); // C5
        setTimeout(() => playTone(659.25, 0.15), 120); // E5
        setTimeout(() => playTone(783.99, 0.25), 240); // G5
    }, [playTone]);

    const playWrong = useCallback(() => {
        playTone(220, 0.3, 'sawtooth', 0.08);
    }, [playTone]);

    const playClick = useCallback(() => {
        playTone(440, 0.1, 'sine', 0.1);
    }, [playTone]);

    const playCount = useCallback((n) => {
        // Ascending tones for counting
        const freqs = [261, 294, 330, 349, 392, 440, 494, 523, 587, 659,
            698, 784, 880, 988, 1047, 1109, 1175, 1245, 1319, 1397];
        playTone(freqs[Math.min(n - 1, freqs.length - 1)] || 440, 0.2);
    }, [playTone]);

    const speak = useCallback((text) => {
        if (!enabled) return;
        if (!window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.rate = 0.85;
        utt.pitch = 1.1;
        utt.volume = 1;
        window.speechSynthesis.speak(utt);
    }, [enabled]);

    const isMilestone = useCallback((score) => MILESTONES.includes(score), []);

    const playUnlock = useCallback(() => {
        playTone(600, 0.1, 'sine');
        setTimeout(() => playTone(800, 0.1, 'sine'), 100);
        setTimeout(() => playTone(1000, 0.2, 'sine'), 200);
    }, [playTone]);

    const playFlip = useCallback(() => {
        playTone(400, 0.08, 'sine', 0.1);
    }, [playTone]);

    const playBuy = useCallback(() => {
        playTone(1200, 0.1, 'square');
        setTimeout(() => playTone(600, 0.2, 'sine'), 100);
    }, [playTone]);

    return { playCorrect, playWrong, playClick, playFlip, playCount, speak, isMilestone, playUnlock, playBuy };
}
