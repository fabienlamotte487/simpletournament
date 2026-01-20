"use client"

import { useTournamentStore } from "@/src/stores/useTournamentStore";
import ItemTournamentClassementPlayer from "./itemTournamentClassementPlayer";
import { apairying } from "@/src/hooks/preparePlayers/apairying";

function TournamentClassementPlayer() {
    const {tournament} = useTournamentStore();
    if(tournament == null || tournament.players.length === 0){
        return null;
    }

    const matchs = apairying(tournament.players);

    return (
        <ul className="playgroundList">
            {matchs.map((p, i) => {
                let id = p[0].id;
                if(p[1]){
                    id += "-" + p[1].id;
                }
                
                return <ItemTournamentClassementPlayer {...p} key={id}  />
            })}
        </ul>
    )
}

export default TournamentClassementPlayer