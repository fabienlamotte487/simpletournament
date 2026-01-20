import ItemTournamentTable from './ItemTournamentTable';

function Tables(props:any) {
  const {matchs} = props
  return (
    <ul>
      {matchs.map((match, i) => 
      match[1] !== null && <ItemTournamentTable key={i} match={match} />)}
    </ul>
  ) 

}

export default Tables