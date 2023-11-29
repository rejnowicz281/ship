"use client";

import Board from "@/components/Board";
import generateRandomShips from "@/lib/generateRandomShips";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./index.module.css";
import getLegalShots from "./lib/getLegalShots";

export default function Play({ playerShips, setPlayerShips }) {
    const queryParams = useSearchParams();

    const smartAI = queryParams.get("smart") !== "false";
    const adjacentAllowed = queryParams.get("adjacent") !== "false";

    const [computerShips, setComputerShips] = useState(generateRandomShips(adjacentAllowed));
    const [computerMisses, setComputerMisses] = useState([]);
    const [playerMisses, setPlayerMisses] = useState([]);
    const [tips, setTips] = useState(null);
    const [win, setWin] = useState(null);

    useEffect(() => {
        const playerShipsSunk = playerShips.every((ship) => ship.cells.every((cell) => cell.hit));

        if (playerShipsSunk) setWin("computer");
    }, [playerShips]);

    // every time a ship is sunk, check if all ships are sunk

    useEffect(() => {
        const computerShipsSunk = computerShips.every((ship) => ship.cells.every((cell) => cell.hit));

        if (computerShipsSunk) setWin("player");
    }, [computerShips]);

    useEffect(() => {
        if (tips) populateTips(); // if tips are shown, update them every time the player shoots
    }, [playerShips, computerShips, playerMisses, computerMisses]);

    function shoot(shooter, random, smart, initial_row = 0, initial_column = 0) {
        const misses = shooter == "player" ? playerMisses : computerMisses;
        const setMisses = shooter == "player" ? setPlayerMisses : setComputerMisses;
        const opponentShips = shooter == "player" ? computerShips : playerShips;
        const setOpponentShips = shooter == "player" ? setComputerShips : setPlayerShips;

        const legal_shots = getLegalShots(misses, opponentShips, smart, adjacentAllowed);

        if (legal_shots.length === 0) return; // if there are no legal shots available, don't shoot (this should never happen)

        const cell_shot =
            // if shot is specified as smart, get a smart cell, else get a random cell
            // if shooter is computer or the shot is specified as random, get a random cell
            // if shot is not random, get the cell that was given in params (initial_row, initial_column)
            smart
                ? legal_shots.find((shot) => shot.smart) || // if there are no smart shots available, shoot randomly
                  legal_shots[Math.floor(Math.random() * legal_shots.length)]
                : shooter == "computer" || random
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

        if (shooter == "player") shoot("computer", true, smartAI); // make the computer shoot after the player
    }

    function populateTips() {
        setTips(getLegalShots(playerMisses, computerShips, true).filter((shot) => shot.smart));
    }

    function resetTips() {
        setTips(null);
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
                    tips={tips}
                    onCellClick={win ? undefined : (row, column) => shoot("player", false, false, row, column)}
                    ships={computerShips}
                    showOccupied={true}
                    misses={playerMisses}
                />
                {win ? (
                    <h2>{win === "player" ? "you win!" : win === "computer" ? "you lose :(" : null}</h2>
                ) : (
                    <>
                        <button onClick={() => shoot("player", true, false)}>random shot</button>
                        <button onClick={() => shoot("player", true, true)}>smart shot</button>
                        <button onClick={() => (tips ? resetTips() : populateTips())}>
                            {tips ? "hide tips" : "show tips"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
