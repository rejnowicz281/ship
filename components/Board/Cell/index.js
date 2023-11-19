import css from "../index.module.css";

export default function Cell({ row, column, onCellClick }) {
    return (
        <div
            className={css.cell}
            onClick={(e) => {
                const r = onCellClick(e, row, column);
                r === null ? null : (e.target.className += ` ${css.occupied}`);
            }}
        >
            {row} {column}
        </div>
    );
}
