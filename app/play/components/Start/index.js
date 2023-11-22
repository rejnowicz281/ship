"use client";

import Board from "@/components/Board";
import { useEffect, useState } from "react";

export default function Start() {
    const [ships, setShips] = useState([]);
    const [direction, setDirection] = useState("right");

    useEffect(() => {
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
    }, [direction]);

    function addShip(row, column) {
        if (ships.length < 5) {
            let ship_array = [];
            let iter = [...Array(5 - ships.length)];
            let valid = true;

            if (direction == "right") ship_array = iter.map((e, i) => ({ row, column: column + i }));
            else if (direction == "left") ship_array = iter.map((e, i) => ({ row, column: column - i }));
            else if (direction == "up") ship_array = iter.map((e, i) => ({ row: row - i, column }));
            else if (direction == "down") ship_array = iter.map((e, i) => ({ row: row + i, column }));
            // populate ship array based on direction and length, for example [{row: 0, column: 0}, {row: 0, column: 1}, ...]

            ship_array.forEach((cell) => {
                if (
                    cell.row < 0 ||
                    cell.row > 9 ||
                    cell.column < 0 ||
                    cell.column > 9 ||
                    ships.some((ship) => ship.some((e) => e.row == cell.row && e.column == cell.column))
                )
                    // make sure ship is in bounds and not overlapping with other ships
                    valid = false;
            });

            if (valid) setShips((ships) => [...ships, ship_array]);
        }
    }

    return (
        <div>
            <h1>place yo ships</h1>
            <Board onCellClick={addShip} ships={ships} showOccupied={true} />
            {ships.length >= 5 ? (
                <div>
                    you placed all ships <button>Start</button>
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
