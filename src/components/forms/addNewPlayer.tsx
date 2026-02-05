'use client'
import { useRef, useState } from 'react'
import { checkInputValue, sanitizeInput } from '../../hooks/registerPseudo/rules';
import { usePlayerStore } from '@/stores/usePlayerStore'
import { registerPseudo } from '@/hooks/registerPseudo'
import InputText from '@/ui/Form/inputText'
import { ALREADY_TAKEN_PSEUDO } from '@/hooks/registerPseudo/config'
import { calculRound } from '@/hooks/manageTournament'
import { useConfigStore } from '@/stores/useConfigStore'

export default function AddNewPlayer() {
    const [pseudo, setPseudo] = useState("");
    const [error, setError] = useState("");
    const {addNewPlayer, players} = usePlayerStore();
    const ref = useRef<HTMLInputElement>(null);

    function onSubmit(e:any){
        e.preventDefault();
        setError("");

        const response = registerPseudo(pseudo);

        if(!response.isValid){
            setError(response.message);
            return;
        }

        const isPseudoAlreadyTaken = players.some(
            player => player.pseudo.toLowerCase() === response.value.toLowerCase()
        );

        if(isPseudoAlreadyTaken){
            setError(ALREADY_TAKEN_PSEUDO);
            return;
        }

        addNewPlayer(response.value);
        setPseudo("");
        ref.current?.focus();
    }

    return (
        <div className="block">
            <h2>Nouveau joueur</h2>
            <form onSubmit={onSubmit}>
                <InputText
                    name='pseudo'
                    value={pseudo}
                    label='Entrez un pseudo:'
                    setInput={setPseudo}
                    ref={ref}
                />
                {error && <p className="error-message">{error}</p> }
                <button className="btn" type="submit">Ajouter</button>
            </form>
        </div>
    )
}
