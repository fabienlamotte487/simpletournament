"use client"
import { Player } from "@/src/types/player"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Longpressbutton from "@/src/ui/Buttons/LongPressButton/longpressbutton";
import { useRef, useState } from "react";
import { usePlayerStore } from "@/src/stores/usePlayerStore";
import InputText from "@/src/ui/inputText";
import ClearIcon from '@mui/icons-material/Clear';
import { registerPseudo } from "@/src/hooks/registerPseudo";

const ItemPlayer = (props: Player) => {
    const {id, pseudo} = props
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const {removePlayer, updatePlayer} = usePlayerStore();
    const [pseudoEdited, setPseudoEdited] = useState("");
    const [editMode, setEditMode] = useState(false);
    const pseudoEditRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("")

    const edit = (e) => {
        e.preventDefault();
        setErrorMessage("")
        
        const response = registerPseudo(pseudoEdited);
        setErrorMessage(response.message);

        if(response.isValid){
            updatePlayer(id, {pseudo : pseudoEdited})
            setEditMode(false)
            setPseudoEdited("")
        }
    }

    const switchEditMode = () => {
        setEditMode(true)
        pseudoEditRef.current?.focus()
    }

    const suppress = () => {
        removePlayer(id)
    }

    if(editMode){
        return (
            <li>
                <form onSubmit={edit} className="itemPlayer">
                    <div className="flex flex-col">
                        <input 
                            type="text"
                            className='f-input'
                            id="pseudo-edit" 
                            onChange={e => setPseudoEdited(e.target.value)}
                            name="pseudo-edit"  
                            ref={pseudoEditRef}
                            value={pseudoEdited} />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button className="btn-icon" type="submit"><ModeEditIcon /></button>
                        <button className="btn-icon" type="button" onClick={() => setEditMode(false)}><ClearIcon /></button>
                    </div>
                </form>
            </li>
        )
    }

    return (
        <li className="itemPlayer">
            {pseudo}
            <div className="flex gap-2">
                <button className="btn-icon" onClick={() => switchEditMode()}><ModeEditIcon /></button>
                <Longpressbutton 
                    className="btn-icon danger" 
                    delay={500}
                    timerRef={timerRef}
                    handleFunction={suppress}>
                    <DeleteIcon />
                </Longpressbutton>
            </div>
        </li>
    )
}

export default ItemPlayer