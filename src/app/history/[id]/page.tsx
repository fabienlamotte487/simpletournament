'use client'
import { useParams, useRouter } from 'next/navigation'
import { useTournamentStore } from '@/stores/useTournamentStore'
import { HISTORY } from '@/config/paths'
import TournamentPage from '@/ui/page/TournamentPage'
import ClassementItem from '@/components/lists/classement/ClassementItem'
import { sortBy } from '@/hooks/sortBy'
import Longpressbutton from '@/ui/buttons/longpressbutton'

function HistoryDetail() {
    const { id } = useParams()
    const router = useRouter()
    const { tournaments, deleteTournament } = useTournamentStore()
    const tournament = tournaments.find(t => t.id === id)

    const handleDelete = () => {
        if (typeof id === 'string') {
            deleteTournament(id)
            router.push(HISTORY)
        }
    }

    if (!tournament) {
        return (
            <TournamentPage
                showBackButton={false}
                showRound={false}
                title="Tournoi introuvable"
                link={{ target: HISTORY, title: "Retour à l'historique" }}>
                <p>Ce tournoi n'existe pas.</p>
            </TournamentPage>
        )
    }

    const sortedPlayers = sortBy(tournament.players, 'matchPoints', 'DESC')
    const date = new Date(tournament.created_at).toLocaleDateString('fr-FR')

    return (
        <TournamentPage
            showBackButton={false}
            showRound={false}
            title={`Classement du ${date}`}
            link={{ target: HISTORY, title: "Retour à l'historique" }}>
            <ul className="classementList">
                {sortedPlayers.map((player, index) => (
                    <ClassementItem key={player.id} player={player} index={index} />
                ))}
            </ul>
            <div className="flex justify-center mt-8">
                <Longpressbutton
                    className="btn-delete"
                    delay={1500}
                    handleFunction={handleDelete}>
                    Maintenir pour supprimer
                </Longpressbutton>
            </div>
        </TournamentPage>
    )
}

export default HistoryDetail
