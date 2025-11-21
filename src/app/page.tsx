import AddNewPlayer from "@/src/components/forms/addNewPlayer";
import AllPlayers from "@/src/components/lists/allPlayer/allPlayers";
import TournamentPlayers from "../components/lists/tournamentPlayer/tournamentPlayers";
import LinkLaunchTournament from "../ui/Buttons/LinkLaunchTournament";

export default function Home() {
  return (
    <>
      <header>
        <h1>Suisse tournament</h1>
      </header>
      <main>
        <AllPlayers />
        <AddNewPlayer />
        <TournamentPlayers />
        <LinkLaunchTournament>On passe à la configuration !</LinkLaunchTournament>
      </main>
    </>
  );
}
