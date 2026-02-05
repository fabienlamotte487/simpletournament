import { Player } from "@/types/player";
import { TournamentPlayer } from "@/types/tournament";

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