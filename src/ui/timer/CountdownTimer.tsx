"use client"
import { useState, useEffect, useRef, useCallback } from 'react';
import ShowTimer from './ShowTimer';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export default function CountdownTimer(props: {initialMilliseconds:number}) {
  const { initialMilliseconds = 60000 } = props
  const [timeLeft, setTimeLeft] = useState<number>(initialMilliseconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Gestion du décompte
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1000;
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
  }, [isRunning, timeLeft]);

  const isFinished = timeLeft === 0;

  return (
    <div className="timer-container">
      {/* Affichage du temps */}
      <ShowTimer {...{isFinished, timeLeft}} />

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
      
      {/* Indicateur visuel de progression */}
      <ProgressBar {...{initialMilliseconds, timeLeft, isFinished}} />

      {isFinished && 
        <p className="timer-message">
          Temps écoulé !
        </p>
      }
    </div>
  );
}