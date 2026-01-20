import { ReactNode } from "react"

export type shapePageProps = {
    children: ReactNode;
    back?: boolean;
}

export interface TournamentPageProps {
    children: any;
    title: string;
    showRound: boolean;
    showBackButton: boolean;
    link: {
        title: string;
        target: string;
    }
    formSubmit?: boolean;
}