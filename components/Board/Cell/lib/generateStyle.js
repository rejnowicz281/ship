// if direction is right:
// first cell: border-left: 1px, border-top: 1px, border-bottom: 1px, border-right: none
// middle cells: border-left: none, border-top: 1px, border-bottom: 1px, border-right: none
// last cell: border-left: none, border-top: 1px, border-bottom: 1px, border-right: 1px

// if direction is left:
// first cell: border-right: 1px, border-top: 1px, border-bottom: 1px, border-left: none
// middle cells: border-right: none, border-top: 1px, border-bottom: 1px, border-left: none
// last cell: border-right: none, border-top: 1px, border-bottom: 1px, border-left: 1px

// if direction is up:
// first cell: border-bottom: 1px, border-left: 1px, border-right: 1px, border-top: none
// middle cells: border-bottom: none, border-left: 1px, border-right: 1px, border-top: none
// last cell: border-bottom: none, border-left: 1px, border-right: 1px, border-top: 1px

// if direction is down:
// first cell: border-top: 1px, border-left: 1px, border-right: 1px, border-bottom: none
// middle cells: border-top: none, border-left: 1px, border-right: 1px, border-bottom: none
// last cell: border-top: none, border-left: 1px, border-right: 1px, border-bottom: 1px

export default function generateStyle(color, direction, isLast, isFirst) {
    return {
        borderLeft:
            direction == "right"
                ? isFirst
                    ? "1px solid black"
                    : "none"
                : direction == "left"
                ? isLast
                    ? "1px solid black"
                    : "none"
                : direction == "up" || direction == "down"
                ? "1px solid black"
                : null,
        borderRight:
            direction == "right"
                ? isLast
                    ? "1px solid black"
                    : "none"
                : direction == "left"
                ? isFirst
                    ? "1px solid black"
                    : "none"
                : direction == "up" || direction == "down"
                ? "1px solid black"
                : null,
        borderTop:
            direction == "up"
                ? isLast
                    ? "1px solid black"
                    : "none"
                : direction == "down"
                ? isFirst
                    ? "1px solid black"
                    : "none"
                : direction == "right" || direction == "left"
                ? "1px solid black"
                : null,
        borderBottom:
            direction == "up"
                ? isFirst
                    ? "1px solid black"
                    : "none"
                : direction == "down"
                ? isLast
                    ? "1px solid black"
                    : "none"
                : direction == "right" || direction == "left"
                ? "1px solid black"
                : null,
        backgroundColor: color,
    };
}
