import { SCORE_CONFIG } from "@/src/config/score";
import { Player, TournamentPlayer, TournamentPlayerPair } from "@/src/types/tournament";

export const prepareData = (matchs: TournamentPlayerPair, result: []) => {
    let playersUpdated = <TournamentPlayerPair[]>[];
    
    for(const [p1, p2] of matchs){
        let player1 = attributePoints(p1, p2, result);
        let player2 = attributePoints(p2, p1, result);

        playersUpdated.push(player1, player2);
    }
    

    return {playersUpdated};
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

    player.matchPoints += result[player.pseudo];
    player.opponentIds.push(opponent);

    switch(result[player.pseudo]){
        case 0: player.matchLosses++; break;
        case 1: player.matchDraw++; break;
        case 3: player.matchWins++; break;
    }

    return player;
}