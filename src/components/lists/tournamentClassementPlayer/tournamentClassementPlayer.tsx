"use client"

import { useTournamentStore } from "@/src/stores/useTournamentStore";
import ItemTournamentClassementPlayer from "./itemTournamentClassementPlayer";

function TournamentClassementPlayer() {
    const {tournament} = useTournamentStore();
    
    return (
        <div className='tab'>
            <div className='tab-header'>
                <h2>Liste des matchs !</h2>
            </div>
            <div className='tab-body'>
                <ul>
                    {tournament?.matchs.map((p, i) => {
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