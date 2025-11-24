"use client"
import { usePlayerStore } from '@/src/stores/usePlayerStore'
import { LinkLaunchTournementProps } from '@/src/types/buttons'
import Link from 'next/link'

const LinkLaunchTournament = (props:LinkLaunchTournementProps) => {
  const {children, link} = props
  const {players} = usePlayerStore();

  if(players.filter(p => p.currentPlayer).length < 2){
    return null;
  }

  return (
    <div className="mt-5 flex justify-center">
      <Link href={link} className="btn linkLaunch">{children}</Link>
    </div>
  )
}

export default LinkLaunchTournament