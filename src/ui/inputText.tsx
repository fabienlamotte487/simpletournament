import { forwardRef } from "react";

type InputType  = {
  value: string;
  label?: string;
  name: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}

const InputText = forwardRef<HTMLInputElement, InputType>(
  (props, ref = null) => {
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