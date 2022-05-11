import { rules } from "./testEach";
import { Schema, SBL } from "./schema";

/**
 * transliterates Greek text according to Schema
 *
 * @param {string} text - Greek text to be transliterated
 * @param {Schema} schema - if `undefined`, defaults to SBL Academic
 * @returns {string} transliteration of text
 */
export const transliterate = (text: string, schema?: Partial<Schema> | Schema) => {
  const transSchema = schema instanceof Schema ? schema : new SBL(schema ?? {});
  const normalize = text.normalize("NFKD");
  // removes unused characters from NFKD normalization
  const unused = /[\u{00B7}\u{0300}\u{0301}\u{0304}\u{0306}\u{0313}\u{0342}\u{0345}]/gu;
  const sanitized = normalize.replace(unused, "");
  const textCase = transSchema.preserveCapitals ? sanitized : sanitized.toLowerCase();
  return textCase
    .split(" ")
    .map((w) => rules(w, transSchema))
    .join(" ");
};

export { Schema };
