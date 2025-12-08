import TournamentClassementPlayer from "@/src/components/lists/tournamentClassementPlayer/tournamentClassementPlayer"
import Backbutton from "@/src/ui/Buttons/backbutton"
import CountdownTimer from "@/src/ui/timer/CountdownTimer"
import Timer from "@/src/ui/timer/CountdownTimer"

function page() {
  return (
    <>
        <Backbutton />
        <CountdownTimer initialMilliseconds={50*60*1000} />
        <TournamentClassementPlayer />
    </>
  )
}

export default page