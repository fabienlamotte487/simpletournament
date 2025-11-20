export type Player = {
  id: string;
  pseudo: string;
  matchPoints: number;
  matchWins: number;
  matchLosses: number;
  matchDraws: number;
  gameWins: number;
  gameLosses: number;
  opponentIds: string[];  // Liste des adversaires affrontés
  hasBye: boolean;
}

export type PlayerState = {
  // State
  players: Player[];
  
  // Actions
  addPlayer: (pseudo: string) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  clearPlayers: () => void;
  
  // Selectors (optionnel, mais pratique)
  getPlayerById: (id: string) => Player | undefined;
  getSortedPlayers: () => Player[];
}