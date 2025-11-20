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