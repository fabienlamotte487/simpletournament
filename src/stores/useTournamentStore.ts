import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Tournament, TournamentState } from '../types/tournament';

export const useTournamentStore = create<TournamentState>()(
  devtools(
    persist(
      (set, get) => ({
        tournaments: [],
        tournament: null,
        
        addTournament: (tournament) => set((state) => {
          return {
            tournaments: [...state.tournaments, tournament],
            tournament: tournament
          }
        }),

        pushRounds: (round, tournament) => set((state) => {
          const updatedTournament = 
            {...tournament, 
              rounds: [...tournament.rounds, round ]};

          const updatedTournaments = 
            state.tournaments.map(t => 
              t.id === tournament.id ? updatedTournament : t);
          
          return {
            tournaments: updatedTournaments,
            tournament: updatedTournament
          }
        }),

        clearUnusedTournaments: () => set((state) => {
          const finishedTournaments = state.tournaments.filter(t => t.finished_at != null)

          return {
            tournaments: finishedTournaments,
            tournament: null
          }
        })
      }),
      {
        name: 'mtg-tournament-tournaments', // LocalStorage key
      }
    )
  )
);