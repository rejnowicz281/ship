import Cell from "./Cell";
import css from "./index.module.css";

export default function Board({ onCellClick = () => null, tips, ships = [], showOccupied = true, misses = [] }) {
    return (
        <div className={css.board}>
            {[...Array(10)].map((e, row) =>
                [...Array(10)].map((e, column) => (
                    <Cell
                        tips={tips}
                        showOccupied={showOccupied}
                        ships={ships}
                        row={row}
                        column={column}
                        onCellClick={onCellClick}
                        misses={misses}
                        key={`${row}${column}`}
                    />
                ))
            )}
        </div>
    );
}
