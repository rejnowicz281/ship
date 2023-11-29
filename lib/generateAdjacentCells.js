export default function generateAdjacentCells(cells) {
    const adjacent = [];

    cells.forEach((cell) => {
        const { row, column } = cell;

        const addAdjacentCell = (adjacent_row, adjacent_column) => {
            if (
                adjacent_row >= 0 &&
                adjacent_row <= 9 &&
                adjacent_column >= 0 &&
                adjacent_column <= 9 &&
                !cells.some((ship_cell) => ship_cell.row === adjacent_row && ship_cell.column === adjacent_column) &&
                !adjacent.some(
                    (adjacent_cell) => adjacent_cell.row === adjacent_row && adjacent_cell.column === adjacent_column
                )
            )
                // if the adjacent cell is not out of bounds, not occupied by the ship and not already in the adjacent array, add it to the adjacent array
                adjacent.push({ row: adjacent_row, column: adjacent_column });
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
