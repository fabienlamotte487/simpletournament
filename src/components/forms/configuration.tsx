"use client"

import { usePlayerStore } from "@/src/stores/usePlayerStore";
import { useTournamentStore } from "@/src/stores/useTournamentStore";
import InputNumber from "@/src/ui/form/inputNumber";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HOMEPAGE, PLAYGROUND } from "@/src/config/paths";
import { shufflePlayers } from "@/src/hooks/preparePlayers/shufflePlayers";
import { createTournament } from "@/src/hooks/manageTournament";

function Configuration() {
    const [duration, setDuration] = useState<number>(50);
    const [errors, setErrors] = useState<string[]>([]);
    const [roundNumber, setRoundNumber] = useState<number>(3);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {addTournaments} = useTournamentStore();
    const {players} = usePlayerStore();
    const router = useRouter();
    const gamers = players.filter(p => p.currentPlayer);

    function handleSubmit(e:any){
        e.preventDefault();
        setIsSubmitting(true);
        let errorMessage:string[] = [];
        setErrors(errorMessage);

        try{
            if(!duration || typeof duration !== "number")
            {
                errorMessage.push("Erreur dans l'écriture de la durée d'une ronde");
            }
            if(!roundNumber || typeof roundNumber !== "number")
            {
                errorMessage.push("Erreur dans l'écriture du nombre de rondes");
            }

            if(errorMessage.length > 0){
                setErrors(errorMessage);
                setIsSubmitting(false);
                return;
            }

            createTournament(gamers, {
                roundNumber: roundNumber,
                roundDuration: duration
            }, addTournaments);

            router.push(PLAYGROUND);
        } catch(e) {
            console.error(e);
            setIsSubmitting(false);
        }
    }

    if(gamers.length === 0){
        return <div className="text-center">En attente...</div>;
    }

    return (
        <form className="block d-flex flex-col" onSubmit={handleSubmit}>
            <h2 className="text-center">Configuration du tournoi</h2>
            <InputNumber
                label="Nombre de tours"
                value={roundNumber}
                range={1}
                name="roundNumber"
                min={2}
                setInput={setRoundNumber}
            />
            <InputNumber
                label="Durée d'une manche"
                value={duration}
                range={5}
                min={30}
                name="duration"
                setInput={setDuration}
                description="*Durée exprimée en minutes"
            />

            <div className="flex justify-end mt-10 flex-col">
                {errors && <ul>
                    {errors.map(e => <li className="text-red-500">{e}</li>)}
                </ul>}
                <button className="btn" disabled={isSubmitting} type="submit">Commencer le tournoi</button>
            </div>
        </form>
    )
}

export default Configuration