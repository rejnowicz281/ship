import generateRandomColor from "./generateRandomColor";
import generateShipCells from "./generateShipCells";

export default function generateShipObject(direction, length, row, column, color = generateRandomColor()) {
    return {
        direction,
        color,
        cells: generateShipCells(length, row, column, direction),
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
