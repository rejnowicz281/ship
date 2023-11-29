export default function isShipInvalid(ship, ships, adjacentAllowed) {
    return (
        ship.cells.length < 1 ||
        ship.cells.some(
            (new_ship_cell) =>
                // check if any of the cells are out of bounds
                new_ship_cell.row < 0 ||
                new_ship_cell.row > 9 ||
                new_ship_cell.column < 0 ||
                new_ship_cell.column > 9 ||
                ships.some(
                    (ship) =>
                        ship.cells.some(
                            // check if new_ship_cell is already occupied by another ship
                            (placed_ship_cell) =>
                                placed_ship_cell.row === new_ship_cell.row &&
                                placed_ship_cell.column === new_ship_cell.column
                        ) ||
                        (!adjacentAllowed && // if adjacentAllowed is false, check if new_ship_cell is adjacent to another ship
                            ship.adjacent_cells.some(
                                (adjacent_cell) =>
                                    adjacent_cell.row === new_ship_cell.row &&
                                    adjacent_cell.column === new_ship_cell.column
                            ))
                )
        )
    );
}
