'use client'
import Backbutton from '../Buttons/backbutton';
import TitleRound from '../Title/TitleRound';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TournamentPageProps {
    children: any;
    title: string;
    link: {
        title: string;
        target: string;
    }
    formSubmit?: boolean;
}

function TournamentPage(props: TournamentPageProps) {
    const {children, link, title, formSubmit} = props;

    return (
        <div className='flex flex-col justify-center items-start tournament'>
            <Backbutton />
            <TitleRound />
            <div className='block w-full'>
                <h2 className="text-center">{title}</h2>
                {children}
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                {formSubmit ? 
                    <button className='btn' type="submit">{link.title}</button>
                    :
                    <Link className="btn" href={link.target}>{link.title}</Link>
                }
            </div>
        </div>
    )
}

export default TournamentPage