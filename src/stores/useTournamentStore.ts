import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Tournament, TournamentState } from '../types/tournament';

export const useTournamentStore = create<TournamentState>()(
  devtools(
    persist(
      (set, get) => ({
        tournaments: [],
        tournament: null,
        
        addTournaments: (tournament) => set((state) => {
          return {
            tournaments: [...state.tournaments, tournament],
            tournament: tournament
          }
        }),
      }),
      {
        name: 'mtg-tournament-tournaments', // LocalStorage key
      }
    )
  )
);