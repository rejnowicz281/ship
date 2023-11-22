"use client";

import Board from "@/components/Board";
import { useState } from "react";

export default function PlayPage() {
    const [ships, setShips] = useState([]);

    function addShip(row, column) {
        if (ships.length < 5) {
            if (ships.some((ship) => ship.row == row && ship.column == column)) return null;
            setShips((ships) => [...ships, { row, column }]);
        } else return null;
    }

    return (
        <div>
            <h1>place yo ships</h1>
            <Board onCellClick={addShip} ships={ships} showOccupied={true} />
            {ships.length >= 5 && (
                <div>
                    you placed all ships <button>Start</button>
                </div>
            )}
        </div>
    );
}
