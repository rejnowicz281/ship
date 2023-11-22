import Cell from "./Cell";
import css from "./index.module.css";

export default function Board({ onCellClick, ships, showOccupied }) {
    return (
        <div className={css.board}>
            {[...Array(10)].map((e, row) =>
                [...Array(10)].map((e, column) => (
                    <Cell
                        showOccupied={showOccupied}
                        ships={ships}
                        row={row}
                        column={column}
                        onCellClick={onCellClick}
                        key={`${row}${column}`}
                    />
                ))
            )}
        </div>
    );
}
