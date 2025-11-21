import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { Player } from "./player";

export type TournamentConfig = {
    roundNumber: Number;
    roundDuration: Number;
}

export type Tournament = {
  id: string;
  created_at: Timestamp;
  finished_at: Timestamp | null;
  config: TournamentConfig; 
  rounds: [];
  players: Player[];
  finalClassement: Player[];
}

export type TournamentState = {
  tournaments: Tournament[];
  addTournaments: (players: Player[]) => void;
}