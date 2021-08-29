import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

interface Options {
  preserveCapitals: boolean;
}

/**
 *
 * @param {string} text
 * @param {Options} options
 * @returns {string} tansliteration of text
 */
export const transliterate = (text: string, options: Options = { preserveCapitals: false }) => {
  const normalize = text.normalize("NFKD");
  const textCase = options.preserveCapitals ? normalize : normalize.toLowerCase();
  const titTat = titForTat(textCase);
  const array = titTat.split(" ");
  const modArray = testEach(array);
  const transliteration = modArray.join(" ");
  return transliteration;
};
