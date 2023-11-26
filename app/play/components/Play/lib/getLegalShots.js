export default function getLegalShots(misses, opponentShips, smart) {
    const legal_shots = [...Array(10).keys()]
        .map(
            (i) =>
                [...Array(10).keys()]
                    .map((j) => {
                        const already_missed = misses.some((miss) => miss.row === i && miss.column === j);
                        // if the cell has already been shot, shot is illegal
                        if (already_missed) return;

                        let ship_cell;
                        opponentShips.forEach((ship) => {
                            ship.cells.forEach((cell) => {
                                // find the cell of the ship that matches the current row and column
                                if (cell.row === i && cell.column === j) return (ship_cell = cell);
                            });

                            if (ship_cell) return;
                        });
                        // if the cell is occupied by a ship that has already been hit, shot is illegal
                        if (ship_cell?.hit) return;

                        return { row: i, column: j, occupied: !!ship_cell }; // occupied is true if there is a ship on the cell
                    })
                    .filter((shot) => shot !== undefined) // clean up
        )
        .flat();

    if (smart) {
        opponentShips.forEach((ship) => {
            if (ship.sunk()) return;

            ship.cells.forEach((cell) => {
                if (!cell.hit) return;

                const { row, column } = cell;

                const shot_candidates = [
                    { row: row - 1, column },
                    { row: row + 1, column },
                    { row, column: column - 1 },
                    { row, column: column + 1 },
                ];

                shot_candidates.forEach((shot) => {
                    legal_shots.forEach((legal_shot) => {
                        // if the shot is legal, mark it as smart
                        if (legal_shot.row == shot.row && legal_shot.column == shot.column) legal_shot.smart = true;
                    });
                });
            });
        });
    }

    return legal_shots;
}
