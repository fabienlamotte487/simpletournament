import { usePlayerStore } from '@/src/stores/usePlayerStore';
import { Player } from '@/src/types/player'
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';

function ItemTournamentPlayers(props: Player) {
    const {pseudo, id} = props;
    const {removePlayerFromPlay} = usePlayerStore();

    return (
        <li className='itemPlayerTournament'>
            <h3 className='text-center'>{pseudo}</h3>
            <button className='btn-icon' onClick={() => removePlayerFromPlay(id)}>
                <ClearIcon />
            </button>
        </li>
    )
}

export default ItemTournamentPlayers