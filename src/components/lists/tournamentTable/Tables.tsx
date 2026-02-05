import { TournamentPlayerPair } from '@/types/tournament';
import ItemTournamentTable from './ItemTournamentTable';

type TablesProps = {
  matchs: TournamentPlayerPair[]
}

function Tables({ matchs }: TablesProps) {
  return (
    <ul>
      {matchs.map((match, i) =>
      match[1] !== null && <ItemTournamentTable key={i} match={match} />)}
    </ul>
  )
}

export default Tables
