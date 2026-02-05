import { tournamentTableProps } from '@/types/tournament';
import InputNumber from '@/ui/Form/inputNumber';
import { useState } from 'react';

function ItemTournamentTable(props:tournamentTableProps) {
    const { match } = props;
    const player1 = match[0];
    const player2 = match[1];
    const [pointPlayer1, setPointPlayer1] = useState(0);
    const [pointPlayer2, setPointPlayer2] = useState(0);

    return (
        <li className='flex gap-2 player-match'>
            <div className='w-full player'>
                {player1.pseudo}
                <InputNumber 
                    value={pointPlayer1}
                    setInput={setPointPlayer1}
                    name={`${player1.pseudo}-score`}
                    range={1} 
                    max={2}
                />
            </div>
            {player2 ? (
                <div className='text-right w-full player'>
                    {player2.pseudo}
                    <InputNumber
                        value={pointPlayer2}
                        setInput={setPointPlayer2}
                        name={`${player2.pseudo}-score`}
                        range={1}
                        max={2}
                    />
                </div>
            ) : (
                <div className='text-right w-full player'>Bye</div>
            )}
        </li>
    )
}

export default ItemTournamentTable