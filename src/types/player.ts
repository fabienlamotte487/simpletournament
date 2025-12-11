import { Ref } from "react";

export type Player = {
  id: string;
  pseudo: string;
  currentPlayer: boolean;
}

export type PlayerState = {
  players: Player[];
  addNewPlayer: (pseudo: string) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  addPlayer: (id: string) => void; 
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