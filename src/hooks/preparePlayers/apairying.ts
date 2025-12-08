import { TournamentPlayers } from "@/src/types/tournament";
import { Player } from "../../types/player";

// Formation du tableau d'appairage sans calcul des points (première ronde du tournoi)
export const blank_apairying = (players: TournamentPlayers[]) => {
    const tournamentPlayers = [];

    for(let x = 0; x < players.length; x+=2){
        tournamentPlayers.push([
            players[x], 
            (players[x+1] || null)
        ]);
    }

    return tournamentPlayers;
}

// Formation du tableau d'appairage avec calcul des points (première ronde du tournoi)
export const apairying = (players: TournamentPlayers[]) => {
    const tournamentPlayers = [...players];

    return tournamentPlayers;
}