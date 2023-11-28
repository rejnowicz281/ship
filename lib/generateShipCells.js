export default function generateShipCells(length, row, column, direction) {
    let x_times = [...Array(length)];

    return x_times.map((_, i) => ({
        hit: false,
        row: direction == "down" ? row + i : direction == "up" ? row - i : row,
        column: direction == "right" ? column + i : direction == "left" ? column - i : column,
    }));
}
