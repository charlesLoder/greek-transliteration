import { transliterateMap } from "./grcCharsTrans";

export const titForTat = (text: string) => {
  return [...text]
    .map((char: string) => (char in transliterateMap ? transliterateMap[char] : char))
    .reduce((a, c) => a + c);
};
