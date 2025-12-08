import { Player } from "@/src/types/player";
import { TournamentConfig } from "@/src/types/tournament";
import { blank_apairying } from "../preparePlayers/apairying";
import { shufflePlayers } from "../preparePlayers/shufflePlayers";
import { formatPlayer } from "../preparePlayers/formatPlayer";

export const createTournament = (players: Player[], config:TournamentConfig, addFunction: Function) => {
    const participants = players.map(p => formatPlayer(p));
    const shuffledPlayers = shufflePlayers(participants);
    const apairedPlayers = blank_apairying(shuffledPlayers);

    addFunction({
        id: crypto.randomUUID(),
        created_at: Date.now(),
        finished_at: null,
        config,
        rounds: [],
        matchs: apairedPlayers,
        finalClassement: []
    });
}