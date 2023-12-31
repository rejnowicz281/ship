"use client";

import Board from "@/components/Board";
import generateRandomShips from "@/lib/generateRandomShips";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import css from "./index.module.css";
import getLegalShots from "./lib/getLegalShots";

export default function Play({ playAgain, playerShips, setPlayerShips }) {
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

    function shoot(shooter, random, smart, initialRow = 0, initialColumn = 0) {
        const misses = shooter == "player" ? playerMisses : computerMisses;
        const setMisses = shooter == "player" ? setPlayerMisses : setComputerMisses;
        const opponentShips = shooter == "player" ? computerShips : playerShips;
        const setOpponentShips = shooter == "player" ? setComputerShips : setPlayerShips;

        const legalShots = getLegalShots(misses, opponentShips, smart, adjacentAllowed);

        if (legalShots.length === 0) return; // if there are no legal shots available, don't shoot (this should never happen)

        const cellShot =
            // if shot is specified as smart, get a smart cell, else get a random cell
            // if shooter is computer or the shot is specified as random, get a random cell
            // if shot is not random, get the cell that was given in params (initialRow, initialColumn)
            smart
                ? legalShots.find((shot) => shot.smart) || // if there are no smart shots available, shoot randomly
                  legalShots[Math.floor(Math.random() * legalShots.length)]
                : shooter == "computer" || random
                ? legalShots[Math.floor(Math.random() * legalShots.length)]
                : legalShots.find((shot) => shot.row === initialRow && shot.column === initialColumn);

        // check if cellShot is not undefined (only check if it's not a random shot, since those always return a cell)
        if (!random && !cellShot) return;

        const { row, column, occupied } = cellShot; // get the row, column and occupied status of the cell that was shot

        if (occupied) {
            const shipHit = opponentShips.find((ship) => {
                const cellHit = ship.cells.find((cell) => cell.row === row && cell.column === column);

                if (cellHit) {
                    cellHit.hit = true;
                    return ship; // if the cell was found, mark it as hit and return the ship
                }
            });

            setOpponentShips((prev) => [...prev, shipHit]);

            if (!adjacentAllowed && shipHit.sunk()) {
                shipHit.adjacentCells.forEach((cell) => {
                    setMisses((prev) => {
                        if (prev.some((miss) => miss.row === cell.row && miss.column === cell.column))
                            return prev; // prevent duplicates
                        else return [...prev, { row: cell.row, column: cell.column }]; // add the adjacent cell to the misses array
                    });
                });
            }
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
            <Link href="/">back to menu</Link>
            <div className={css["player-container"]}>
                <h2>computer board</h2>
                <Board
                    tips={tips}
                    onCellClick={win ? undefined : (row, column) => shoot("player", false, false, row, column)}
                    ships={computerShips}
                    showOccupied={false}
                    misses={playerMisses}
                />
                {win ? (
                    <>
                        <h2>{win === "player" ? "you win!" : win === "computer" ? "you lose :(" : null}</h2>
                        <div>
                            <button onClick={playAgain}>play again</button>
                        </div>
                    </>
                ) : (
                    <div>
                        <button onClick={() => shoot("player", true, false)}>random shot</button>
                        <button onClick={() => shoot("player", true, true)}>smart shot</button>
                        <button onClick={() => (tips ? resetTips() : populateTips())}>
                            {tips ? "hide tips" : "show tips"}
                        </button>
                    </div>
                )}
            </div>
            <div className={css["player-container"]}>
                <h2>your board</h2>
                <Board ships={playerShips} showOccupied={true} misses={computerMisses} />
            </div>
        </div>
    );
}
