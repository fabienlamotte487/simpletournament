'use client'
import { TournamentPageProps } from '@/types/page';
import Backbutton from '../buttons/backbutton';
import TitleRound from '../title/TitleRound';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function TournamentPage(props: TournamentPageProps) {
    const {children, link, title, formSubmit, showRound = true, showBackButton = true, clickAction} = props;
    const router = useRouter()

    function handleClick(){
        if(clickAction){
            clickAction()
            router.push(link.target)
        }
    }

    return (
        <div className='flex flex-col justify-center items-start tournament'>
            {showBackButton && <Backbutton />}
            {showRound && <TitleRound />}
            <div className='block w-full'>
                <h2 className="text-center">{title}</h2>
                {children}
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                {formSubmit ? 
                    <button className='btn' type="submit">{link.title}</button>
                    : clickAction ? 
                        <button className='btn' type="button" onClick={handleClick}>{link.title}</button>
                        :
                        <Link className="btn" href={link.target}>{link.title}</Link>
                }
            </div>
        </div>
    )
}

export default TournamentPage