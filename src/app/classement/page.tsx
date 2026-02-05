import Classement from "@/components/lists/classement/Classement"
import { HOMEPAGE } from "@/config/paths"
import TournamentPage from "@/ui/page/TournamentPage"

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