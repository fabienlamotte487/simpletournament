import { ShowTimerProps } from '@/src/types/CountDownTimer'
import React, { useCallback } from 'react'

function ShowTimer(props:ShowTimerProps) {
    const {isFinished, timeLeft} = props;

    const formatTime = useCallback((ms:number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
    
        if (hours > 0) {
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else if (minutes > 0) {
          return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
          return String(seconds);
        }
    }, []);

    return (
        <div 
            className={`timer-display ${isFinished ? 'finished' : ''}`}
            role="timer"
            aria-live="polite"
            aria-atomic="true"
        >
            {formatTime(timeLeft)}
        </div>
    )
}

export default ShowTimer