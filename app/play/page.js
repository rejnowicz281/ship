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
    const [currentShip, setCurrentShip] = useState(null);

    useEffect(() => {
        if (!started) {
            function directionOnScroll(e) {
                const directions = ["right", "down", "left", "up"];

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

    useEffect(() => {
        if (!started) updateCurrentShip(); // update current ship when direction changes
    }, [direction, started]);

    function updateCurrentShip(row = currentShip?.cells[0].row, column = currentShip?.cells[0].column) {
        if (ships.length < 5) {
            const new_ship = generateShipObject(direction, 5 - ships.length, row, column);

            let invalid = isShipInvalid(new_ship, ships);

            if (invalid) new_ship.invalid = true;

            setCurrentShip(new_ship);
        }
    }

    function addCurrentShip() {
        if (currentShip && !currentShip.invalid) {
            setShips((ships) => [...ships, currentShip]);
            setCurrentShip(null);
        }
    }

    if (started) return <Play initialPlayerShips={ships} />;
    else
        return (
            <div>
                <h1>place yo ships</h1>
                <button onClick={() => setShips(generateRandomShips())}>random placement</button>
                <button onClick={() => setShips([])}>reset board</button>
                <Board
                    onCellHover={updateCurrentShip}
                    currentShip={currentShip}
                    onCellClick={addCurrentShip}
                    ships={ships}
                    showOccupied={true}
                />
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
