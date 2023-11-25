import generateShipObject from "./generateShipObject";
import isShipInvalid from "./isShipInvalid";

export default function generateRandomShips() {
    const ships = [];

    function addShip() {
        const direction = ["up", "down", "left", "right"][Math.floor(Math.random() * 4)];
        const row = Math.floor(Math.random() * 10);
        const column = Math.floor(Math.random() * 10);

        const new_ship = generateShipObject(direction, 5 - ships.length, row, column);

        let invalid = isShipInvalid(new_ship, ships);

        if (invalid) addShip();
        else ships.push(new_ship);
    }

    for (let i = 0; i < 5; i++) addShip();

    return ships;
}
