import { Player } from "@/src/types/player";
import { TournamentConfig } from "@/src/types/tournament";
import { shufflePlayers } from "../preparePlayers/shufflePlayers";
import { formatPlayer } from "../preparePlayers/formatPlayer";

/**
 * Crée un nouveau tournoi avec les joueurs sélectionnés.
 *
 * @param players - Joueurs participants
 * @param config - Configuration (rondes, durée, points)
 * @param addFunction - Fonction du store pour ajouter le tournoi
 */
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

/**
 * Calcule le nombre de rondes optimal pour un tournoi suisse.
 * Formule : ceil(log2(nombreJoueurs))
 *
 * @param numberPlayer - Nombre de joueurs
 * @returns Nombre de rondes recommandé
 *
 * @example
 * calculRound(8)  // 3 rondes
 * calculRound(16) // 4 rondes
 */
export const calculRound = (numberPlayer: number) => {
    return Math.ceil(Math.log2(numberPlayer));
}