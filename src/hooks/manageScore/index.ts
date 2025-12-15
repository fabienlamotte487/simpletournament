import { SCORE_CONFIG } from "@/src/config/score";
import { Player, ScoresObject } from "@/src/types/tournament";

export const checkScore = (scores: ScoresObject) => {
    let restructuredMatch = formatScores(scores);
    return checkMatchs(restructuredMatch);
}

export const formatScores = (scores: ScoresObject) => {
    let arrayScores = Object.entries(scores);
    const result = [];
    
    for(let x = 0; x < arrayScores.length; x += 2){
        let player1 = formatPlayerScore(arrayScores[x]);
        let player2 = formatPlayerScore(arrayScores[x+1]);

        result.push([player1, player2]);
    }

    return result
}

const formatPlayerScore = (score: [string, string | FormDataEntryValue]) => {
    return {
        playerId: score[0].split("-")[0],
        score: parseInt(score[1] as string, 10)
    }
}

const checkMatchs = (matchs: [Player, Player][]) => {
    const data = <any>[];

    for (const [p1, p2] of matchs) {
        const s1 = p1.score;
        const s2 = p2.score;

        // Validation rapide avec early return
        if (s1 > 2 || s2 > 2) {
            return { isValid: false, message: "Il ne peut pas y avoir 3 victoires dans un best of 3 !", data: [] };
        }
        if (s1 < 0 || s2 < 0) {
            return { isValid: false, message: "Il ne peut pas y avoir de score négatif !", data: [] };
        }
        if (s1 === 2 && s2 === 2) {
            return { isValid: false, message: "2 joueurs ne peuvent pas avoir le score le plus haut sur la même table !", data: [] };
        }

        // Attribution directe sans variables intermédiaires
        if (s1 === s2) {
            data[p1.playerId] = SCORE_CONFIG.TIE;
            data[p2.playerId] = SCORE_CONFIG.TIE;
        } else if (s1 > s2) {
            data[p1.playerId] = SCORE_CONFIG.VICTORY;
            data[p2.playerId] = SCORE_CONFIG.LOSS;
        } else {
            data[p1.playerId] = SCORE_CONFIG.LOSS;
            data[p2.playerId] = SCORE_CONFIG.VICTORY;
        }
    }

    return { isValid: true, message: "", data};
};