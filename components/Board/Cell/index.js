import css from "./index.module.css";
import generateStyle from "./lib/generateStyle";

export default function Cell({ showOccupied, row, column, onCellClick, ships, misses }) {
    function getStyle() {
        if (misses.some((miss) => miss.row === row && miss.column === column))
            return { style: { backgroundColor: "red" } };

        let style = null;
        let done = false;

        ships.forEach((ship) => {
            if (done) return; // if we've already found the ship, don't keep looking

            ship.cells.forEach((cell, i) => {
                if (done) return;

                if (cell.row == row && cell.column == column) {
                    if (showOccupied) {
                        const isLast = i == ship.cells.length - 1;
                        const isFirst = i == 0;

                        style = generateStyle(ship.color, ship.direction, isLast, isFirst);
                    }

                    if (cell.hit) style = { backgroundColor: "black" };

                    done = true;
                }
            });
        });

        return { style };
    }

    const { style } = getStyle();

    return (
        <div style={style} className={css.cell} onClick={() => onCellClick(row, column)}>
            {row} {column}
        </div>
    );
}
