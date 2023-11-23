import generateRandomColor from "@/lib/generateRandomColor";

export default function generateRandomShips() {
    const ships = [];

    function addShip() {
        const direction = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
        let new_ship = [];
        let x_times = [...Array(5 - ships.length)];

        const row = Math.floor(Math.random() * 10);
        const column = Math.floor(Math.random() * 10);

        new_ship = {
            direction,
            color: generateRandomColor(),
            cells: x_times.map((_, i) => ({
                row: direction == "down" ? row + i : direction == "up" ? row - i : row,
                column: direction == "right" ? column + i : direction == "left" ? column - i : column,
            })), // populate new_ship based on direction and length, for example [{row: 0, column: 0}, {row: 0, column: 1}, ...]
        };
        let invalid = new_ship.cells.some((new_ship_cell) => {
            return (
                new_ship_cell.row < 0 ||
                new_ship_cell.row > 9 ||
                new_ship_cell.column < 0 ||
                new_ship_cell.column > 9 ||
                ships.some((ship) =>
                    ship.cells.some(
                        (placed_ship_cell) =>
                            placed_ship_cell.row === new_ship_cell.row &&
                            placed_ship_cell.column === new_ship_cell.column
                    )
                )
            ); // check if new_ship_cell is already occupied by another ship
        });

        if (invalid) addShip();
        else ships.push(new_ship);
    }

    for (let i = 0; i < 5; i++) addShip();

    return ships;
}
