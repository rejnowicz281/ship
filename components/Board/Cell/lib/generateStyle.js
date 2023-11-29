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
        ...generateBorder(direction, isLast, isFirst),
        backgroundColor: color,
    };
}

export function generateBorder(direction, isLast, isFirst, thickness = "2px") {
    return {
        borderLeft:
            direction == "right"
                ? isFirst
                    ? `${thickness} solid black`
                    : "none"
                : direction == "left"
                ? isLast
                    ? `${thickness} solid black`
                    : "none"
                : direction == "up" || direction == "down"
                ? `${thickness} solid black`
                : null,
        borderRight:
            direction == "right"
                ? isLast
                    ? `${thickness} solid black`
                    : "none"
                : direction == "left"
                ? isFirst
                    ? `${thickness} solid black`
                    : "none"
                : direction == "up" || direction == "down"
                ? `${thickness} solid black`
                : null,
        borderTop:
            direction == "up"
                ? isLast
                    ? `${thickness} solid black`
                    : "none"
                : direction == "down"
                ? isFirst
                    ? `${thickness} solid black`
                    : "none"
                : direction == "right" || direction == "left"
                ? `${thickness} solid black`
                : null,
        borderBottom:
            direction == "up"
                ? isFirst
                    ? `${thickness} solid black`
                    : "none"
                : direction == "down"
                ? isLast
                    ? `${thickness} solid black`
                    : "none"
                : direction == "right" || direction == "left"
                ? `${thickness} solid black`
                : null,
    };
}
