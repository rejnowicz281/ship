"use client";

import Board from "@/components/Board";
import generateShipObject from "@/lib/generateShipObject";
import isShipInvalid from "@/lib/isShipInvalid";
import { useEffect, useState } from "react";
import generateRandomShips from "../../lib/generateRandomShips";
import Play from "./components/Play";

export default function PlayPage() {
    const [started, setStarted] = useState(false);
    const [ships, setShips] = useState([]);
    const [direction, setDirection] = useState("right");

    useEffect(() => {
        if (!started) {
            function directionOnScroll(e) {
                const directions = ["left", "right", "up", "down"];

                let current_direction_index = directions.indexOf(direction);

                if (e.deltaY > 0) {
                    // if scrolling down, change direction clockwise
                    if (current_direction_index === 3) current_direction_index = 0;
                    else current_direction_index++;
                } else {
                    // if scrolling up, change direction counter-clockwise
                    if (current_direction_index === 0) current_direction_index = 3;
                    else current_direction_index--;
                }

                setDirection(directions[current_direction_index]);
            }

            document.addEventListener("wheel", directionOnScroll);

            return () => {
                document.removeEventListener("wheel", directionOnScroll);
            };
        }
    }, [direction, started]);

    function addShip(row, column) {
        if (ships.length < 5) {
            const new_ship = generateShipObject(direction, 5 - ships.length, row, column);

            let invalid = isShipInvalid(new_ship, ships);

            if (!invalid) setShips((ships) => [...ships, new_ship]);
        }
    }

    if (started) return <Play initialPlayerShips={ships} />;
    else
        return (
            <div>
                <h1>place yo ships</h1>
                <button onClick={() => setShips(generateRandomShips())}>random placement</button>
                <button onClick={() => setShips([])}>reset board</button>
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
