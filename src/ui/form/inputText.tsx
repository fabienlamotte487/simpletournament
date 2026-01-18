import { forwardRef } from "react";
import { InputTextType } from "../../types/form";
import CancelIcon from '@mui/icons-material/Cancel';
import { colors } from "@/src/constants/config";

const InputText = forwardRef<HTMLInputElement, InputTextType>((props, ref) => {
  const {value, label, name, setInput, deletable} = props;

  function deleteContent(){
    setInput("")
  }

  return (
    <div className='f-group flex flex-col '>
      {label && <label htmlFor={name} className='f-label mr-1'>{label}</label>}
      <div className="relative">
        <input 
          type="text"
          className='f-input-text'
          id={name} 
          onChange={e => setInput(e.target.value)}
          name={name}  
          ref={ref}
          value={value} />
          {deletable && value.length > 0 && 
            <button type="button" className="absolute top-1 right-1 z-10" onClick={deleteContent}>
              <CancelIcon sx={{color: colors.danger}} />
            </button>
          }
      </div>
    </div>
  )
});

export default InputText