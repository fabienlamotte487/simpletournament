"use client"
import { useTournamentStore } from '@/src/stores/useTournamentStore'

function TitleRound() {
    const {tournament} = useTournamentStore()

    return (
        <h1>Ronde n°{(tournament?.rounds?.length ?? 0) + 1}</h1>
    )
}

export default TitleRound