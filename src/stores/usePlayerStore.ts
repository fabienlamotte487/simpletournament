import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PlayerState } from '../types/player';

export const usePlayerStore = create<PlayerState>()(
  devtools(
    persist(
      (set, get) => ({
        players: [],
        
        addPlayer: (pseudo) => set((state) => ({
          players: [...state.players, {
            id: crypto.randomUUID(),
            pseudo,
            matchPoints: 0,
            matchWins: 0,
            matchLosses: 0,
            matchDraws: 0,
            gameWins: 0,
            gameLosses: 0,
            opponentIds: [],
            hasBye: false,
            currentPlayer: true
          }]
        })),
        
        removePlayer: (id) => set((state) => ({
          players: state.players.filter(p => p.id !== id)
        })),
        
        updatePlayer: (id, updates) => set((state) => ({
          players: state.players.map(p => 
            p.id === id ? { ...p, ...updates } : p
          )
        })),
        
        clearPlayers: () => set({ players: [] }),
        
        // Selectors
        getPlayerById: (id) => 
          get().players.find(p => p.id === id),
        
        getSortedPlayers: () => {
          const players = get().players;
          // Tri par points puis tiebreakers
          return [...players].sort((a, b) => 
            b.matchPoints - a.matchPoints
          );
        }
      }),
      {
        name: 'mtg-tournament-players', // LocalStorage key
      }
    )
  )
);