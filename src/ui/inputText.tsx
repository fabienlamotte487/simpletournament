import { forwardRef } from "react";
import { InputType } from "../types/form";

const InputText = forwardRef<HTMLInputElement, InputType>((props, ref) => {
  const {value, label, name, setInput} = props;

  return (
    <div className='f-group'>
      {label && <label htmlFor={name} className='f-label'>{label}</label>}
      <input 
        type="text"
        className='f-input'
        id={name} 
        onChange={e => setInput(e.target.value)}
        name={name}  
        ref={ref}
        value={value} />
    </div>
  )
});

export default InputText