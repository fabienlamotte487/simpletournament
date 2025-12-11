import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type TournamentPlayers = {
  id: string;
  pseudo: string;
  currentPlayer: boolean;
  matchPoints: number;
  matchWins: number;
  matchLosses: number;
  matchDraw: number;
  opponentIds: TournamentPlayers[];
  hasBye: boolean;
}

export type TournamentPlayerPair = [TournamentPlayers, TournamentPlayers];

export type TournamentConfig = {
  roundNumber: number;
  roundDuration: number;
}

export type Tournament = {
  id: string;
  created_at: Timestamp;
  finished_at: Timestamp | null;
  config: TournamentConfig;
  rounds: [];
  matchs: TournamentPlayerPair[];
  players: TournamentPlayers[];
}

export type TournamentState = {
  tournaments: Tournament[];
  tournament: Tournament | null;
  addTournament: (tournament: Tournament) => void;
  pushRounds: (round: [], tournament: Tournament) => void;
}

export type tournamentTableProps = {
  match: TournamentPlayerPair
}

export type ScoresObject = [string, string |number];

export interface Player {
    playerId: string;
    score: number;
}

export interface CheckResult {
    isValid: boolean;
    message: string;
    data: [];
}