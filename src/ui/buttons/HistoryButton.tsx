"use client"

import { HISTORY } from "@/config/paths";
import { useTournamentStore } from "@/stores/useTournamentStore"
import Link from "next/link";

function HistoryButton() {
    const {tournaments} = useTournamentStore()
    const hasHistorycalTournament = tournaments.some(
        t => t.finished_at != null
    );
    
    if(!hasHistorycalTournament){
        return null;
    }

    return (
        <Link href={HISTORY} className="btn-secondary">Historique</Link>
    )
}

export default HistoryButton