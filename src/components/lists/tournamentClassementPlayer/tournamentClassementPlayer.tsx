import { useTournamentStore } from "@/stores/useTournamentStore";
import ItemTournamentClassementPlayer from "./itemTournamentClassementPlayer";
import { apairying } from "@/hooks/preparePlayers/apairying";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import { shufflePlayers } from "@/hooks/preparePlayers/shufflePlayers";
import { TournamentPlayerPair } from "@/types/tournament";
import { useState } from "react";

type Props = {
    matchs: TournamentPlayerPair[];
    setMatchs: (matchs: TournamentPlayerPair[]) => void;
}

function TournamentClassementPlayer({ matchs, setMatchs }: Props) {
    const { tournament, updateTournament } = useTournamentStore();
    const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

    if (!tournament || tournament.players.length === 0) {
        return null;
    }

    const isFirstRound = tournament.rounds.length + 1 === 1;

    const handleShuffle = () => {
        if (!isFirstRound) return;

        const shuffledPlayers = shufflePlayers(tournament.players);

        updateTournament(tournament, {
            players: shuffledPlayers
        });

        setMatchs(apairying(shuffledPlayers));
        setSelectedPlayerId(null);
    };

    const handleSelect = (playerId: string) => {
        if (selectedPlayerId === null) {
            setSelectedPlayerId(playerId);
            return;
        }

        if (selectedPlayerId === playerId) {
            setSelectedPlayerId(null);
            return;
        }

        setMatchs(swapPlayers(matchs, selectedPlayerId, playerId));
        setSelectedPlayerId(null);
    };

    return (
        <>
            {isFirstRound && (
                <div className="flex justify-center items-center flex-col">
                    <button
                        className="btn shuffle"
                        type="button"
                        onClick={handleShuffle}
                        title="Mélanger les joueurs"
                    >
                        <ShuffleOnIcon />
                    </button>
                    <p className="text-center text-info">Matraquez le bouton au-dessus pour re-mélanger 😁</p>
                </div>
            )}

            <ul className="playgroundList">
                {matchs.map((p) => {
                    let id = p[0].id;
                    if (p[1]) {
                        id += "-" + p[1].id;
                    }

                    return (
                        <ItemTournamentClassementPlayer
                            match={p}
                            key={id}
                            onSelect={handleSelect}
                            selectedId={selectedPlayerId}
                            swappable={isFirstRound}
                        />
                    );
                })}
            </ul>
        </>
    );
}

function swapPlayers(
    matchs: TournamentPlayerPair[],
    playerId1: string,
    playerId2: string
): TournamentPlayerPair[] {
    const newMatchs = matchs.map(m => [...m] as TournamentPlayerPair);

    let match1Index = -1, pos1 = -1;
    let match2Index = -1, pos2 = -1;

    for (let i = 0; i < newMatchs.length; i++) {
        const m = newMatchs[i];
        if (m[0].id === playerId1) { match1Index = i; pos1 = 0; }
        if (m[1]?.id === playerId1) { match1Index = i; pos1 = 1; }
        if (m[0].id === playerId2) { match2Index = i; pos2 = 0; }
        if (m[1]?.id === playerId2) { match2Index = i; pos2 = 1; }

        // Handle bye selection
        if (playerId1 === 'bye' && m[1] === null) { match1Index = i; pos1 = 1; }
        if (playerId2 === 'bye' && m[1] === null) { match2Index = i; pos2 = 1; }
    }

    if (match1Index === -1 || match2Index === -1) return newMatchs;

    const player1 = pos1 === 1 ? newMatchs[match1Index][1] : newMatchs[match1Index][0];
    const player2 = pos2 === 1 ? newMatchs[match2Index][1] : newMatchs[match2Index][0];

    if (pos1 === 0) {
        newMatchs[match1Index][0] = player2!;
    } else {
        newMatchs[match1Index][1] = player2;
    }

    if (pos2 === 0) {
        newMatchs[match2Index][0] = player1!;
    } else {
        newMatchs[match2Index][1] = player1;
    }

    return newMatchs;
}

export default TournamentClassementPlayer;
