import { Player } from "@/src/types/player";
import { TournamentPlayers } from "@/src/types/tournament";

export const formatPlayer = (player: Player):TournamentPlayers => {
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