import { TournamentPlayer } from "@/src/types/tournament";

export const apairying = (players:TournamentPlayer[]):[TournamentPlayer, TournamentPlayer | null][] => {
    if (players.length === 0) {
        return [];
    }

    const availablePlayers = [...players];

    const playersSortedByScore = groupByScore(availablePlayers);
    const FlatedPlayers = playersSortedByScore.flat();
    
    const paired = new Set<string>();
    let byeMatch:[TournamentPlayer, null] | null = null;

    if (players.length % 2 === 1) {
        const byePlayer = findByeCandidate(FlatedPlayers);
    
        if (byePlayer) {
            byeMatch = [byePlayer, null];
            paired.add(byePlayer.id);
        }
    }

    const unpaired = FlatedPlayers.filter(p => !paired.has(p.id));
    let matches = pairGroup(unpaired);

    if(byeMatch){
        matches?.push(byeMatch)
    }

    return matches;
}

function groupByScore(players: TournamentPlayer[]): TournamentPlayer[][] {
    const groups = new Map<number, TournamentPlayer[]>();
    
    players.forEach(player => {
        if(player){
            if (!groups.has(player.matchPoints)) {
                groups.set(player.matchPoints, []);
            }
            groups.get(player.matchPoints)!.push(player);
        }
    });

    return Array.from(groups.entries())
        .sort(([scoreA], [scoreB]) => scoreB - scoreA)
        .map(([, group]) => group);
}

function findByeCandidate(players: TournamentPlayer[]): TournamentPlayer | null {
    for (let i = players.length - 1; i >= 0; i--) {
        if (!players[i].hasBye) {
            return players[i];
        }
    }
    
    return null;
}

function canPair(player1: TournamentPlayer, player2: TournamentPlayer): boolean {
  return !player1.opponentIds.includes(player2.id);
}

function pairGroup(players: TournamentPlayer[]): [TournamentPlayer, TournamentPlayer | null][] {
    if (players.length === 0) return [];

    return pairGroupRecursive(players, []);
}

function pairGroupRecursive(
  remaining: TournamentPlayer[],
  currentPairings: [TournamentPlayer, TournamentPlayer][]
): [TournamentPlayer, TournamentPlayer | null][] {
    if (remaining.length === 0) {
        return currentPairings;
    }

    const player1 = remaining[0];
  
    for (let i = 1; i < remaining.length; i++) {
        const player2 = remaining[i];
        
        if (canPair(player1, player2)) {
            const newRemaining = remaining.filter(p => p.id !== player1.id && p.id !== player2.id);
            
            const result = pairGroupRecursive(
                newRemaining,
                [...currentPairings, [player1, player2]]
            );
            
            if (result !== null) {
                return result;
            }
        }
    }

  return [];
}