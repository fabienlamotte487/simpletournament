import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import { itemPlayerEditMode } from '@/types/player'

export const ItemPlayerEditMode = (props: itemPlayerEditMode) => {
    const {edit, setPseudoEdited, pseudoEditRef, pseudoEdited, errorMessage, cancelEdit} = props;

    return (
        <li className="w-auto">
            <form onSubmit={edit} className="itemPlayer">
                <div className="flex flex-col">
                    <input 
                        type="text"
                        className='f-input-text w-full'
                        id="pseudo-edit" 
                        onChange={e => setPseudoEdited(e.target.value)}
                        name="pseudo-edit"  
                        ref={pseudoEditRef}
                        value={pseudoEdited} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className="flex">
                    <button className="btn-icon" type="submit"><CheckIcon /></button>
                    <button className="btn-icon" type="button" onClick={() => cancelEdit()}><ClearIcon /></button>
                </div>
            </form>
        </li>
    )
}