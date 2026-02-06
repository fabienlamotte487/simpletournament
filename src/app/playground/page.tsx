'use client'
import TournamentClassementPlayer from "@/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import { TABLES } from "@/config/paths"
import { apairying } from "@/hooks/preparePlayers/apairying"
import { useTournamentStore } from "@/stores/useTournamentStore"
import { TournamentPlayerPair } from "@/types/tournament"
import TournamentPage from "@/ui/page/TournamentPage"
import { useState } from "react"

function page() {
  const {tournament, updateTournament} = useTournamentStore()
  const [matchs, setMatchs] = useState<TournamentPlayerPair[]>(() =>
    tournament ? apairying(tournament.players) : []
  )

  function launchMatchs(){
    if (!tournament) return
    updateTournament(tournament, {
      currentRoundPlayers: tournament.players,
      currentRoundMatches: matchs
    })
  }

  return (
    <TournamentPage clickAction={launchMatchs} title="Présentation des matchs" link={{title: "Débuter la ronde", target: TABLES}}>
      <TournamentClassementPlayer matchs={matchs} setMatchs={setMatchs} />
    </TournamentPage>
  )
}

export default page
