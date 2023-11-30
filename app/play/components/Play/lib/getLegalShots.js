export default function getLegalShots(misses, opponentShips, smart, adjacentAllowed) {
    const legalShots = [...Array(10).keys()]
        .map(
            (i) =>
                [...Array(10).keys()]
                    .map((j) => {
                        const alreadyMissed = misses.some((miss) => miss.row === i && miss.column === j);
                        // if the cell has already been shot, shot is illegal
                        if (alreadyMissed) return;

                        let shipCell;
                        opponentShips.forEach((ship) => {
                            ship.cells.forEach((cell) => {
                                // find the cell of the ship that matches the current row and column
                                if (cell.row === i && cell.column === j) return (shipCell = cell);
                            });

                            if (shipCell) return;
                        });
                        // if the cell is occupied by a ship that has already been hit, shot is illegal
                        if (shipCell?.hit) return;

                        return { row: i, column: j, occupied: !!shipCell }; // occupied is true if there is a ship on the cell
                    })
                    .filter((shot) => shot !== undefined) // clean up
        )
        .flat();

    if (smart) {
        // check if there is only one ship left (this is only needed if adjacentAllowed is true)
        const lastShipCheck = adjacentAllowed && opponentShips.filter((ship) => !ship.sunk()).length === 1;

        opponentShips.forEach((ship) => {
            if (ship.sunk()) return;

            // if adjacentAllowed is false or the ship is last, get the cells of the ship that have been hit
            const hitCells = !adjacentAllowed || lastShipCheck ? ship.cells.filter((cell) => cell.hit) : null;
            const orientation =
                hitCells?.length > 1 // if there are more than one hit cells, we can determine the orientation of the ship
                    ? ship.direction === "left" || ship.direction === "right"
                        ? "horizontal"
                        : "vertical"
                    : null;

            ship.cells.forEach((cell) => {
                if (!cell.hit) return;

                const { row, column } = cell;

                const shotCandidates =
                    orientation === "horizontal"
                        ? [
                              { row, column: column - 1 },
                              { row, column: column + 1 },
                          ]
                        : orientation === "vertical"
                        ? [
                              { row: row - 1, column },
                              { row: row + 1, column },
                          ]
                        : [
                              // if orientation is not specified, check all adjacent cells
                              { row: row - 1, column },
                              { row: row + 1, column },
                              { row, column: column - 1 },
                              { row, column: column + 1 },
                          ];

                shotCandidates.forEach((shot) => {
                    legalShots.forEach((legalShot) => {
                        // if the shot is legal, mark it as smart
                        if (legalShot.row == shot.row && legalShot.column == shot.column) legalShot.smart = true;
                    });
                });
            });
        });
    }

    return legalShots;
}
