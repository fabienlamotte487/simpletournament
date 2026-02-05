import { ClassementItemProps } from "@/types/tournament";

function ClassementItem(props: ClassementItemProps) {
    const {player, index} = props;

    return (
        <li>
            <div>
                <p>{index+1}{index+1 === 1 ? <small>er</small> : <small>e</small>}</p>
                <p>{player.pseudo}</p>
            </div>
            <p>{player.matchPoints} points</p>
        </li>
    )
}

export default ClassementItem