import { Player } from "@/src/types/player";
import { TournamentPlayer } from "@/src/types/tournament";

export const formatPlayer = (player: Player):TournamentPlayer => {
    return {
        id: player.id,
        pseudo: player.pseudo,
        matchPoints: 0,
        matchWins: 0,
        matchLosses: 0,
        matchDraw: 0,
        opponentIds: [],
        hasBye: false
    }
}