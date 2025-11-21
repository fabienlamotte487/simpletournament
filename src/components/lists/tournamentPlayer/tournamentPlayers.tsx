'use client'

import { usePlayerStore } from "@/src/stores/usePlayerStore"
import ItemTournamentPlayers from "./itemTournamentPlayers";

function TournamentPlayers() {
    const {players} = usePlayerStore();
    const tournamentPlayers = players.filter(p => p.currentPlayer);

    if(tournamentPlayers.length === 0)
    {
        return 
    }
    
    return (
        <div>
            <h2>{tournamentPlayers.length} participant{tournamentPlayers.length > 1 ? "s" : ""}</h2>
            <ul>
                {tournamentPlayers.map(p => <ItemTournamentPlayers key={p.id} {...p} />)}
            </ul>
        </div>
    )
}

export default TournamentPlayers