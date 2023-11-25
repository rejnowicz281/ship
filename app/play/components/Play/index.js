"use client";

import Board from "@/components/Board";
import { useEffect, useState } from "react";
import generateRandomShips from "../../../../lib/generateRandomShips";
import css from "./index.module.css";
import getLegalShots from "./lib/getLegalShots";

export default function Play({ initialPlayerShips }) {
    const [playerShips, setPlayerShips] = useState(initialPlayerShips);
    const [computerShips, setComputerShips] = useState(generateRandomShips());
    const [computerMisses, setComputerMisses] = useState([]);
    const [playerMisses, setPlayerMisses] = useState([]);
    const [win, setWin] = useState(null);

    useEffect(() => {
        const playerShipsSunk = playerShips.every((ship) => ship.cells.every((cell) => cell.hit));

        if (playerShipsSunk) setWin("computer");
    }, [playerShips]);

    useEffect(() => {
        const computerShipsSunk = computerShips.every((ship) => ship.cells.every((cell) => cell.hit));

        if (computerShipsSunk) setWin("player");
    }, [computerShips]);

    function shoot(shooter = "player", random = false, initial_row = 0, initial_column = 0) {
        const misses = shooter == "player" ? playerMisses : computerMisses;
        const setMisses = shooter == "player" ? setPlayerMisses : setComputerMisses;
        const opponentShips = shooter == "player" ? computerShips : playerShips;
        const setOpponentShips = shooter == "player" ? setComputerShips : setPlayerShips;

        const legal_shots = getLegalShots(misses, opponentShips);

        if (legal_shots.length === 0) return; // if there are no legal shots available, don't shoot (this should never happen)

        const cell_shot =
            // if shooter is computer or the shot is specified as random, get a random cell
            // if shot is not random, get the cell that was given in params (initial_row, initial_column)
            shooter == "computer" || random
                ? legal_shots[Math.floor(Math.random() * legal_shots.length)]
                : legal_shots.find((shot) => shot.row === initial_row && shot.column === initial_column);

        // check if cell_shot is not undefined (only check if it's not a random shot, since those always return a cell)
        if (!random && !cell_shot) return;

        const { row, column, occupied } = cell_shot; // get the row, column and occupied status of the cell that was shot

        if (occupied) {
            setOpponentShips((prev) => {
                return prev.map((ship) => {
                    const updatedCells = ship.cells.map((cell) => {
                        if (cell.row === row && cell.column === column) return { ...cell, hit: true };
                        // if the cell is the one that was shot, return the cell with hit set to true

                        return cell;
                    });
                    return { ...ship, cells: updatedCells };
                });
            });
        } else setMisses((prev) => [...prev, { row, column }]);

        if (shooter == "player") shoot("computer", true); // make the computer shoot after the player
    }

    return (
        <div className={css.container}>
            <div>
                <h2>your board</h2>
                <Board ships={playerShips} showOccupied={true} misses={computerMisses} />
            </div>
            <div>
                <h2>computer board</h2>
                <Board
                    onCellClick={win ? undefined : (row, column) => shoot("player", false, row, column)}
                    ships={computerShips}
                    showOccupied={true}
                    misses={playerMisses}
                />
                {win ? (
                    <h2>{win === "player" ? "you win!" : win === "computer" ? "you lose :(" : null}</h2>
                ) : (
                    <button onClick={() => shoot("player", true)}>random shot</button>
                )}
            </div>
        </div>
    );
}
