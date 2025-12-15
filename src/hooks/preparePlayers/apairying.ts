import { Player, TournamentPlayer, TournamentPlayerPair } from "@/src/types/tournament";

// Formation du tableau d'appairage sans calcul des points (première ronde du tournoi)
export const blank_apairying = (players: Player[] | TournamentPlayerPair[] | TournamentPlayer[]) => {
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
export const apairying = (players: Player[] | TournamentPlayerPair[] | TournamentPlayer[]) => {
    const tournamentPlayers = [...players];

    return tournamentPlayers;
}