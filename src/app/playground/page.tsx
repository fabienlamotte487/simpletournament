import TournamentClassementPlayer from "@/src/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import { TABLES } from "@/src/config/paths"
import Backbutton from "@/src/ui/Buttons/backbutton"
import Link from "next/link"

function page() {
  return (
    <>
      <Backbutton />
      <TournamentClassementPlayer />
      <Link href={TABLES}>Lancer le tournoi</Link>
    </>
  )
}

export default page