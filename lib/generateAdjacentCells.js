export default function generateAdjacentCells(cells) {
    const adjacent = [];

    cells.forEach((cell) => {
        const { row, column } = cell;

        const addAdjacentCell = (adjacentRow, adjacentColumn) => {
            if (
                adjacentRow >= 0 &&
                adjacentRow <= 9 &&
                adjacentColumn >= 0 &&
                adjacentColumn <= 9 &&
                !cells.some((shipCell) => shipCell.row === adjacentRow && shipCell.column === adjacentColumn) &&
                !adjacent.some(
                    (adjacentCell) => adjacentCell.row === adjacentRow && adjacentCell.column === adjacentColumn
                )
            )
                // if the adjacent cell is not out of bounds, not occupied by the ship and not already in the adjacent array, add it to the adjacent array
                adjacent.push({ row: adjacentRow, column: adjacentColumn });
        };

        addAdjacentCell(row - 1, column);
        addAdjacentCell(row + 1, column);
        addAdjacentCell(row, column - 1);
        addAdjacentCell(row, column + 1);
        addAdjacentCell(row - 1, column - 1);
        addAdjacentCell(row - 1, column + 1);
        addAdjacentCell(row + 1, column - 1);
        addAdjacentCell(row + 1, column + 1);
    });

    return adjacent;
}
