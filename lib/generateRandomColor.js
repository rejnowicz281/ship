export default function generateRandomColor() {
    const randomNumber = Math.floor(Math.random() * 16777215);
    const color = `#${randomNumber.toString(16).padStart(6, "0")}`; // make sure the color is always 6 digits long
    return color;
}
