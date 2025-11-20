import { ClassNamesProps } from "@emotion/react";
import { ReactNode } from "react";

export type LongPressButtonProps = {
  children: ReactNode;
  delay: number;
  handleFunction: Function;
  className?: string;
  timerRef: NodeJS.Timeout | null;
}