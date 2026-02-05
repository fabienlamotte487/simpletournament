import { SCORE_CONFIG } from "@/src/config/score";
import { MatchResults, TournamentPlayer, TournamentPlayerPair } from "@/src/types/tournament";

/**
 * Prépare les données de fin de ronde pour mise à jour du tournoi.
 * Attribue les points aux joueurs selon les résultats.
 *
 * @param matchs - Paires de joueurs de la ronde
 * @param result - Résultats des matchs { pseudo: points }
 * @returns Joueurs mis à jour + historique des matchs
 */
export const prepareData = (matchs: TournamentPlayerPair[], result: MatchResults) => {
    let playersUpdated: TournamentPlayer[] = [];
    let matches = [...matchs];

    for(const [p1, p2] of matchs){
        let player1 = attributePoints(p1, p2, result);
        let player2 = attributePoints(p2, p1, result);

        if(p2 === null){
            if(player1) playersUpdated.push(player1);
            continue;
        }

        if(player1) playersUpdated.push(player1);
        if(player2) playersUpdated.push(player2);
    }

    return {
        players: playersUpdated,
        matches: matches
    };
}

const attributePoints = (player: TournamentPlayer | null, opponent: TournamentPlayer | null, result: MatchResults): TournamentPlayer | undefined => {
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
