"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Play from "./components/Play";
import Prepare from "./components/Prepare";

export default function PlayPage() {
    const queryParams = useSearchParams();

    const smart = queryParams.get("smart") !== "false";

    const [started, setStarted] = useState(false);
    const [playerShips, setPlayerShips] = useState([]);

    if (started) return <Play smartAI={smart} playerShips={playerShips} setPlayerShips={setPlayerShips} />;
    else return <Prepare startGame={() => setStarted(true)} ships={playerShips} setShips={setPlayerShips} />;
}
