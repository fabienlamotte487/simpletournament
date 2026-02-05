import { TournamentPlayerPair } from '@/types/tournament'
import Image from 'next/image';

function ItemTournamentClassementPlayer(props: TournamentPlayerPair) {
  const player1 = props[0];
  const player2 = props[1];

  return (
    <li>
      <PlayerPresentation pseudo={player1.pseudo} matchpoints={player1.matchPoints} place="LEFT" />
      <div className='diag-bar'></div>
      {player2 ? 
        <PlayerPresentation pseudo={player2.pseudo} matchpoints={player2.matchPoints} place="RIGHT" /> 
      : <div className='bye'>
          BYE
        </div>}
    </li>
  )
}

function PlayerPresentation(props: {pseudo: string, matchpoints: number, place: "LEFT" | "RIGHT"}){
  const {pseudo, matchpoints, place} = props;

  return (
    <div className={`player-${place.toLowerCase()}`}>
      <div className='body'>
        <div className={`text-${place.toLowerCase()} `}>{pseudo}</div>
        <div className={`text-${place.toLowerCase()} `}>{matchpoints} points</div>
      </div>
    </div>
  )
}

export default ItemTournamentClassementPlayer