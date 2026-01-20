import TournamentClassementPlayer from "@/src/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import { TABLES } from "@/src/config/paths"
import TournamentPage from "@/src/ui/Page/TournamentPage"

function page() {
  return (
    <TournamentPage title="Présentation des matchs" link={{title: "Débuter la ronde", target: TABLES}}>
      <TournamentClassementPlayer />
    </TournamentPage>
  )
}

export default page