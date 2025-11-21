import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { TournamentState } from '../types/tournament';

export const useTournamentStore = create<TournamentState>()(
  devtools(
    persist(
      (set, get) => ({
        tournaments: [],
        
        addTournaments: (players) => set((state) => ({
            tournaments: [...state.tournaments, {
                id: crypto.randomUUID(),
                created_at: Date.now(),
                finished_at: null,
                config: {
                    roundDuration: 0,
                    roundNumber: 0
                },
                rounds: [],
                players: players,
                finalClassement: []
            }]
        })),
      }),
      {
        name: 'mtg-tournament-tournaments', // LocalStorage key
      }
    )
  )
);