import { Timestamp } from "next/dist/server/lib/cache-handlers/types";

export type TournamentPlayer = {
  id: string;
  pseudo: string;
  matchPoints: number;
  matchWins: number;
  matchLosses: number;
  matchDraw: number;
  opponentIds: string[];
  hasBye: boolean;
}

export type TournamentConfig = {
  roundNumber: number;
  roundDuration: number;
  drawPoints: number;
  winPoints: number;
  lossPoints: number;
}

export type TournamentPlayerPair = [TournamentPlayer, TournamentPlayer | null];

export type Round = {
  roundNumber: number;
  matches: TournamentPlayerPair[];
}

export type Tournament = {
  id: string;
  created_at: Timestamp;
  finished_at: Timestamp | null;
  config: TournamentConfig;
  rounds: Round[];
  players: TournamentPlayer[];
  currentRoundPlayers: TournamentPlayer[];
  currentRoundMatches: TournamentPlayerPair[];
}

export type TournamentState = {
  tournaments: Tournament[];
  tournament: Tournament | null;
  addTournament: (tournament: Tournament) => void;
  clearUnusedTournaments: () => void;
  updateTournament: (tournament: Tournament, data: Partial<Tournament>) => void;
  deleteTournament: (tournamentId: string) => void;
}

export type tournamentTableProps = {
  match: TournamentPlayerPair
}

export type TablesProps = {
  matchs: TournamentPlayerPair[]
}

export type ScoresObject = Record<string, string | number>;

export type MatchResults = Record<string, number>;

export interface Player {
  playerId: string;
  score: number;
}

export interface CheckResult {
  isValid: boolean;
  message: string;
  data: Player[];
}

export type ClassementItemProps = {
  player: TournamentPlayer;
  index: number;
}
