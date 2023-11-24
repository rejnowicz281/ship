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

    function shoot(row, column) {
        if (playerMisses.some((miss) => miss.row === row && miss.column === column)) return;

        let found = false;
        let no_change = false;
        let has_already_shot = false;

        setComputerShips((prev) => {
            if (has_already_shot) return prev;

            let new_ships = [...prev];

            new_ships.forEach((ship, i) => {
                if (found) return; // if we already found the ship we don't need to check the rest

                ship.cells.forEach((cell, j) => {
                    if (found) return;

                    if (cell.row === row && cell.column === column) {
                        found = true;

                        if (cell.hit) no_change = true;
                        else new_ships[i].cells[j].hit = true;
                    }
                });
            });

            if (!found) setPlayerMisses((prev) => [...prev, { row, column }]);

            has_already_shot = true;

            if (no_change) return prev;
            else {
                randomComputerShot();
                return new_ships;
            }
        });
    }

    function randomComputerShot() {
        let row = Math.floor(Math.random() * 10);
        let column = Math.floor(Math.random() * 10);

        if (computerMisses.some((miss) => miss.row === row && miss.column === column)) return randomComputerShot();

        let found = false;
        let no_change = false;
        let has_already_shot = false;

        setPlayerShips((prev) => {
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
                            randomComputerShot();
                        } else new_ships[i].cells[j].hit = true;
                    }
                });
            });

            if (!found) setComputerMisses((prev) => [...prev, { row, column }]);

            has_already_shot = true;

            if (no_change) return prev;
            else return new_ships;
        });
    }

    return (
        <div className={css.container}>
            <Board ships={playerShips} showOccupied={true} misses={computerMisses} />
            <Board onCellClick={shoot} ships={computerShips} showOccupied={true} misses={playerMisses} />
        </div>
    );
}
