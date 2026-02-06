import { TournamentPlayerPair } from '@/types/tournament'

type ItemProps = {
  match: TournamentPlayerPair;
  onSelect: (playerId: string) => void;
  selectedId: string | null;
  swappable: boolean;
}

function ItemTournamentClassementPlayer({ match, onSelect, selectedId, swappable }: ItemProps) {
  const player1 = match[0];
  const player2 = match[1];

  return (
    <li>
      {swappable ? (
        <button
          type="button"
          className='player-left'
          onClick={() => onSelect(player1.id)}
        >
          <div className='body'>
            <div className={`text-left${selectedId === player1.id ? ' player-selected' : ''}`}>{player1.pseudo}</div>
            <div className='text-left'>{player1.matchPoints} points</div>
          </div>
        </button>
      ) : (
        <div className='player-left'>
          <div className='body'>
            <div className='text-left'>{player1.pseudo}</div>
            <div className='text-left'>{player1.matchPoints} points</div>
          </div>
        </div>
      )}
      <div className='diag-bar'></div>
      {player2 ? (
        swappable ? (
          <button
            type="button"
            className='player-right'
            onClick={() => onSelect(player2.id)}
          >
            <div className='body'>
              <div className={`text-right${selectedId === player2.id ? ' player-selected' : ''}`}>{player2.pseudo}</div>
              <div className='text-right'>{player2.matchPoints} points</div>
            </div>
          </button>
        ) : (
          <div className='player-right'>
            <div className='body'>
              <div className='text-right'>{player2.pseudo}</div>
              <div className='text-right'>{player2.matchPoints} points</div>
            </div>
          </div>
        )
      ) : (
        swappable ? (
          <button
            type="button"
            className='bye'
            onClick={() => onSelect('bye')}
          >
            <span className={selectedId === 'bye' ? 'player-selected' : ''}>BYE</span>
          </button>
        ) : (
          <div className='bye'>BYE</div>
        )
      )}
    </li>
  )
}

export default ItemTournamentClassementPlayer
