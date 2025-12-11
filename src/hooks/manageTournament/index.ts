import { Player } from "@/src/types/player";
import { TournamentConfig } from "@/src/types/tournament";
import { blank_apairying } from "../preparePlayers/apairying";
import { shufflePlayers } from "../preparePlayers/shufflePlayers";
import { formatPlayer } from "../preparePlayers/formatPlayer";
import { formatMatch } from "../preparePlayers/formatMatch";

export const createTournament = (players: Player[], config:TournamentConfig, addFunction: Function) => {
    const participants = players.map(p => formatPlayer(p)); 
    const match = players.map(p => formatMatch(p)); 
    const shuffledPlayers = shufflePlayers(match); 
    const apairedPlayers = blank_apairying(shuffledPlayers); 

    addFunction({
        id: crypto.randomUUID(),
        matchs: apairedPlayers,
        players: participants,
        config,
        created_at: Date.now(),
        finished_at: null,
        rounds: [],
    });
}