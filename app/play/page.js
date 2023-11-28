"use client";

import { useState } from "react";
import Play from "./components/Play";
import Prepare from "./components/Prepare";

export default function PlayPage() {
    const [started, setStarted] = useState(false);
    const [playerShips, setPlayerShips] = useState([]);

    if (started) return <Play initialPlayerShips={playerShips} />;
    else return <Prepare startGame={() => setStarted(true)} ships={playerShips} setShips={setPlayerShips} />;
}
