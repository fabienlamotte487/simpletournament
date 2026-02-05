import { ProgressBarProps } from "@/types/countDownTimer";

export default function ProgressBar(props:ProgressBarProps) {
    const {isFinished, timeLeft, initialMilliseconds} = props

    return (
        <div className="timer-progress-container">
        <div
          className={`timer-progress-bar ${isFinished ? 'finished' : ''}`}
          style={{
            width: `${(timeLeft / initialMilliseconds) * 100}%`,
          }}
          role="progressbar"
          aria-valuenow={timeLeft}
          aria-valuemin={0}
          aria-valuemax={initialMilliseconds}
        />
      </div>
    )
}
