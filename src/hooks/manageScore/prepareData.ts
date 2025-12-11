import { SCORE_CONFIG } from "@/src/config/score";
import { TournamentPlayerPair, TournamentPlayers } from "@/src/types/tournament";

export const prepareData = (matchs: [TournamentPlayerPair], result: []) => {
    let playersUpdated = [];
    let roundSaved = [];
    
    for(const [p1, p2] of matchs){
        let player1 = attributePoints(p1, p2, result);
        let player2 = attributePoints(p2, p1, result);

        roundSaved.push([player1, player2]);
    }

    return {roundSaved, playersUpdated};
}

const attributePoints = (player: TournamentPlayers, opponent: TournamentPlayers, result: []) => {
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
    let results = result[player.pseudo];

    if(results === 0){
        player.matchLosses++;
    }

    if(results === 1){
        player.matchDraw++;
    }

    if(results === 3){
        player.matchWins;
    }

    return player;
}