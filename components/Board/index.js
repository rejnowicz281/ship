import Cell from "./Cell";
import css from "./index.module.css";

export default function Board({
    onCellClick = () => null,
    onCellHover = () => null,
    tips,
    ships = [],
    showOccupied = true,
    misses = [],
    currentShip = null,
}) {
    return (
        <div className={css.board}>
            {[...Array(10)].map((e, row) =>
                [...Array(10)].map((e, column) => (
                    <Cell
                        currentShip={currentShip}
                        onHover={onCellHover}
                        tips={tips}
                        showOccupied={showOccupied}
                        ships={ships}
                        row={row}
                        column={column}
                        onClick={onCellClick}
                        misses={misses}
                        key={`${row}${column}`}
                    />
                ))
            )}
        </div>
    );
}
