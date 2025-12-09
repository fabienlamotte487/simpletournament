"use client"

import Tables from "@/src/components/lists/tournamentTable/Tables"
import { useTournamentStore } from "@/src/stores/useTournamentStore";
import CountdownTimer from "@/src/ui/timer/CountdownTimer";

function page() {
  const {tournament} = useTournamentStore();
  if(!tournament){
    return null;
  }

  const milliseconds = tournament?.config.roundDuration * 60 * 1000;

  return (
    <>
      <h2>Ronde n°{tournament?.rounds.length + 1}</h2>
      <CountdownTimer initialMilliseconds={milliseconds} />
      <Tables />
    </>
  )
}

export default page