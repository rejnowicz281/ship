import Board from "@/components/Board";
import generateAdjacentCells from "@/lib/generateAdjacentCells";
import generateRandomColor from "@/lib/generateRandomColor";
import generateRandomShips from "@/lib/generateRandomShips";
import generateShipCells from "@/lib/generateShipCells";
import generateShipObject from "@/lib/generateShipObject";
import isShipInvalid from "@/lib/isShipInvalid";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRotateRight } from "react-icons/fa6";
import css from "./index.module.css";

export default function Prepare({ ships, setShips, startGame }) {
    const queryParams = useSearchParams();
    const adjacentAllowed = queryParams.get("adjacent") !== "false";

    const [currentShip, setCurrentShip] = useState(null); // current ship being placed

    useEffect(() => {
        if (!currentShip) return;

        function directionOnScroll(e) {
            const directions = ["right", "down", "left", "up"];

            let currentDirectionIndex = directions.indexOf(currentShip.direction);

            if (e.deltaY > 0) {
                // if scrolling down, change direction clockwise
                if (currentDirectionIndex === 3) currentDirectionIndex = 0;
                else currentDirectionIndex++;
            } else {
                // if scrolling up, change direction counter-clockwise
                if (currentDirectionIndex === 0) currentDirectionIndex = 3;
                else currentDirectionIndex--;
            }

            setCurrentShipDirection(directions[currentDirectionIndex]);
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
            const newShip = {
                ...prev,
                direction,
                cells: generateShipCells(5 - ships.length, prev.cells[0].row, prev.cells[0].column, direction),
            };

            if (!adjacentAllowed) newShip.adjacentCells = generateAdjacentCells(newShip.cells);

            const invalid = isShipInvalid(newShip, ships);

            if (invalid) newShip.invalid = true;
            else delete newShip.invalid;

            return newShip;
        });
    }

    function setCurrentShipCells(
        length = 5 - ships.length,
        row = currentShip?.cells[0]?.row,
        column = currentShip?.cells[0]?.column
    ) {
        if (!currentShip) return;

        setCurrentShip((prev) => {
            const newShip = {
                ...prev,
                cells: generateShipCells(length, row, column, prev.direction),
            };

            if (!adjacentAllowed) newShip.adjacentCells = generateAdjacentCells(newShip.cells);

            const invalid = isShipInvalid(newShip, ships);

            if (invalid) newShip.invalid = true;
            else delete newShip.invalid;

            return newShip;
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

        const newShip = generateShipObject("right", length, row, column);

        if (!adjacentAllowed) newShip.adjacentCells = generateAdjacentCells(newShip.cells);

        const invalid = isShipInvalid(newShip, ships);

        if (invalid) newShip.invalid = true;

        setCurrentShip(newShip);
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

    function rotateCurrentShip() {
        if (!currentShip) return;

        const direction =
            currentShip.direction === "right"
                ? "down"
                : currentShip.direction === "down"
                ? "left"
                : currentShip.direction === "left"
                ? "up"
                : "right";

        setCurrentShipDirection(direction);
    }

    return (
        <div className={css.container}>
            <Link href="/">back to menu</Link>

            <h1>place yo ships</h1>
            <button onClick={() => setShips([])}>reset board</button>
            <button onClick={() => setShips(generateRandomShips(adjacentAllowed))}>random placement</button>
            <div className={css["board-wrapper"]}>
                <Board
                    onCellHover={handleCellHover}
                    currentShip={currentShip}
                    onCellClick={addCurrentShip}
                    ships={ships}
                    showOccupied={true}
                />
            </div>
            {ships.length >= 5 ? (
                <>
                    <div>you placed all ships</div>
                    <button onClick={startGame}>Start</button>
                </>
            ) : (
                <>
                    {currentShip ? (
                        <>
                            <div>current direction: {currentShip.direction}</div>
                            <button className={css.rotate} onClick={rotateCurrentShip}>
                                <FaArrowRotateRight />
                                rotate
                            </button>
                        </>
                    ) : (
                        <>
                            <div>hover over a cell to place a ship</div>
                            <div>you can rotate your ship with the mouse wheel</div>
                        </>
                    )}
                    <div>
                        <hr />
                        you have {5 - ships.length} ships left to place
                    </div>
                </>
            )}
        </div>
    );
}
