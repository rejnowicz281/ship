import generateRandomColor from "./generateRandomColor";

export default function generateShipObject(direction, length, row, column) {
    let x_times = [...Array(length)];

    return {
        direction,
        color: generateRandomColor(),
        cells: x_times.map((_, i) => ({
            hit: false,
            row: direction == "down" ? row + i : direction == "up" ? row - i : row,
            column: direction == "right" ? column + i : direction == "left" ? column - i : column,
        })),
        sunk: function () {
            return this.cells.every((cell) => cell.hit);
        },
    };
}

// generate ship object based on direction and length, for example:
// { direction: "right",
//   color: "#ff0000",
//   cells: [{hit: false, row: 0, column: 0}, {hit: false, row: 0, column: 1}, ...]
// }
