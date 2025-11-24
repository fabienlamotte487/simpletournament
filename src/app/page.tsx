import AddNewPlayer from "@/src/components/forms/addNewPlayer";
import AllPlayers from "@/src/components/lists/allPlayer/allPlayers";
import TournamentPlayers from "../components/lists/tournamentPlayer/tournamentPlayers";
import LinkLaunchTournament from "../ui/Buttons/LinkLaunchTournament";
import { CONFIGURATION } from "../config/paths";
import ShapePage from "../ui/page/ShapePage";

export default function Home() {
  return (
    <ShapePage>
      <AllPlayers />
      <AddNewPlayer />
      <TournamentPlayers />
      <LinkLaunchTournament link={CONFIGURATION}>On passe à la configuration !</LinkLaunchTournament>
    </ShapePage>
  );
}
