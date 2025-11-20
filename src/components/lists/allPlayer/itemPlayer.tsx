"use client"
import { Player } from "@/src/types/player"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Longpressbutton from "@/src/ui/Buttons/LongPressButton/longpressbutton";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/src/stores/usePlayerStore";
import ClearIcon from '@mui/icons-material/Clear';
import { registerPseudo } from "@/src/hooks/registerPseudo";

const ItemPlayer = (props: Player) => {
    const {id, pseudo} = props
    const {removePlayer, updatePlayer} = usePlayerStore();
    const [pseudoEdited, setPseudoEdited] = useState(pseudo);
    const [editMode, setEditMode] = useState(false);
    const pseudoEditRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState("")

    // Sync pseudoEdited avec pseudo
    useEffect(() => {
        setPseudoEdited(pseudo)
    }, [pseudo])

    // Focus automatique en mode édition
    useEffect(() => {
        if (editMode && pseudoEditRef.current) {
            pseudoEditRef.current.focus()
        }
    }, [editMode])

    // Gestion de la touche Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setEditMode(false)
                setPseudoEdited(pseudo)
                setErrorMessage("")
            }
        }
        
        if (editMode) {
            document.addEventListener('keydown', handleEscape)
            return () => document.removeEventListener('keydown', handleEscape)
        }
    }, [editMode, pseudo])

    const edit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("")
        
        const response = registerPseudo(pseudoEdited);
        setErrorMessage(response.message);

        if(response.isValid){
            updatePlayer(id, {pseudo : response.value})
            setEditMode(false)
        }
    }

    const cancelEdit = () => {
        setEditMode(false)
        setPseudoEdited(pseudo)
        setErrorMessage("")
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
                            className='f-input w-100'
                            id="pseudo-edit" 
                            onChange={e => setPseudoEdited(e.target.value)}
                            name="pseudo-edit"  
                            ref={pseudoEditRef}
                            value={pseudoEdited} />
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                    <div className="flex gap-2">
                        <button className="btn-icon" type="submit"><ModeEditIcon /></button>
                        <button className="btn-icon" type="button" onClick={cancelEdit}><ClearIcon /></button>
                    </div>
                </form>
            </li>
        )
    }

    return (
        <li className="itemPlayer">
            {pseudo}
            <div className="flex gap-2">
                <button className="btn-icon" onClick={() => setEditMode(true)}><ModeEditIcon /></button>
                <Longpressbutton
                    className="btn-icon danger" 
                    delay={500}
                    handleFunction={suppress}>
                    <DeleteIcon />
                </Longpressbutton>
            </div>
        </li>
    )
}

export default ItemPlayer