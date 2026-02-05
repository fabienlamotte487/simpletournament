"use client"

import {useEffect, useRef, useState } from "react";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';
import HandshakeIcon from '@mui/icons-material/Handshake';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useConfigStore } from "@/stores/useConfigStore";
import InputNumber from "@/ui/Form/inputNumber";
import CheckIcon from '@mui/icons-material/Check';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { DRAW_POINTS, LOSS_POINTS, ROUND_NUMBER, ROUND_TIME, WIN_POINTS } from "@/constants/config";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { calculRound } from "@/hooks/manageTournament";

function Configuration() {
    const {config, updateConfig, resetConfig} = useConfigStore()
    const { players } = usePlayerStore();
    const [roundNumber, setRoundNumber] = useState<number>(config.roundNumber);
    const [roundDuration, setRoundDuration] = useState<number>(config.roundTime);
    const [winPoints, setWinPoints] = useState<number>(config.winPoints);
    const [lossPoints, setLossPoints] = useState<number>(config.lossPoints);
    const [drawPoints, setDrawPoints] = useState<number>(config.drawPoints);
    const firstChildRef = useRef<HTMLFormElement>(null);
    const [topOffset, setTopOffset] = useState(1000);
    const [isConfigOpened, setIsConfigOpened] = useState(false);
    const currentPlayers = players.filter(p => p.currentPlayer);

    function handleSubmit(e:any){
        e.preventDefault();

        const newConfig = {
            drawPoints: drawPoints,
            winPoints: winPoints,
            lossPoints: lossPoints,
            roundTime: roundDuration,
            roundNumber: roundNumber
        };

        updateConfig(newConfig)
        closeConfig()
    }

    function clearForm(){
        setLossPoints(config.lossPoints);
        setDrawPoints(config.drawPoints);
        setWinPoints(config.winPoints);
        setRoundDuration(config.roundTime);
        setRoundNumber(config.roundNumber);

        closeConfig()
    }

    function resetFromDefaultSettings(){
        setLossPoints(LOSS_POINTS);
        setDrawPoints(DRAW_POINTS);
        setWinPoints(WIN_POINTS);
        setRoundDuration(ROUND_TIME);
        setRoundNumber(calculRound(currentPlayers.length));
        resetConfig(calculRound(currentPlayers.length));
    }

    function openConfig(){
        if(!isConfigOpened){
            setTopOffset(0)
            setIsConfigOpened(true)
        } else {
            if (firstChildRef.current) setTopOffset(firstChildRef.current.offsetHeight)
            setIsConfigOpened(false)
        }
    }

    function closeConfig(){
        if (firstChildRef.current) setTopOffset(firstChildRef.current.offsetHeight)
        setIsConfigOpened(false)
    }

    useEffect(() => {
        if (firstChildRef.current) {
            setTopOffset(firstChildRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        if(currentPlayers.length > 1){
            const newRoundNumber = calculRound(currentPlayers.length);
            updateConfig({roundNumber: newRoundNumber});
            setRoundNumber(newRoundNumber);
        } else {
            updateConfig({roundNumber: 0});
            setRoundNumber(0);
        }
    }, [currentPlayers.length]);

    useEffect(() => {
        setRoundNumber(config.roundNumber)
    }, [config.roundNumber])

    return (
        <div className="config-panel" style={{ top: `-${topOffset}px`, transition: "top .3s ease" }}>
            <form className="flex flex-col justify-center items-center p-3 border-b-white border-b-1" onSubmit={handleSubmit} ref={firstChildRef}>
                <p className="text-center">Déterminez le temps et le nombre de rondes</p>
                <ul className="flex flex-wrap gap-2 mb-5">
                    <li>
                        <InputNumber
                            icon={() => <AccessTimeFilledIcon />}
                            value={roundDuration}
                            range={10}
                            name="roundDuration"
                            min={30}
                            setInput={setRoundDuration}
                        />
                    </li>
                    <li>
                        <InputNumber
                            icon={() => <ChangeCircleIcon />}
                            value={roundNumber}
                            range={1}
                            name="roundNumber"
                            min={2}
                            setInput={setRoundNumber}
                        />
                    </li>
                </ul>
                <p className="text-center mb-3">Choisissez les points à attribuer selon le score</p>
                <ul className="flex flex-wrap gap-2 mb-5">
                    <li>
                        <InputNumber
                            icon={() => <EmojiEventsIcon />}
                            value={winPoints}
                            range={1}
                            name="winPoints"
                            setInput={setWinPoints}
                        />
                    </li>
                    <li>
                        <InputNumber
                            icon={() => <CloseIcon />}
                            value={lossPoints}
                            range={1}
                            name="lossPoints"
                            setInput={setLossPoints}
                        />
                    </li>
                    <li>
                        <InputNumber
                            icon={() => <HandshakeIcon />}
                            value={drawPoints}
                            range={1}
                            name="drawPoints"
                            setInput={setDrawPoints}
                        />
                    </li>
                </ul>
                <ul className="flex gap-2">
                    <li><button type="submit" className="text-success"><CheckIcon /></button></li>
                    <li><button type="button" onClick={clearForm} className="text-danger"><CloseIcon /></button></li>
                    <li><button type="button" onClick={resetFromDefaultSettings}><SettingsBackupRestoreIcon /></button></li>
                </ul>
            </form>
            <button onClick={openConfig}>
                <ul className="flex flex-col gap-2">
                    <div className="flex gap-2 justify-center">
                        <li><AccessTimeFilledIcon />{config.roundTime}m</li>
                        <li><ChangeCircleIcon />{config.roundNumber}</li>
                    </div>
                    <div className="flex gap-2 justify-center">
                        <li><EmojiEventsIcon />{config.winPoints}</li>
                        <li><CloseIcon />{config.lossPoints}</li>
                        <li><HandshakeIcon />{config.drawPoints}</li>
                    </div>
                </ul>
                <KeyboardArrowDownIcon />
            </button>
        </div>
    )
}

export default Configuration