import { Player } from "@/src/types/player";

export const formatPlayer = (player: Player) => {
    return {
        id: player.id,
        pseudo: player.pseudo,
        currentPlayer: player.currentPlayer,
        matchPoints: 0,
        matchWins: 0,
        matchLosses: 0,
        matchDraw: 0,
        opponentIds: [],
        hasBye: false
    }
}