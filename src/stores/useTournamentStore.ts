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

        clearUnusedTournaments: () => set((state) => {
          const finishedTournaments = state.tournaments.filter(t => t.finished_at != null)

          return {
            tournaments: finishedTournaments,
            tournament: null
          }
        }),

        updateTournament: (tournament, data) => set((state) => {
          const tournamentToUpdate = { ...tournament, ...data };

          return {
            tournaments: state.tournaments.map(t =>
              t.id === tournament.id ? tournamentToUpdate : t
            ),
            tournament: tournamentToUpdate
          }
        }),

        deleteTournament: (tournamentId) => set((state) => ({
          tournaments: state.tournaments.filter(t => t.id !== tournamentId),
          tournament: state.tournament?.id === tournamentId ? null : state.tournament
        }))
      }),
      {
        name: 'mtg-tournament-tournaments', // LocalStorage key
      }
    )
  )
);