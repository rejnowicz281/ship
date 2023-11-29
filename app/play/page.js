"use client";

import { useState } from "react";
import Play from "./components/Play";
import Prepare from "./components/Prepare";

export default function PlayPage() {
    const [started, setStarted] = useState(false);
    const [playerShips, setPlayerShips] = useState([]);

    function startGame() {
        setStarted(true);
    }

    function playAgain() {
        setStarted(false);
        setPlayerShips([]);
    }

    if (started) return <Play playAgain={playAgain} playerShips={playerShips} setPlayerShips={setPlayerShips} />;
    else return <Prepare startGame={startGame} ships={playerShips} setShips={setPlayerShips} />;
}
