import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ClearIcon from '@mui/icons-material/Clear';
import { itemPlayerEditMode } from '@/src/types/player';

export const ItemPlayerEditMode = (props: itemPlayerEditMode) => {
    const {edit, setPseudoEdited, pseudoEditRef, pseudoEdited, errorMessage, cancelEdit} = props;

    return (
        <li className="w-auto">
            <form onSubmit={edit} className="itemPlayer">
                <div className="flex flex-col">
                    <input 
                        type="text"
                        className='f-input w-full'
                        id="pseudo-edit" 
                        onChange={e => setPseudoEdited(e.target.value)}
                        name="pseudo-edit"  
                        ref={pseudoEditRef}
                        value={pseudoEdited} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </div>
                <div className="flex gap-2">
                    <button className="btn-icon" type="submit"><ModeEditIcon /></button>
                    <button className="btn-icon" type="button" onClick={() => cancelEdit()}><ClearIcon /></button>
                </div>
            </form>
        </li>
    )
}