import { ReactNode } from "react";

export type LongPressButtonProps = {
  children: ReactNode;
  delay: number;
  handleFunction: Function;
  className?: string;
  ariaLabel?: string;
}

export type LinkLaunchTournementProps = {
  children: ReactNode;
  link: string
}