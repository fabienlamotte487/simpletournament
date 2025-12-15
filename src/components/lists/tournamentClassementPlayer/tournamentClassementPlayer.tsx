"use client"

import { useTournamentStore } from "@/src/stores/useTournamentStore";
import ItemTournamentClassementPlayer from "./itemTournamentClassementPlayer";
import { blank_apairying } from "@/src/hooks/preparePlayers/apairying";

function TournamentClassementPlayer() {
    const {tournament} = useTournamentStore();
    if(tournament == null || tournament.players.length === 0){
        return null;
    }

    const matchs = blank_apairying(tournament.players);
    
    return (
        <div className='tab'>
            <div className='tab-header'>
                <h2>Liste des matchs !</h2>
            </div>
            <div className='tab-body'>
                <ul>
                    {matchs.map((p, i) => {
                        let id = p[0].id;
                        if(p[1]){
                            id += "-" + p[1].id;
                        }
                        
                        return <ItemTournamentClassementPlayer {...p} key={id}  />
                    })}
                </ul>
            </div>
        </div>
    )
}

export default TournamentClassementPlayer