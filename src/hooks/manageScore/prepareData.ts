import { SCORE_CONFIG } from "@/src/config/score";
import { TournamentPlayer, TournamentPlayerPair } from "@/src/types/tournament";

export const prepareData = (matchs: TournamentPlayerPair[], result: []) => {
    let playersUpdated = [];
    let matches = [...matchs];

    for(const [p1, p2] of matchs){
        let player1 = attributePoints(p1, p2, result);
        let player2 = attributePoints(p2, p1, result);

        if(p2 === null){
            playersUpdated.push(player1);
            continue;
        }

        playersUpdated.push(player1, player2);
    }

    return {
        players: playersUpdated,
        matches: matches
    };
}

const attributePoints = (player: TournamentPlayer, opponent: TournamentPlayer, result: []) => {
    if(player === null){
        return;
    }
    if(opponent == null){
        player.matchWins++;
        player.matchPoints += SCORE_CONFIG.VICTORY;
        player.hasBye = true;

        return player;
    }

    player.opponentIds = [...player.opponentIds, opponent.id]

    switch(result[player.pseudo]){
        case 0: player.matchLosses++; player.matchPoints += SCORE_CONFIG.LOSS; break;
        case 1: player.matchDraw++; player.matchPoints += SCORE_CONFIG.TIE; break;
        case 3: player.matchWins++; player.matchPoints += SCORE_CONFIG.VICTORY; break;
    }

    return player;
}