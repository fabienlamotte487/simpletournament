"use client"
import { useTournamentStore } from "@/stores/useTournamentStore"
import { sortBy } from "@/hooks/sortBy"
import ClassementItem from "./ClassementItem"

function Classement() {
    const {tournament} = useTournamentStore()

    const sortedPlayers = tournament?.players
        ? sortBy(tournament.players, 'matchPoints', 'DESC')
        : []

    return (
        <ul className="classementList">
            {sortedPlayers.map((player, index) =>
                <ClassementItem key={player.id} player={player} index={index} />)}
        </ul>
    )
}

export default Classement