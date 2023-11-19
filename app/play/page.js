"use client";

import Board from "@/components/Board";
import { useState } from "react";

export default function PlayPage() {
    const [ships, setShips] = useState([]);

    function addShip(row, column) {
        setShips((ships) => {
            return [...ships, { row, column }];
        });
    }

    return (
        <div>
            <h1>place yo ships</h1>
            <Board onCellClick={(row, column) => (ships.length < 5 ? addShip(row, column) : null)} />
            {ships.length >= 5 && (
                <div>
                    you placed all ships <button>Start</button>
                </div>
            )}
        </div>
    );
}
