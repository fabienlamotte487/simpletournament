import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ConfigState } from '../types/config';
import { DRAW_POINTS, LOSS_POINTS, ROUND_NUMBER, ROUND_TIME, WIN_POINTS } from '../constants/config';

export const useConfigStore = create<ConfigState>()(
  devtools(
    persist(
      (set, get) => ({
        config: {
          drawPoints: DRAW_POINTS,
          winPoints: WIN_POINTS,
          lossPoints: LOSS_POINTS,
          roundTime: ROUND_TIME,
          roundNumber: ROUND_NUMBER
        },

        updateConfig: (configValues) => set((state) => {
          return {config: {...state.config, ...configValues}}
        }),

        resetConfig: (roundNumber) => set((state) => {
            const newConfig = {
              drawPoints: DRAW_POINTS,
              winPoints: WIN_POINTS,
              lossPoints: LOSS_POINTS,
              roundTime: ROUND_TIME,
              roundNumber: ROUND_NUMBER
            }

            if(roundNumber){
              newConfig.roundNumber = roundNumber
            } else {
              newConfig.roundNumber = ROUND_NUMBER
            }

            return {
              config: newConfig
            }
        })
      }),
      {
        name: 'mtg-tournament-config', // LocalStorage key
      }
    )
  )
);