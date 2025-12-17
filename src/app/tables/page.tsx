"use client"
import Tables from "@/src/components/lists/tournamentTable/Tables"
import { CLASSEMENT, PLAYGROUND } from "@/src/config/paths";
import { checkScore } from "@/src/hooks/manageScore";
import { prepareData } from "@/src/hooks/manageScore/prepareData";
import { apairying } from "@/src/hooks/preparePlayers/apairying";
import { useTournamentStore } from "@/src/stores/useTournamentStore";
import CountdownTimer from "@/src/ui/timer/CountdownTimer";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const {tournament, updateTournament} = useTournamentStore();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter()
  if(!tournament || tournament.players.length === 0){
    return null;
  }
  
  const matchs = apairying(tournament.players);
  const milliseconds = tournament?.config.roundDuration * 60 * 1000;
  const isFinalRound = tournament.rounds.length+1 === tournament.config.roundNumber

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

    const preparedDatas = prepareData(matchs, data);
    const tournamentData = {
      players: preparedDatas.players,
      rounds: [...tournament.rounds, preparedDatas.matches]
    }

    updateTournament(tournament, tournamentData);

    if(isFinalRound){
      router.push(CLASSEMENT);
      return;
    }

    router.push(PLAYGROUND);
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