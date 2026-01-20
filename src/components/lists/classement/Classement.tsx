"use client"
import { useTournamentStore } from "@/src/stores/useTournamentStore"
import ClassementItem from "./ClassementItem"

function Classement() {
    const {tournament} = useTournamentStore()

    return (
        <ul className="classementList">
            {tournament?.players.map((player, index) => 
                <ClassementItem key={index} player={player} index={index} />)}
        </ul>
    )
}

export default Classement