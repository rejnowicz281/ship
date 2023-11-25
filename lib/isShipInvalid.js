export default function isShipInvalid(ship, ships) {
    return ship.cells.some(
        (new_ship_cell) =>
            new_ship_cell.row < 0 ||
            new_ship_cell.row > 9 ||
            new_ship_cell.column < 0 ||
            new_ship_cell.column > 9 ||
            ships.some((ship) =>
                ship.cells.some(
                    (placed_ship_cell) =>
                        placed_ship_cell.row === new_ship_cell.row && placed_ship_cell.column === new_ship_cell.column
                )
            )
    ); // check if new_ship_cell is already occupied by another ship or is out of bounds
}
