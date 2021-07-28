import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export const transliterate = (text: string) => {
  const normalize = text.normalize("NFKD");
  const titTat = titForTat(normalize);
  const array = titTat.split(" ");
  const modArray = testEach(array);
  const transliteration = modArray.join(" ");
  return transliteration;
};
