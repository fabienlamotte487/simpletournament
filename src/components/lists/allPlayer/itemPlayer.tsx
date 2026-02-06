"use client"
import { Player } from "@/types/player"
import Longpressbutton from "@/ui/buttons/longpressbutton";
import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { registerPseudo } from "@/hooks/registerPseudo";
import { ItemPlayerEditMode } from "./itemPlayerEditMode";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemPlayer = (props: Player) => {
    const {id, pseudo, currentPlayer} = props
    const {deletePlayer, updatePlayer, addPlayer} = usePlayerStore();
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

        if(!response.isValid){
            setErrorMessage(response.message);
            return;
        }

        updatePlayer(id, {pseudo: response.value})
        setEditMode(false)
    }

    const cancelEdit = () => {
        setEditMode(false)
        setPseudoEdited(pseudo)
        setErrorMessage("")
    }

    const suppress = () => {
        deletePlayer(id)
    }

    if(editMode){
        return <ItemPlayerEditMode
            edit={edit}
            setPseudoEdited={setPseudoEdited}
            pseudoEditRef={pseudoEditRef}
            pseudoEdited={pseudoEdited}
            errorMessage={errorMessage}
            cancelEdit={cancelEdit}
        />
    }

    return (
        <li className="itemPlayer py-0">
            {currentPlayer ? 
                <div className="flex flex-col">
                    {pseudo}
                    <small className="italic">Déjà dans le tournoi</small>
                </div>
            : 
                <button className="w-full text-left py-2" type="button" onClick={() => addPlayer(id)}>
                    {pseudo}
                </button>}
            <div className="flex">
                <button className="btn-icon" onClick={() => setEditMode(true)} aria-label="Modifier le pseudo"><ModeEditIcon /></button>
                <Longpressbutton
                    className="btn-icon"
                    delay={500}
                    handleFunction={suppress}
                    ariaLabel="Maintenir pour supprimer le joueur">
                    <DeleteIcon />
                </Longpressbutton>
            </div>
        </li>
    )
}

export default ItemPlayer