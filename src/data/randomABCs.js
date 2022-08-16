import { shuffle } from "d3";

export function randomLetters() {
  // return shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
  return shuffle("abcdefghij".split(""))
    .slice(0, Math.floor(1 + Math.random() * 5))
    .sort();
}
