import { InputNumberType } from "@/src/types/form"
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

function InputNumber(props: InputNumberType) {
    const {icon, name, setInput, value, range, min = 0, max} = props
    
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
        <div className="items-center flex">
            {icon && icon()}
            <button type="button" className="f-input-number-button" onClick={handleDecreaseValue}><ArrowLeftRoundedIcon sx={{ fontSize: 25 }} /></button>
            <input
                type="number"
                className='f-input-number'
                id={name} 
                name={name}
                hidden
                min={min}
                max={max}
                readOnly
                value={value} />
            <p>{value}</p>
            <button type="button" className="f-input-number-button" onClick={handleIncreaseValue}><ArrowRightRoundedIcon sx={{ fontSize: 25 }} /></button>
        </div>
    )
}

export default InputNumber