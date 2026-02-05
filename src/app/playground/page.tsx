'use client'
import TournamentClassementPlayer from "@/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import { TABLES } from "@/config/paths"
import { useTournamentStore } from "@/stores/useTournamentStore"
import TournamentPage from "@/ui/page/TournamentPage"

function page() {
  const {tournament, updateTournament, } = useTournamentStore()

  function launchMatchs(){
    if (!tournament) return
    updateTournament(tournament, {
      currentRoundPlayers: tournament.players
    })
  }

  return (
    <TournamentPage clickAction={launchMatchs} title="Présentation des matchs" link={{title: "Débuter la ronde", target: TABLES}}>
      <TournamentClassementPlayer />
    </TournamentPage>
  )
}

export default page