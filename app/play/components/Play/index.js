"use client";

import Board from "@/components/Board";
import { useState } from "react";
import generateRandomShips from "../../../../lib/generateRandomShips";
import css from "./index.module.css";

export default function Play({ initialPlayerShips }) {
    const [playerShips, setPlayerShips] = useState(initialPlayerShips);
    const [computerShips, setComputerShips] = useState(generateRandomShips());
    const [computerMisses, setComputerMisses] = useState([]);
    const [playerMisses, setPlayerMisses] = useState([]);

    function shoot(shooter = "player", random = false, initial_row = 0, initial_column = 0) {
        const misses = shooter == "player" ? playerMisses : computerMisses;
        const setMisses = shooter == "player" ? setPlayerMisses : setComputerMisses;
        const setOpponentShips = shooter == "player" ? setComputerShips : setPlayerShips;
        const row = shooter == "computer" || random ? Math.floor(Math.random() * 10) : initial_row;
        const column = shooter == "computer" || random ? Math.floor(Math.random() * 10) : initial_column;

        if (misses.some((miss) => miss.row === row && miss.column === column))
            return random ? shoot(shooter, true, row, column) : null;

        let found = false;
        let no_change = false;
        let has_already_shot = false;

        setOpponentShips((prev) => {
            if (has_already_shot) return prev;

            let new_ships = [...prev];

            new_ships.forEach((ship, i) => {
                if (found) return; // if we already found the ship we don't need to check the rest

                ship.cells.forEach((cell, j) => {
                    if (found) return;

                    if (cell.row === row && cell.column === column) {
                        found = true;

                        if (cell.hit) {
                            no_change = true;
                            if (random) shoot(shooter, true, row, column);
                        } else new_ships[i].cells[j].hit = true;
                    }
                });
            });

            if (!found) setMisses((prev) => [...prev, { row, column }]);

            has_already_shot = true;

            if (no_change) return prev;
            else {
                if (shooter == "player") shoot("computer", true);
                return new_ships;
            }
        });
    }

    return (
        <div className={css.container}>
            <Board ships={playerShips} showOccupied={true} misses={computerMisses} />
            <Board
                onCellClick={(row, column) => shoot("player", false, row, column)}
                ships={computerShips}
                showOccupied={true}
                misses={playerMisses}
            />
        </div>
    );
}
