'use client'
import InputText from '@/src/ui/inputText'
import { useRef, useState } from 'react'
import { checkInputValue, sanitizeInput } from '../../hooks/registerPseudo/rules';
import { usePlayerStore } from '@/src/stores/usePlayerStore';
import { registerPseudo } from '@/src/hooks/registerPseudo';

export default function AddNewPlayer() {
    const [pseudo, setPseudo] = useState("");
    const [error, setError] = useState("");
    const {addPlayer} = usePlayerStore();
    const ref = useRef<HTMLInputElement>(null);

    function onSubmit(e:any){
        e.preventDefault();
        setError("");

        const response = registerPseudo(pseudo);
        setError(response.message);

        if(response.isValid){
            addPlayer(response.value);
            setPseudo("");
            ref.current?.focus()
        }
    }

    return (
        <div className="block">
            <h2 className="h2">Nouveau joueur</h2>
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
