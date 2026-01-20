import { useTournamentStore } from "@/src/stores/useTournamentStore";
import ItemTournamentClassementPlayer from "./itemTournamentClassementPlayer";
import { apairying } from "@/src/hooks/preparePlayers/apairying";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";
import { shufflePlayers } from "@/src/hooks/preparePlayers/shufflePlayers";

function TournamentClassementPlayer() {
    const { tournament, updateTournament } = useTournamentStore();

    if (!tournament || tournament.players.length === 0) {
        return null;
    }

    const isFirstRound = tournament.rounds.length + 1 === 1;

    const matchs = apairying(tournament.players);

    const handleShuffle = () => {
        if (!isFirstRound) return;

        const shuffledPlayers = shufflePlayers(tournament.players);

        updateTournament(tournament, {
            players: shuffledPlayers
        });
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
                            {...p}
                            key={id}
                        />
                    );
                })}
            </ul>
        </>
    );
}

export default TournamentClassementPlayer;
