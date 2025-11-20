import AddNewPlayer from "@/src/components/forms/addNewPlayer";
import AllPlayers from "@/src/components/lists/allPlayer/allPlayers";

export default function Home() {
  return (
    <div className="py-2 px-5">
      <header>
        <h1 className="h1">Suisse tournament</h1>
      </header>
      <main>
        <AllPlayers />
        <AddNewPlayer />
      </main>
    </div>
  );
}
