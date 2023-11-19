import Cell from "./Cell";
import css from "./index.module.css";

export default function Board({ onCellClick }) {
    const boardCells = [];

    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {
            boardCells.push(<Cell row={row} column={column} onCellClick={onCellClick} key={`${row}${column}`} />);
        }
    }

    return <div className={css.board}>{boardCells}</div>;
}
