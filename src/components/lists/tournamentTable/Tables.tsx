import { TablesProps } from '@/src/types/tournament';
import ItemTournamentTable from './ItemTournamentTable';

function Tables({ matchs }: TablesProps) {
  return (
    <ul>
      {matchs.map((match, i) =>
      match[1] !== null && <ItemTournamentTable key={i} match={match} />)}
    </ul>
  )
}

export default Tables
