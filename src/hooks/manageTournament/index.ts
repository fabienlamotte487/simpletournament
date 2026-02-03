import { Player } from "@/src/types/player";
import { TournamentConfig } from "@/src/types/tournament";
import { shufflePlayers } from "../preparePlayers/shufflePlayers";
import { formatPlayer } from "../preparePlayers/formatPlayer";

export const createTournament = (players: Player[], config:TournamentConfig, addFunction: Function) => {
    const participants = players.map(p => formatPlayer(p)); 
    const shuffledPlayers = shufflePlayers(participants); 

    addFunction({
        id: crypto.randomUUID(),
        players: shuffledPlayers,
        config,
        created_at: Date.now(),
        finished_at: null,
        rounds: [],
    });
}

export const calculRound = (numberPlayer: number) => {
    return Math.ceil(Math.log2(numberPlayer));
}