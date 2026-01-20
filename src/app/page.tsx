import AddNewPlayer from "@/src/components/forms/addNewPlayer";
import AllPlayers from "@/src/components/lists/allPlayer/allPlayers";
import TournamentPlayers from "../components/lists/tournamentPlayer/tournamentPlayers";
import LinkLaunchTournament from "../ui/Buttons/LinkLaunchTournament";
import { PLAYGROUND } from "../config/paths";
import ShapePage from "../ui/Page/ShapePage";
import Configuration from "../components/forms/configuration";

export default function Home() {
  return (
    <>
      <header className="mt-30">
        <h1>Mythic Tournament</h1>
      </header>
      <main>
        <ShapePage>
          <Configuration />
          <AllPlayers />
          <AddNewPlayer />
          <TournamentPlayers />
          <LinkLaunchTournament link={PLAYGROUND}>Débuter le tournoi</LinkLaunchTournament>
        </ShapePage>
      </main>
    </>
  );
}
