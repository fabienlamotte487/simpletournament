"use client"
import Tables from "@/src/components/lists/tournamentTable/Tables"
import { CLASSEMENT, PLAYGROUND } from "@/src/config/paths";
import { checkScore } from "@/src/hooks/manageScore";
import { prepareData } from "@/src/hooks/manageScore/prepareData";
import { apairying } from "@/src/hooks/preparePlayers/apairying";
import { useTournamentStore } from "@/src/stores/useTournamentStore";
import TournamentPage from "@/src/ui/Page/TournamentPage";
import CountdownTimer from "@/src/ui/Timer/CountdownTimer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMemo } from "react";

function page() {
  const {tournament, updateTournament} = useTournamentStore();
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  if(!tournament || tournament.currentRoundPlayers.length === 0){
    return null;
  }
  
  const matchs =  useMemo(
    () => apairying(tournament.currentRoundPlayers),
    [tournament.currentRoundPlayers]
  );
  const milliseconds = tournament?.config.roundDuration * 60 * 1000;

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const {isValid, message, data} = checkScore(values)

    if(!isValid){
      setSubmitError(message);
      return;
    }
    setIsSubmitting(true);

    const preparedDatas = prepareData(matchs, data);
    const tournamentData = {
      players: preparedDatas.players,
      rounds: [...tournament.rounds, preparedDatas.matches]
    }
    
    if(tournament.rounds.length+1 === tournament.config.roundNumber){
      tournamentData.finished_at = Date.now();
      updateTournament(tournament, tournamentData);
      setTimeout(() => {
        router.replace(CLASSEMENT);
      }, 300)
      return
    }

    updateTournament(tournament, tournamentData);
    setTimeout(() => {
      router.push(PLAYGROUND);
    }, 300)
  }

  return (
    <form onSubmit={onSubmit} className={`write-score-page ${isSubmitting ? "is-leaving" : ""}`}>
      <TournamentPage formSubmit title="Enregistrement des résultats" link={{title: "Enregistrer les résultats", target: CLASSEMENT}}>
        {submitError && <p className="error-message">{submitError}</p>}
        <CountdownTimer initialMilliseconds={milliseconds} />
        <Tables matchs={matchs} />
      </TournamentPage>
    </form>
  )
}

export default page