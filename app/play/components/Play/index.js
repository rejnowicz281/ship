"use client";

import Board from "@/components/Board";
import { useState } from "react";
import css from "./index.module.css";
import generateRandomShips from "./lib/generateRandomShips";

export default function Play({ playerShips }) {
    const [computerShips, setComputerShips] = useState(generateRandomShips());
    const [misses, setMisses] = useState([]);

    function shoot(row, column) {
        if (misses.some((miss) => miss.row === row && miss.column === column)) return;

        let found = false;

        setComputerShips((prev) => {
            let new_ships = [...prev];

            new_ships.forEach((ship, i) => {
                if (found) return;

                ship.cells.forEach((cell, j) => {
                    if (found) return;

                    if (cell.row === row && cell.column === column) {
                        found = true;

                        if (cell.hit) return prev;
                        else new_ships[i].cells[j].hit = true;
                    }
                });
            });

            if (!found) {
                setMisses((prev) => [...prev, { row, column }]);
                return prev;
            }
            return new_ships;
        });
    }

    return (
        <div className={css.container}>
            <Board ships={playerShips} showOccupied={true} />
            <Board onCellClick={shoot} ships={computerShips} showOccupied={true} misses={misses} />
        </div>
    );
}
