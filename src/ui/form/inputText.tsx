import { forwardRef } from "react";
import { InputTextType } from "../../types/form";

const InputText = forwardRef<HTMLInputElement, InputTextType>((props, ref) => {
  const {value, label, name, setInput} = props;

  return (
    <div className='f-group'>
      {label && <label htmlFor={name} className='f-label mr-1'>{label}</label>}
      <input 
        type="text"
        className='f-input-text'
        id={name} 
        onChange={e => setInput(e.target.value)}
        name={name}  
        ref={ref}
        value={value} />
    </div>
  )
});

export default InputText