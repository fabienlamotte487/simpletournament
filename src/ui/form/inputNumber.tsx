import { InputNumberType } from "@/src/types/form"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveIcon from '@mui/icons-material/Remove';

function InputNumber(props: InputNumberType) {
    const {name, setInput, value, label, range, min = 0, description, addClass, max} = props
    const assembledClass = `${addClass ? addClass + " ": "" }flex flex-col`;

    function handleDecreaseValue(){
        if(value !== min){
            setInput(value - range)
        }
    }

    function handleIncreaseValue(){
        if(value !== max){
            setInput(value + range)
        }
    }

    return (
        <div className={assembledClass}>
            {label && <label className="text-center my-5" htmlFor={name}>{label}</label>}
            <div className="flex">
                <button type="button" className="f-input-number-button" onClick={handleDecreaseValue}><RemoveIcon /></button>
                <input 
                    type="number"
                    className='f-input-number'
                    id={name} 
                    name={name}
                    min={min}
                    max={max}
                    readOnly  
                    value={value} />
                <button type="button" className="f-input-number-button" onClick={handleIncreaseValue}><AddCircleIcon /></button>
            </div>
            {description && <small className="text-center">{description}</small>}
        </div>
    )
}

export default InputNumber