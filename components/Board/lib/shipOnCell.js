export default function shipOnCell(ships, row, column) {
    for (let i = 0; i < ships.length; i++) {
        console.log(ships[i].row);
        if (ships[i].row == row && ships[i].column == column) return true;
    }

    return false;
}
