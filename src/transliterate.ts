import { titForTat } from "./titForTat";
import { testEach } from "./testEach";

export const transliterate = (text: string) => {
  let normalize = text.normalize("NFKD");
  let titTat = titForTat(normalize);
  let array = titTat.split(" ");
  let modArray = testEach(array);
  let transliteration = modArray.join(" ");
  return transliteration;
};
