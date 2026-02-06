"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import ShowTimer from './ShowTimer';
import Controls from './Controls';

const TIMER_KEY = 'mtg-tournament-timer';

function saveTimer(data: { endTime?: number; timeLeft?: number; isRunning: boolean }) {
  try { localStorage.setItem(TIMER_KEY, JSON.stringify(data)); } catch {}
}

function clearTimer() {
  try { localStorage.removeItem(TIMER_KEY); } catch {}
}

function loadTimer(): { endTime?: number; timeLeft?: number; isRunning: boolean } | null {
  try {
    const raw = localStorage.getItem(TIMER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export default function CountdownTimer(props: {initialMilliseconds:number}) {
  const { initialMilliseconds = 60000 } = props
  const [timeLeft, setTimeLeft] = useState<number>(initialMilliseconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endTimeRef = useRef<number>(0);
  const effectCountRef = useRef(0);
  const ringRef = useRef<HTMLAudioElement | null>(null)
  const fiveMinutesLeftRef = useRef<HTMLAudioElement | null>(null)
  const tenMinutesLeftRef = useRef<HTMLAudioElement | null>(null)

  const playAudio = useCallback((audioRef: React.RefObject<HTMLAudioElement | null>) => {
    if (!audioRef.current) return
    try {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.warn('Lecture audio impossible:', error.message)
      })
    } catch (error) {
      console.warn('Erreur audio:', error)
    }
  }, []);

  const tick = useCallback(() => {
    const remaining = endTimeRef.current - Date.now();
    const newTime = Math.max(0, Math.ceil(remaining / 1000) * 1000);

    setTimeLeft((prev) => {
      if (prev > 10 * 60 * 1000 && newTime <= 10 * 60 * 1000) {
        playAudio(tenMinutesLeftRef);
      }
      if (prev > 5 * 60 * 1000 && newTime <= 5 * 60 * 1000) {
        playAudio(fiveMinutesLeftRef);
      }
      if (newTime <= 0) {
        playAudio(ringRef);
        setIsRunning(false);
        clearTimer();
        return 0;
      }
      return newTime;
    });
  }, [playAudio]);

  // Restore timer state from localStorage on mount
  useEffect(() => {
    const saved = loadTimer();

    if (saved) {
      if (saved.isRunning && saved.endTime) {
        const remaining = saved.endTime - Date.now();
        if (remaining > 0) {
          setTimeLeft(Math.ceil(remaining / 1000) * 1000);
          setIsRunning(true);
        } else {
          setTimeLeft(0);
          clearTimer();
        }
      } else if (!saved.isRunning && saved.timeLeft != null) {
        setTimeLeft(saved.timeLeft);
      }
    }

    return () => { clearTimer(); };
  }, []);

  useEffect(() => {
    effectCountRef.current++;

    if (effectCountRef.current > 1) {
      if (isRunning && timeLeft > 0) {
        endTimeRef.current = Date.now() + timeLeft;
        intervalRef.current = setInterval(tick, 1000);
        saveTimer({ endTime: endTimeRef.current, isRunning: true });
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeLeft > 0) {
          saveTimer({ timeLeft, isRunning: false });
        } else {
          clearTimer();
        }
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && isRunning) {
        tick();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isRunning, tick]);

  const isFinished = timeLeft === 0;

  return (
    <div className="timer-container">
      {/* Affichage du temps */}
      <ShowTimer {...{isFinished, timeLeft}} />
      <audio ref={ringRef} src="/mp3/ring.mp3" preload="auto" />
      <audio ref={fiveMinutesLeftRef} src="/mp3/5_minutes_left.mp3" preload="auto" />
      <audio ref={tenMinutesLeftRef} src="/mp3/10_minutes_left.mp3" preload="auto" />

      {/* Affichage des boutons de controle */}
      <Controls
        {...{
          isFinished,
          setIsRunning,
          isRunning,
          setTimeLeft,
          timeLeft,
          initialMilliseconds
        }}
      />
      
      {isFinished && 
        <p className="timer-message text-center">
          Temps écoulé ! Il vous reste 5 tours à jouer.
        </p>
      }
    </div>
  );
}