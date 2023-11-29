import Board from "@/components/Board";
import generateAdjacentCells from "@/lib/generateAdjacentCells";
import generateRandomColor from "@/lib/generateRandomColor";
import generateRandomShips from "@/lib/generateRandomShips";
import generateShipCells from "@/lib/generateShipCells";
import generateShipObject from "@/lib/generateShipObject";
import isShipInvalid from "@/lib/isShipInvalid";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Prepare({ ships, setShips, startGame }) {
    const queryParams = useSearchParams();
    const adjacentAllowed = queryParams.get("adjacent") !== "false";

    const [currentShip, setCurrentShip] = useState(null); // current ship being placed

    useEffect(() => {
        if (!currentShip) return;

        function directionOnScroll(e) {
            const directions = ["right", "down", "left", "up"];

            let current_direction_index = directions.indexOf(currentShip.direction);

            if (e.deltaY > 0) {
                // if scrolling down, change direction clockwise
                if (current_direction_index === 3) current_direction_index = 0;
                else current_direction_index++;
            } else {
                // if scrolling up, change direction counter-clockwise
                if (current_direction_index === 0) current_direction_index = 3;
                else current_direction_index--;
            }

            setCurrentShipDirection(directions[current_direction_index]);
        }

        document.addEventListener("wheel", directionOnScroll);

        return () => document.removeEventListener("wheel", directionOnScroll);
    }, [currentShip]);

    useEffect(() => {
        if (!currentShip) return;

        if (ships.length >= 5) setCurrentShip(null); // if all ships are placed, make sure currentShip is null
        else {
            setCurrentShipColor(generateRandomColor()); // generate new color for next ship
            setCurrentShipCells(); // reset current ship cells
        }
    }, [ships.length]); // on ships.length change, update current ship

    function setCurrentShipDirection(direction) {
        if (!currentShip) return;

        setCurrentShip((prev) => {
            const new_ship = {
                ...prev,
                direction,
                cells: generateShipCells(5 - ships.length, prev.cells[0].row, prev.cells[0].column, direction),
            };

            if (!adjacentAllowed) new_ship.adjacent_cells = generateAdjacentCells(new_ship.cells);

            const invalid = isShipInvalid(new_ship, ships);

            if (invalid) new_ship.invalid = true;
            else delete new_ship.invalid;

            return new_ship;
        });
    }

    function setCurrentShipCells(
        length = 5 - ships.length,
        row = currentShip?.cells[0]?.row,
        column = currentShip?.cells[0]?.column
    ) {
        if (!currentShip) return;

        setCurrentShip((prev) => {
            const new_ship = {
                ...prev,
                cells: generateShipCells(length, row, column, prev.direction),
            };

            if (!adjacentAllowed) new_ship.adjacent_cells = generateAdjacentCells(new_ship.cells);

            const invalid = isShipInvalid(new_ship, ships);

            if (invalid) new_ship.invalid = true;
            else delete new_ship.invalid;

            return new_ship;
        });
    }

    function setCurrentShipColor(color) {
        if (!currentShip) return;

        setCurrentShip({
            ...currentShip,
            color,
        });
    }

    function generateCurrentShip(row, column, length = 5 - ships.length) {
        if (length < 1) return;

        const new_ship = generateShipObject("right", length, row, column);

        if (!adjacentAllowed) new_ship.adjacent_cells = generateAdjacentCells(new_ship.cells);

        const invalid = isShipInvalid(new_ship, ships);

        if (invalid) new_ship.invalid = true;

        setCurrentShip(new_ship);
    }

    function handleCellHover(row, column) {
        if (ships.length >= 5) return; // if all ships are placed, don't do anything

        if (currentShip) setCurrentShipCells(5 - ships.length, row, column);
        else generateCurrentShip(row, column);
    }

    function addCurrentShip() {
        if (!currentShip || currentShip.invalid) return;

        setShips((ships) => [...ships, currentShip]);
    }

    return (
        <div>
            <h1>place yo ships</h1>
            <button onClick={() => setShips(generateRandomShips(adjacentAllowed))}>random placement</button>
            <button onClick={() => setShips([])}>reset board</button>
            <Board
                onCellHover={handleCellHover}
                currentShip={currentShip}
                onCellClick={addCurrentShip}
                ships={ships}
                showOccupied={true}
            />
            {ships.length >= 5 ? (
                <div>
                    you placed all ships <button onClick={startGame}>Start</button>
                </div>
            ) : (
                <>
                    {currentShip && <div>current direction: {currentShip.direction}</div>}
                    <div>you have {5 - ships.length} ships left to place</div>
                </>
            )}
        </div>
    );
}
