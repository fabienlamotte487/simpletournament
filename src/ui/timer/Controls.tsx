import { ControlsProps } from '@/src/types/CountDownTimer'
import React from 'react'
import Pause from '@mui/icons-material/Pause';
import Play from '@mui/icons-material/PlayCircle';
import RotateCcw from '@mui/icons-material/SettingsBackupRestore';

function Controls(props: ControlsProps) {
    const {isFinished, isRunning, setIsRunning, setTimeLeft, timeLeft, initialMilliseconds} = props;

    
    const toggleTimer = () => {
        if (timeLeft > 0) {
            setIsRunning(!isRunning);
        }
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(initialMilliseconds);
    };

    return (
        <div className="timer-controls">
            <button
            onClick={toggleTimer}
            disabled={isFinished}
            className={`timer-btn timer-btn-play`}
            aria-label={isRunning ? 'Mettre en pause' : 'Démarrer le timer'}
            >
                {isRunning ? <Pause /> : <Play />}
            </button>

            <button
                onClick={resetTimer}
                className="timer-btn timer-btn-reset"
                aria-label="Réinitialiser le timer"
                >
                <RotateCcw />
            </button>
        </div>
    )
}

export default Controls