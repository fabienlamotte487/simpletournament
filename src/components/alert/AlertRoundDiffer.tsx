"use client"
import { calculRound } from '@/src/hooks/manageTournament'
import { useConfigStore } from '@/src/stores/useConfigStore'
import { usePlayerStore } from '@/src/stores/usePlayerStore'
import Alert from '@/src/ui/Alert/Alert'
import { useEffect, useState } from 'react'

function AlertRoundDiffer() {
    const {config, resetConfig} = useConfigStore()
    const {players} = usePlayerStore()
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    function ajustRoundNumber(){
        let currentPlayers = players.filter(p => p.currentPlayer);
        resetConfig(calculRound(currentPlayers.length))
        closeAlert()
    }

    function closeAlert(){
        console.log("on ferme")
        setIsAlertVisible(false);
    }

    function openAlert(){
        setIsAlertVisible(true);
    }

    useEffect(() => {
        let currentPlayers = players.filter(p => p.currentPlayer);
        if(config.roundNumber !== calculRound(currentPlayers.length)){
            openAlert()
        } else {
            closeAlert()
        }
    }, [config.roundNumber])


    if(!isAlertVisible){
        return null;
    }

    return (
        <div className="alert-round">
            <Alert 
                type="WARNING" 
                text="Le nombre de rondes que vous avez choisi n'est pas cohérent avec le nombre de joueurs sélectionnés." 
                closeAlert={{function: closeAlert, message: "Je comprends les risques"}}
                actionToApply={{function: ajustRoundNumber, message: "Je reviens en arrière"}}
            />
        </div>
    )
}

export default AlertRoundDiffer