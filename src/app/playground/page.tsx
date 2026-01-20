import TournamentClassementPlayer from "@/src/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import { TABLES } from "@/src/config/paths"
import Backbutton from "@/src/ui/Buttons/backbutton"
import TitleRound from "@/src/ui/Title/TitleRound"
import Link from "next/link"

function page() {
  return (
    <div className="flex flex-col justify-center items-start tournament">
      <Backbutton />
      <TitleRound />
      <TournamentClassementPlayer />
      <div className="flex justify-center items-center w-full mt-5">
        <Link className="btn" href={TABLES}>Débuter la ronde</Link>
      </div>
    </div>
  )
}

export default page