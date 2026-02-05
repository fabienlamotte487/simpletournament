'use client'
import { useTournamentStore } from '@/src/stores/useTournamentStore'
import { HISTORY, HOMEPAGE } from '@/src/config/paths'
import TournamentPage from '@/src/ui/Page/TournamentPage'
import Link from 'next/link'
import { sortBy } from '@/src/hooks/sortBy'

function History() {
    const { tournaments } = useTournamentStore()
    const finishedTournaments = tournaments.filter(t => t.finished_at !== null)

    return (
        <TournamentPage
            showBackButton={false}
            showRound={false}
            title="Historique des tournois"
            link={{ target: HOMEPAGE, title: "Retour à l'accueil" }}>

            {finishedTournaments.length === 0 ? (
                <p>Aucun tournoi terminé</p>
            ) : (
                <ul className="history-list">
                    {finishedTournaments.map(tournament => {
                        const sortedPlayers = sortBy(tournament.players, 'matchPoints', 'DESC')
                        const winner = sortedPlayers[0]
                        const date = new Date(tournament.created_at).toLocaleDateString('fr-FR')

                        return (
                            <li key={tournament.id}>
                                <Link href={`${HISTORY}/${tournament.id}`} className="history-link">
                                    <p>{date}</p>
                                    <p>Vainqueur : {winner?.pseudo ?? 'N/A'}</p>
                                    <p>{tournament.players.length} joueurs</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </TournamentPage>
    )
}

export default History
