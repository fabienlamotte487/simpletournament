import Classement from "@/src/components/lists/classement/Classement"
import { HOMEPAGE, PLAYGROUND } from "@/src/config/paths"
import TournamentPage from "@/src/ui/Page/TournamentPage"

function page() {
  return (
    <TournamentPage 
      showBackButton={false} 
      showRound={false} 
      title="Classement final du tournoi" 
      link={{target: HOMEPAGE, title: "Retour à l'accueil"}}>
        <Classement />
    </TournamentPage>
  )
}

export default page