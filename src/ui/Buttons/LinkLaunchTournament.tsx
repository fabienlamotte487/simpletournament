"use client"
import { usePlayerStore } from '@/stores/usePlayerStore'
import { LinkLaunchTournementProps } from '@/types/buttons'
import { createTournament } from "@/hooks/manageTournament";
import { useTournamentStore } from '@/stores/useTournamentStore';
import { useRouter } from 'next/navigation';
import { useConfigStore } from '@/stores/useConfigStore';
import { PLAYGROUND } from '@/config/paths';

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