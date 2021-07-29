import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export interface Options {
  preserveCapitals: boolean;
}

export const transliterate = (text: string, options: Options = { preserveCapitals: false }) => {
  const normalize = text.normalize("NFKD");
  const textCase = options.preserveCapitals ? normalize : normalize.toLowerCase();
  const titTat = titForTat(textCase);
  const array = titTat.split(" ");
  const modArray = testEach(array);
  const transliteration = modArray.join(" ");
  return transliteration;
};
