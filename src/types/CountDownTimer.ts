export type ShowTimerProps = {
    isFinished: boolean;
    timeLeft: number;
}

export type ControlsProps = {
    isFinished: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
    isRunning: boolean;
    setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
    timeLeft: number;
    initialMilliseconds: number;
}

export type ProgressBarProps = {
    isFinished: boolean;
    timeLeft: number;
    initialMilliseconds: number;
}