import { Player } from "@/src/types/player"
import { PlayerMatch } from "@/src/types/tournament"

export const formatMatch = (player: Player):PlayerMatch => {
    return {
        id: player.id,
        pseudo: player.pseudo,
        status: null
    }
}