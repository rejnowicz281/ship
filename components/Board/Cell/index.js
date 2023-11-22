import css from "./index.module.css";
import generateStyle from "./lib/generateStyle";

export default function Cell({ showOccupied, row, column, onCellClick, ships }) {
    function getStyles() {
        let className = `${css.cell}`;
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
                    // To Do: classes/styles for hit and miss
                    done = true;
                }
            });
        });
        return { className, style };
    }

    const { className, style } = getStyles();

    return (
        <div style={style} className={className} onClick={() => onCellClick(row, column)}>
            {row} {column}
        </div>
    );
}
