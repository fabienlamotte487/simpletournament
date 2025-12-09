import { useTournamentStore } from '@/src/stores/useTournamentStore';
import ItemTournamentTable from './ItemTournamentTable';

function Tables() {
    const {tournament} = useTournamentStore();

    return tournament?.matchs.map((match, i) => 
      match[1] !== null && <ItemTournamentTable match={match} key={i} />)
}

export default Tables