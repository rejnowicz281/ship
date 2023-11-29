# ship

Battleship game built with NextJS 14

## Features

-   Rotate ships (mouse wheel or button)
-   Show tips (best cells to shoot)
-   Shoot a random cell on button click
-   Shoot most optimal cell on button click
-   Shoot a cell by clicking on it
-   Choose between four game modes

## The Four Game Modes

-   Smart AI, adjacent ships not allowed - AI shoots randomly until it hits a ship, then it shoots the adjacent cells until it sinks the ship. Since we know there are no other ships around, after two hits on a ship, we can determine it's orientation, shooting only the cells in the direction of the ship.

-   Smart AI, adjacent ships allowed - AI shoots randomly until it hits a ship, then it shoots the adjacent cells until it sinks the ship. If there is only one ship left, just like above, after two hits we can determine it's orientation, shooting only the cells in the direction of the ship. If there are more ships left, we can't determine the orientation (without cheating), since there might be another ship around. (When we hit a ship, we don't know if it's the same ship or a different one.)

-   Random AI, adjacent ships allowed - AI always shoots randomly. Adjacent ships are allowed.

-   Random AI, adjacent ships not allowed - AI always shoots randomly. Adjacent ships are not allowed.
