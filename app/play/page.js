"use client";

import Board from "@/components/Board";
import generateRandomColor from "@/lib/generateRandomColor";
import { useEffect, useState } from "react";
import Play from "./components/Play";

export default function PlayPage() {
    const [started, setStarted] = useState(false);
    const [ships, setShips] = useState([]);
    const [direction, setDirection] = useState("right");

    useEffect(() => {
        if (!started) {
            function directionOnScroll() {
                if (direction == "left") setDirection("right");
                else if (direction == "right") setDirection("up");
                else if (direction == "up") setDirection("down");
                else if (direction == "down") setDirection("left");
            }

            document.addEventListener("wheel", directionOnScroll);

            return () => {
                document.removeEventListener("wheel", directionOnScroll);
            };
        }
    }, [direction, started]);

    function addShip(row, column) {
        if (ships.length < 5) {
            let new_ship = [];
            let x_times = [...Array(5 - ships.length)];

            new_ship = {
                direction,
                color: generateRandomColor(),
                cells: x_times.map((_, i) => ({
                    hit: false,
                    row: direction == "down" ? row + i : direction == "up" ? row - i : row,
                    column: direction == "right" ? column + i : direction == "left" ? column - i : column,
                })), // populate new_ship based on direction and length, for example [{row: 0, column: 0}, {row: 0, column: 1}, ...]
            };

            let invalid = new_ship.cells.some((new_ship_cell) => {
                return (
                    new_ship_cell.row < 0 ||
                    new_ship_cell.row > 9 ||
                    new_ship_cell.column < 0 ||
                    new_ship_cell.column > 9 ||
                    ships.some((ship) =>
                        ship.cells.some(
                            (placed_ship_cell) =>
                                placed_ship_cell.row === new_ship_cell.row &&
                                placed_ship_cell.column === new_ship_cell.column
                        )
                    )
                ); // check if new_ship_cell is already occupied by another ship or is out of bounds
            });

            if (!invalid) setShips((ships) => [...ships, new_ship]);
        }
    }

    if (started) return <Play playerShips={ships} />;
    else
        return (
            <div>
                <h1>place yo ships</h1>
                <Board onCellClick={addShip} ships={ships} showOccupied={true} />
                {ships.length >= 5 ? (
                    <div>
                        you placed all ships <button onClick={() => setStarted(true)}>Start</button>
                    </div>
                ) : (
                    <>
                        <div>current direction: {direction}</div>
                        <div>you have {5 - ships.length} ships left to place</div>
                    </>
                )}
            </div>
        );
}
