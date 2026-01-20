import React from 'react'
import Backbutton from '../Buttons/backbutton';
import TitleRound from '../Title/TitleRound';
import Link from 'next/link';

interface TournamentPageProps {
    children: any;
    title: string;
    link: {
        title: string;
        target: string;
    }
}

function TournamentPage(props: TournamentPageProps) {
    const {children, link, title} = props;

    return (
        <div className='flex flex-col justify-center items-start tournament'>
            <Backbutton />
            <TitleRound />
            <div className='block w-full'>
                <h2 className="text-center">{title}</h2>
                {children}
            </div>
            <div className="flex justify-center items-center w-full mt-5">
                <Link className="btn" href={link.target}>{link.title}</Link>
            </div>
        </div>
    )
}

export default TournamentPage