import { Ref } from "react";

export type Config = {
    drawPoints: number;
    winPoints: number;
    lossPoints: number;
    roundTime: number;
    roundNumber: number;
}

export type ConfigState = {
  config: Config;
  updateConfig: (configValues: Config) => void;
  resetConfig: () => void;
}