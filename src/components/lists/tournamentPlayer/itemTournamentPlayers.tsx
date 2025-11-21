import { usePlayerStore } from '@/src/stores/usePlayerStore';
import { Player } from '@/src/types/player'
import DeleteIcon from '@mui/icons-material/Delete';

function ItemTournamentPlayers(props: Player) {
    const {pseudo, id} = props;
    const {removePlayerFromPlay} = usePlayerStore();

    return (
        <li className='itemPlayerTournament'>
            <h3 className='text-center'>{pseudo}</h3>
            <button className='btn-icon danger' onClick={() => removePlayerFromPlay(id)}>
                <DeleteIcon />
            </button>
        </li>
    )
}

export default ItemTournamentPlayers