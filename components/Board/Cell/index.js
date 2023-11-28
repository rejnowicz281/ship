import css from "./index.module.css";
import generateStyle from "./lib/generateStyle";

export default function Cell({ showOccupied, tips, row, column, onClick, onHover, ships, misses, currentShip }) {
    function getStyle() {
        let className = css.cell;
        let style = undefined;

        if (currentShip) {
            const cellIndex = currentShip.cells.findIndex((cell) => cell.row === row && cell.column === column);
            if (cellIndex > -1) {
                const isLast = cellIndex == currentShip.cells.length - 1;
                const isFirst = cellIndex == 0;

                style = generateStyle(currentShip.color, currentShip.direction, isLast, isFirst);

                if (currentShip.invalid) className += ` ${css.invalid}`;

                return { style, className };
            }
        }

        if (tips?.some((tip) => tip.row === row && tip.column === column)) {
            className += ` ${css.tip}`;
            return { style, className };
        }

        if (misses.some((miss) => miss.row === row && miss.column === column)) {
            className += ` ${css.miss}`;
            return { style, className };
        }

        // if we're here, we're not a tip or a miss, so we're either a ship or empty

        let done = false;

        ships.forEach((ship) => {
            if (done) return; // if we've already found the ship, don't keep looking

            ship.cells.forEach((cell, i) => {
                if (done) return;

                if (cell.row == row && cell.column == column) {
                    if (ship.sunk()) className += ` ${css.sunk}`;
                    else if (cell.hit) className += ` ${css.hit}`;

                    if (showOccupied) {
                        const isLast = i == ship.cells.length - 1;
                        const isFirst = i == 0;

                        style = generateStyle(ship.color, ship.direction, isLast, isFirst);
                    }

                    done = true;
                }
            });
        });

        return { style, className };
    }

    const { style, className } = getStyle();

    return (
        <div
            style={style}
            className={className}
            onMouseEnter={() => onHover(row, column)}
            onClick={() => onClick(row, column)}
        >
            {row} {column}
        </div>
    );
}
