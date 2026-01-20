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
          return {config: configValues}
        }),

        resetConfig: () => set((state) => {
            return {
                config: {
                    drawPoints: DRAW_POINTS,
                    winPoints: WIN_POINTS,
                    lossPoints: LOSS_POINTS,
                    roundTime: ROUND_TIME,
                    roundNumber: ROUND_NUMBER
                }
            }
        })
      }),
      {
        name: 'mtg-tournament-config', // LocalStorage key
      }
    )
  )
);