import { TournamentPlayerPair } from '@/src/types/tournament';
import Image from 'next/image';

function ItemTournamentClassementPlayer(props: TournamentPlayerPair) {
  const player1 = props[0];
  const player2 = props[1];

  return (
    <li className='tab-item'>
      <PlayerPresentation pseudo={player1.pseudo} matchpoints={player1.matchPoints} place="LEFT" />
      <Image src="/svg/sword.svg" height={50} width={50} alt="" />
      {player2 ? <PlayerPresentation pseudo={player2.pseudo} matchpoints={player2.matchPoints} place="RIGHT" /> 
      : <div>BYE</div>}
    </li>
  )
}

function PlayerPresentation(props: {pseudo: string, matchpoints: number, place: "LEFT" | "RIGHT"}){
  const {pseudo, matchpoints, place} = props;

  return (
    <div>
      {place === "RIGHT" && <span>{matchpoints} -</span>}
      <div>{pseudo}</div>
      {place === "LEFT" && <span>- {matchpoints}</span>}
    </div>
  )
}

export default ItemTournamentClassementPlayer