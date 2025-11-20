"use client"
import { Player } from "@/src/types/player"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Longpressbutton from "@/src/ui/Buttons/LongPressButton/longpressbutton";
import { useRef, useState } from "react";
import { usePlayerStore } from "@/src/stores/usePlayerStore";
import InputText from "@/src/ui/inputText";
import ClearIcon from '@mui/icons-material/Clear';

const ItemPlayer = (props: Player) => {
    const {id, pseudo} = props
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const {removePlayer, updatePlayer} = usePlayerStore();
    const [pseudoEdited, setPseudoEdited] = useState("");
    const [editMode, setEditMode] = useState(false);
    const pseudoEditRef = useRef<HTMLInputElement>(null);

    const edit = () => {
        updatePlayer(id, {pseudo : pseudoEdited})
        setEditMode(false)
        setPseudoEdited("")
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
            <li className="itemPlayer">
                <input 
                    type="text"
                    className='f-input'
                    id="pseudo-edit" 
                    onChange={e => setPseudoEdited(e.target.value)}
                    name="pseudo-edit"  
                    ref={pseudoEditRef}
                    value={pseudoEdited} />
                <div className="flex gap-2">
                    <button className="btn-icon" onClick={() => edit()}><ModeEditIcon /></button>
                    <button className="btn-icon" onClick={() => setEditMode(false)}><ClearIcon /></button>
                </div>
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