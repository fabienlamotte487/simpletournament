"use client"
import { usePlayerStore } from "@/src/stores/usePlayerStore"
import { Modal } from "../../../ui/modal";
import { useEffect, useState, useMemo } from "react";
import SearchIcon from '@mui/icons-material/Search';
import ItemPlayer from "./itemPlayer";
import { sortBy } from "@/src/hooks/sortBy";
import InputText from "@/src/ui/Form/inputText";

function AllPlayers() {
  const { players } = usePlayerStore();
  const [isOpen, setIsOpen] = useState(false);
  const [researchPlayer, selectResearchPlayer] = useState("");
  
  // ✅ Mémorise storedPlayer pour éviter le recalcul à chaque render
  const storedPlayer = useMemo(() => 
    sortBy(players, "currentPlayer", "DESC"), 
    [players]
  );
  
  const [listSorted, setListSorted] = useState(storedPlayer);

  useEffect(() => {
    if(researchPlayer.length > 0){
      const filtered = storedPlayer.filter(joueur => 
        joueur.pseudo.toLowerCase().startsWith(researchPlayer.toLowerCase())
      )
      setListSorted(filtered)
    } else {
      setListSorted(storedPlayer)
    }
  }, [researchPlayer, storedPlayer])

  if(storedPlayer.length === 0){
    return null
  }

  function closeModal(){
    setIsOpen(false)
    selectResearchPlayer("")
    setListSorted(storedPlayer)
  }

  return (
    <>
      <div className="block flex justify-between items-center">
        <div>
          <h2>Vos joueurs</h2>
          <p>{storedPlayer.length} joueurs</p>
        </div>
        <button className="btn-icon cercled" onClick={() => setIsOpen(true)}>
          <SearchIcon sx={{ fontSize: 20 }} />
        </button>
      </div>
      <Modal
        isOpen={isOpen} 
        onClose={() => closeModal()}
        title="Liste des joueurs">
          <>
            <ul className="listPlayer">
              <InputText
                name='researchPlayer'
                value={researchPlayer}
                label='Rechercher dans la liste:'
                setInput={selectResearchPlayer}
                deletable
              />
              <p className="info">Cliquez sur un pseudo pour l'ajouter au tournoi</p>
              {listSorted.map(player => <ItemPlayer key={player.id} {...player} /> )}
            </ul>
          </>
      </Modal>
    </>
  )
}

export default AllPlayers