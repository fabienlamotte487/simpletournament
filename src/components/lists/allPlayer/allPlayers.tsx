"use client"
import { usePlayerStore } from "@/src/stores/usePlayerStore"
import { Modal } from "../../../ui/modal";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ItemPlayer from "./itemPlayer";
import { sortBy } from "@/src/hooks/sortBy";

function AllPlayers() {
  const {players} = usePlayerStore();
  const [isOpen, setIsOpen] = useState(false);
  const storedPlayer = sortBy(players, "currentPlayer", "DESC")

  if(storedPlayer.length === 0){
    return null
  }

  return (
    <>
      <div className="block flex justify-between items-center">
        <div>
          <h2>Vos joueurs</h2>
          <p>{storedPlayer.length} joueurs</p>
        </div>
        <button className="btn-icon cercled" onClick={() => setIsOpen(true)}><SearchIcon sx={{ fontSize: 20 }} /></button>
      </div>
      <Modal
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title="Liste des joueurs">
        <ul className="listPlayer">
          <p className="info">Cliquez sur un pseudo pour l'ajouter au tournoi</p>
          {storedPlayer.map(player => <ItemPlayer key={player.id} {...player} /> )}
        </ul>
      </Modal>
    </>
  )
}

export default AllPlayers