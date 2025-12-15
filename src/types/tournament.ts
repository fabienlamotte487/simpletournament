import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type TournamentPlayer = {
  id: string;
  pseudo: string;
  matchPoints: number;
  matchWins: number;
  matchLosses: number;
  matchDraw: number;
  opponentIds: TournamentPlayer[];
  hasBye: boolean;
}

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
  players: TournamentPlayer[];
}

export type TournamentState = {
  tournaments: Tournament[];
  tournament: Tournament | null;
  addTournament: (tournament: Tournament) => void;
  clearUnusedTournaments: () => void;
}

export type tournamentTableProps = {
  match: TournamentPlayerPair
}

export type ScoresObject = [string, string | number];

export interface Player {
  playerId: string;
  score: number;
}

export interface CheckResult {
  isValid: boolean;
  message: string;
  data: [];
}

export type TournamentPlayerPair = [TournamentPlayer, TournamentPlayer];