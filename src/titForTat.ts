import { transliterateMap } from "./grcCharsTrans";

export const titForTat = (text: string) => [...text].map((char: string) => transliterateMap[char] ?? char).join("");
