"use client"

import Tables from "@/src/components/lists/tournamentTable/Tables"
import { checkScore } from "@/src/hooks/manageScore";
import { prepareData } from "@/src/hooks/manageScore/prepareData";
import { useTournamentStore } from "@/src/stores/useTournamentStore";
import CountdownTimer from "@/src/ui/timer/CountdownTimer";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const {tournament} = useTournamentStore();
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");
  if(!tournament){
    return null;
  }
  
  const milliseconds = tournament?.config.roundDuration * 60 * 1000;
  const isFinalRound = tournament.rounds.length + 1 === tournament.config.roundNumber

  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const {isValid, message, data} = checkScore(values)
    
    if(!isValid){
      setErrorMessage(message)
      return;
    }

    const {roundSaved, playersUpdated} = prepareData(tournament.matchs, data);

    // if(isFinalRound){
    //   router.push(CLASSEMENT);
    //   return;
    // }

    // router.push(PLAYGROUND);
  }

  return (
    <>
      <h2>Ronde n°{tournament?.rounds.length + 1}</h2>
      <form onSubmit={onSubmit}>
        <CountdownTimer initialMilliseconds={milliseconds} />
        <Tables />
        <button type="submit">
          {isFinalRound ? "Découvrir le classement final" : "Ronde suivante"}
        </button>
      </form>
    </>
  )
}

export default page