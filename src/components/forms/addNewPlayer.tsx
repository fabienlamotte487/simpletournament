'use client'
import { useRef, useState } from 'react'
import { checkInputValue, sanitizeInput } from '../../hooks/registerPseudo/rules';
import { usePlayerStore } from '@/src/stores/usePlayerStore';
import { registerPseudo } from '@/src/hooks/registerPseudo';
import InputText from '@/src/ui/Form/inputText';
import { ALREADY_TAKEN_PSEUDO } from '@/src/hooks/registerPseudo/config';

export default function AddNewPlayer() {
    const [pseudo, setPseudo] = useState("");
    const [error, setError] = useState("");
    const {addNewPlayer} = usePlayerStore();
    const ref = useRef<HTMLInputElement>(null);
    const {players} = usePlayerStore()

    function onSubmit(e:any){
        e.preventDefault();
        setError("");

        const response = registerPseudo(pseudo);
        setError(response.message);

        const isPseudoAlreadyTaken = players.filter(player => player.pseudo === response.value).length >= 1;
        if(isPseudoAlreadyTaken){
            setError(ALREADY_TAKEN_PSEUDO);
            response.isValid = false;
        }

        if(response.isValid){
            addNewPlayer(response.value);
            setPseudo("");
            ref.current?.focus()
        }
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
