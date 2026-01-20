"use client"
import { usePlayerStore } from '@/src/stores/usePlayerStore'
import { LinkLaunchTournementProps } from '@/src/types/buttons'
import { createTournament } from "@/src/hooks/manageTournament";
import { useTournamentStore } from '@/src/stores/useTournamentStore';
import { useRouter } from 'next/navigation';
import { useConfigStore } from '@/src/stores/useConfigStore';
import { PLAYGROUND } from '@/src/config/paths';

const LinkLaunchTournament = (props:LinkLaunchTournementProps) => {
  const {children, link} = props
  const {players} = usePlayerStore();
  const {addTournament, clearUnusedTournaments} = useTournamentStore();    
  const {config} = useConfigStore();
  const gamers = players.filter(p => p.currentPlayer);
  const router = useRouter()

  if(players.filter(p => p.currentPlayer).length < 2){
    return null;
  }

  function launchTournament(){
    clearUnusedTournaments()
    createTournament(gamers, {
      roundNumber: config.roundNumber,
      roundDuration: config.roundTime,
      drawPoints: config.drawPoints,
      winPoints: config.winPoints,
      lossPoints: config.lossPoints
    }, addTournament);

    router.push(PLAYGROUND)
  }

  return (
    <div className="mt-5 flex justify-center">
      <button type="button" onClick={launchTournament} className="btn">{children}</button>
    </div>
  )
}

export default LinkLaunchTournament