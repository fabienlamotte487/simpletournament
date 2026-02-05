import { FormEventHandler, Ref } from "react";

export type Player = {
  id: string;
  pseudo: string;
  currentPlayer: boolean;
}

export type PlayerState = {
  players: Player[];
  addNewPlayer: (pseudo: string) => void;
  deletePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  addPlayer: (id: string) => void; 
  removePlayerFromPlay: (id: string) => void;
  clearPlayers: () => void;
}

export type itemPlayerEditMode = {
  edit: FormEventHandler<HTMLFormElement>;
  setPseudoEdited: (value: string) => void;
  pseudoEditRef: Ref<HTMLInputElement>;
  pseudoEdited: string;
  errorMessage: string;
  cancelEdit: () => void;
}