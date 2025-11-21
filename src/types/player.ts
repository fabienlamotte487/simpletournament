import { Ref } from "react";

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
  currentPlayer: boolean;
}

export type PlayerState = {
  players: Player[];
  addPlayer: (pseudo: string) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  addUserIntoPlay: (id: string) => void; 
  removePlayerFromPlay: (id: string) => void;
  clearPlayers: () => void;
  getPlayerById: (id: string) => Player | undefined;
}

export type itemPlayerEditMode = {
  edit: Function;
  setPseudoEdited: Function;
  pseudoEditRef: Ref<HTMLInputElement>;
  pseudoEdited: string;
  errorMessage: string;
  cancelEdit: Function;
}