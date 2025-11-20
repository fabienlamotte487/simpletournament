"use client"
import { usePlayerStore } from "@/src/stores/usePlayerStore"
import { Modal } from "../../../ui/modal";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ItemPlayer from "./itemPlayer";

function AllPlayers() {
  const {players} = usePlayerStore();
  const [isOpen, setIsOpen] = useState(false);

  if(players.length === 0){
    return null
  }

  return (
    <>
      <div className="block flex justify-between items-center">
        <div>
          <h2 className="h2">Votre liste</h2>
          <p>{players.length} joueurs</p>
        </div>
        <button className="btn-icon" onClick={() => setIsOpen(true)}><SearchIcon /></button>
      </div>
      <Modal
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Liste des joueurs">
        <ul className="listPlayer">
          {players.map(player => <ItemPlayer key={player.id} {...player} /> )}
        </ul>
      </Modal>
    </>
  )
}

export default AllPlayers