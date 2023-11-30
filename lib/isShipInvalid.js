export default function isShipInvalid(ship, ships) {
    return (
        ship.cells.length < 1 ||
        ship.cells.some(
            (newShipCell) =>
                // check if any of the cells are out of bounds
                newShipCell.row < 0 ||
                newShipCell.row > 9 ||
                newShipCell.column < 0 ||
                newShipCell.column > 9 ||
                ships.some(
                    (ship) =>
                        ship.cells.some(
                            // check if newShipCell is already occupied by another ship
                            (placedShipCell) =>
                                placedShipCell.row === newShipCell.row && placedShipCell.column === newShipCell.column
                        ) ||
                        // if ship has adjacent cells, check if newShipCell is adjacent to any of them
                        ship.adjacentCells?.some(
                            (adjacentCell) =>
                                adjacentCell.row === newShipCell.row && adjacentCell.column === newShipCell.column
                        )
                )
        )
    );
}
