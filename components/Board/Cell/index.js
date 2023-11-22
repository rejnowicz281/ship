import css from "./index.module.css";

export default function Cell({ showOccupied, row, column, onCellClick, ships }) {
    function getClassName() {
        let className = `${css.cell}`;
        ships.forEach((ship) => {
            if (ship.some((e) => e.row == row && e.column == column) && showOccupied) className += ` ${css.occupied}`;
        });

        return className;
    }

    return (
        <div className={getClassName()} onClick={() => onCellClick(row, column)}>
            {row} {column}
        </div>
    );
}
