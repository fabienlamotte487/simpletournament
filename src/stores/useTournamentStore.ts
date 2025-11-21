import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Tournament, TournamentState } from '../types/tournament';

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

        getCurrentTournament: (): Tournament | undefined => {
          return get().tournaments.reduce<Tournament | undefined>((mostRecent, current) =>
            !mostRecent || current.created_at > mostRecent.created_at ? current : mostRecent
          , undefined);
        },
      }),
      {
        name: 'mtg-tournament-tournaments', // LocalStorage key
      }
    )
  )
);