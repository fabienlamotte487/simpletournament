"use client"
import Tables from "@/components/lists/tournamentTable/Tables"
import { CLASSEMENT, PLAYGROUND } from "@/config/paths";
import { checkScore } from "@/hooks/manageScore";
import { ScoresObject, Tournament } from "@/types/tournament";
import { prepareData } from "@/hooks/manageScore/prepareData";
import { useTournamentStore } from "@/stores/useTournamentStore";
import TournamentPage from "@/ui/page/TournamentPage";
import CountdownTimer from "@/ui/timer/CountdownTimer";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page() {
  const {tournament, updateTournament} = useTournamentStore();
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const matchs = tournament?.currentRoundMatches ?? [];

  if(!tournament || tournament.currentRoundPlayers.length === 0){
    return null;
  }

  const milliseconds = tournament.config.roundDuration * 60 * 1000;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries()) as ScoresObject;
    const {isValid, message, data} = checkScore(values)

    if(!isValid){
      setSubmitError(message);
      return;
    }
    setIsSubmitting(true);

    const preparedDatas = prepareData(matchs, data);
    const newRound = {
      roundNumber: tournament.rounds.length + 1,
      matches: preparedDatas.matches
    };
    const tournamentData: Partial<Tournament> = {
      players: preparedDatas.players,
      rounds: [...tournament.rounds, newRound]
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
        <CountdownTimer initialMilliseconds={milliseconds} />
        {submitError && <p className="error-message">{submitError}</p>}
        <Tables matchs={matchs} />
      </TournamentPage>
    </form>
  )
}

export default page