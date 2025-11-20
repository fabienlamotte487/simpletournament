import { ReactNode, useRef, useState } from "react";
import { LongPressButtonProps } from "./type";

function Longpressbutton(props: LongPressButtonProps) {
  const {children, delay, handleFunction, className, timerRef} = props;
  const [isPressed, setIsPressed] = useState(false)

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
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
    {children}</button>
  )
}

export default Longpressbutton