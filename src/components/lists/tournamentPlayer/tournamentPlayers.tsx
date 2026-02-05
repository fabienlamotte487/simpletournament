'use client'

import { usePlayerStore } from "@/stores/usePlayerStore"
import ItemTournamentPlayers from "./itemTournamentPlayers";

function TournamentPlayers() {
    const {players} = usePlayerStore();
    const tournamentPlayers = players.filter(p => p.currentPlayer);

    if(tournamentPlayers.length === 0)
    {
        return 
    }
    
    return (
        <div className="block">
            <h2>Liste des participants</h2>
            <p>{tournamentPlayers.length} participant{tournamentPlayers.length > 1 ? "s" : ""}</p>
            <div className="pt-2 pb-1">
                <hr></hr>
            </div>
            <ul>
                {tournamentPlayers.map(p => <ItemTournamentPlayers key={p.id} {...p} />)}
            </ul>
        </div>
    )
}

export default TournamentPlayers