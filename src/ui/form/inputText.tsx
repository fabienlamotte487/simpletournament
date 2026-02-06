import { forwardRef } from "react";
import { InputTextType } from "../../types/form";
import CancelIcon from '@mui/icons-material/Cancel';
import { colors } from "@/constants/config";

const InputText = forwardRef<HTMLInputElement, InputTextType>((props, ref) => {
  const {value, label, name, setInput, deletable, classname} = props;
  const classList = `f-input-text ` + classname;

  function deleteContent(){
    setInput("")
  }

  return (
    <div className='f-group flex flex-col '>
      {label && <label htmlFor={name} className='f-label mr-1'>{label}</label>}
      <div className="relative">
        <input
          type="text"
          className={classList}
          id={name}
          onChange={e => setInput(e.target.value)}
          onFocus={e => { if (window.matchMedia('(hover: none)').matches) setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300) }}
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