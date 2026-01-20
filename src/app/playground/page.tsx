'use client'
import TournamentClassementPlayer from "@/src/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import { TABLES } from "@/src/config/paths"
import { useTournamentStore } from "@/src/stores/useTournamentStore"
import TournamentPage from "@/src/ui/Page/TournamentPage"

function page() {
  const {tournament, updateTournament, } = useTournamentStore()

  function launchMatchs(){
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