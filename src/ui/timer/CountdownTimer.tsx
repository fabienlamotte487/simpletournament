"use client"
import { useState, useEffect, useRef } from 'react';
import ShowTimer from './ShowTimer';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export default function CountdownTimer(props: {initialMilliseconds:number}) {
  const { initialMilliseconds = 60000 } = props
  const [timeLeft, setTimeLeft] = useState<number>(initialMilliseconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const ringRef = useRef<HTMLAudioElement | null>(null)
  const fiveMinutesLeftRef = useRef<HTMLAudioElement | null>(null)
  const tenMinutesLeftRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1000;
          
          if (newTime === 1000 * 60 * 10) {
            playTenMinutesLeft();
          }
          if (newTime === 1000 * 60 * 5) {
            playFiveMinutesLeft();
          }
          if (newTime <= 0) {
            playDing();
            setIsRunning(false);
            return 0;
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);
  
  const playAudio = (audioRef: React.RefObject<HTMLAudioElement | null>) => {
    if (!audioRef.current) return

    try {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch((error) => {
        console.warn('Lecture audio impossible:', error.message)
      })
    } catch (error) {
      console.warn('Erreur audio:', error)
    }
  }

  const playDing = () => playAudio(ringRef)
  const playFiveMinutesLeft = () => playAudio(fiveMinutesLeftRef)
  const playTenMinutesLeft = () => playAudio(tenMinutesLeftRef)

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