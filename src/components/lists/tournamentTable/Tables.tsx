import { useTournamentStore } from '@/src/stores/useTournamentStore';
import ItemTournamentTable from './ItemTournamentTable';
import { apairying } from '@/src/hooks/preparePlayers/apairying';

function Tables() {
  const {tournament} = useTournamentStore();
  if(tournament == null || tournament.players.length === 0){
    return null;
  }
  const matchs = apairying(tournament.players);

  return matchs.map((match, i) => 
    match[1] !== null && <ItemTournamentTable match={match} key={i} />)
}

export default Tables