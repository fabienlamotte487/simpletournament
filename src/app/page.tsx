import AddNewPlayer from "@/components/forms/addNewPlayer";
import AllPlayers from "@/components/lists/allPlayer/allPlayers";
import TournamentPlayers from "../components/lists/tournamentPlayer/tournamentPlayers";
import LinkLaunchTournament from "../ui/buttons/LinkLaunchTournament";
import { HISTORY, PLAYGROUND } from "../config/paths";
import ShapePage from "../ui/page/ShapePage";
import Configuration from "../components/forms/configuration";
import AlertRoundDiffer from "../components/alert/AlertRoundDiffer";
import HistoryButton from "@/ui/buttons/HistoryButton";

export default function Home() {
  return (
    <>
      <header className="mt-30">
        <h1>Mythic Tournament</h1>
      </header>
      <main>
        <ShapePage>
          <HistoryButton />
          <Configuration />
          <AllPlayers />
          <AddNewPlayer />
          <AlertRoundDiffer />
          <TournamentPlayers />
          <LinkLaunchTournament link={PLAYGROUND}>Débuter le tournoi</LinkLaunchTournament>
        </ShapePage>
      </main>
    </>
  );
}
