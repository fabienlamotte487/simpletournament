import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { PlayerState } from '../types/player';

export const usePlayerStore = create<PlayerState>()(
  devtools(
    persist(
      (set, get) => ({
        players: [],
        
        addNewPlayer: (pseudo) => set((state) => ({
          players: [...state.players, {
            id: crypto.randomUUID(),
            pseudo,
            currentPlayer: true,
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
        
        addUserIntoPlay: (id) => set((state) => ({
          players: state.players.map(p => (
            p.id === id ? {...p, currentPlayer: true} : p
          ))
        })),

        removePlayerFromPlay: (id) => set(state => ({
          players: state.players.map(p => (
            p.id === id ? {...p, currentPlayer: false} : p
          ))
        })),
        
        clearPlayers: () => set({ players: [] }),
        
        getPlayerById: (id) => 
          get().players.find(p => p.id === id),
      }),
      {
        name: 'mtg-tournament-players', // LocalStorage key
      }
    )
  )
);