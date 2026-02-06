import { LongPressButtonProps } from "@/types/buttons";
import { useRef, useState } from "react";

function Longpressbutton(props: LongPressButtonProps) {
  const {children, delay, handleFunction, className, ariaLabel} = props;
  const [isPressed, setIsPressed] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleStart = () => {
    setIsPressed(true)
    timerRef.current = setTimeout(() => {
      handleFunction()
      setIsPressed(false)
    }, delay)
  }

  const handleEnd = () => {
    setIsPressed(false)
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  return (
    <button
      className={`${className} ${isPressed ? 'opacity-70' : ''}`}
      style={{ userSelect: 'none', WebkitTouchCallout: 'none' }}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={ariaLabel}
    >
    {children}</button>
  )
}

export default Longpressbutton