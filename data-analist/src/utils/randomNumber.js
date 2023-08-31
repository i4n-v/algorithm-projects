export default function randomNumber(min, max) {
  return Math.round((Math.random() * (max - min + 1)) + min);
}