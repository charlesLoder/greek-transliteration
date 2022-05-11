import { transliterateMap } from "./grcCharsTrans";
import { Schema } from "./schema";

const mapChars = (text: string, schema: Schema) =>
  [...text].map((char: string) => schema[transliterateMap[char]] ?? char).join("");

const changeElementSplit = (input: string, split: RegExp, join: string) => input.split(split).join(join);

const changeElementSubstr = (input: string, index: number, join: string) => {
  return input.substring(0, index - 1) + join + input.substring(index - 1, index) + input.substring(index + 1);
};

const gammaNasalRules = (word: string, schema: Schema, checkCapitals = false) => {
  // maybe move out of function scope?
  const nasals = ["γγ", "γκ", "γξ", "γχ"];
  const [gamma, kappa, xi, chi] = [...nasals.map((n) => new RegExp(n))];

  if (gamma.test(word)) word = word.replace(gamma, schema.SMALL_GAMMA_NASAL + schema.SMALL_GAMMA);
  if (kappa.test(word)) word = word.replace(kappa, schema.SMALL_GAMMA_NASAL + schema.SMALL_KAPPA);
  if (xi.test(word)) word = word.replace(xi, schema.SMALL_GAMMA_NASAL + schema.SMALL_XI);
  if (chi.test(word)) word = word.replace(chi, schema.SMALL_GAMMA_NASAL + schema.SMALL_CHI);

  if (checkCapitals) {
    const capitalNasals = ["γγ", "γκ", "γξ", "γχ"].map((n) => n.toUpperCase());
    const [cGamma, cKappa, cXi, cChi] = [...capitalNasals.map((n) => new RegExp(n))];

    if (cGamma.test(word)) word = word.replace(cGamma, schema.CAPITAL_GAMMA_NASAL + schema.CAPITAL_GAMMA);
    if (cKappa.test(word)) word = word.replace(cKappa, schema.CAPITAL_GAMMA_NASAL + schema.CAPITAL_KAPPA);
    if (cXi.test(word)) word = word.replace(cXi, schema.CAPITAL_GAMMA_NASAL + schema.CAPITAL_XI);
    if (cChi.test(word)) word = word.replace(cChi, schema.CAPITAL_GAMMA_NASAL + schema.CAPITAL_CHI);
  }

  return word;
};

const rhoRules = (word: string, schema: Schema, checkCapitals = false) => {
  if (/ρ\u{0314}/u.test(word)) word = word.replace(/ρ\u{0314}/u, schema.SMALL_RHO + schema.ROUGH_BREATHING_MARK);
  if (/ρρ/.test(word)) word = word.replace(/ρρ/, schema.SMALL_DOUBLE_RHO);

  if (checkCapitals) {
    if (/Ρ\u{0314}/u.test(word)) word = word.replace(/Ρ\u{0314}/u, schema.CAPITAL_RHO + schema.ROUGH_BREATHING_MARK);
    if (/ΡΡ/.test(word)) word = word.replace(/Ρ/, schema.CAPITAL_DOUBLE_RHO);
  }

  return word;
};

const diphtongRules = (word: string, schema: Schema, checkCapitals = false) => {
  const dipthongs = ["αυ", "ευ", "ηυ", "ου", "υι"];
  const [alpha, epsilon, eta, omicron, iota] = [...dipthongs.map((d) => new RegExp(d))];

  if (alpha.test(word)) word = word.replace(alpha, schema.SMALL_ALPHA + schema.SMALL_UPSILON_DIPTHONG);
  if (epsilon.test(word)) word = word.replace(epsilon, schema.SMALL_EPSILON + schema.SMALL_UPSILON_DIPTHONG);
  if (eta.test(word)) word = word.replace(eta, schema.SMALL_ETA + schema.SMALL_UPSILON_DIPTHONG);
  if (omicron.test(word)) word = word.replace(omicron, schema.SMALL_OMICRON + schema.SMALL_UPSILON_DIPTHONG);
  if (iota.test(word)) word = word.replace(iota, schema.SMALL_UPSILON_DIPTHONG + schema.SMALL_IOTA);

  if (checkCapitals) {
    const cDipthongs = ["αυ", "ευ", "ηυ", "ου", "υι"].map((d) => d.toUpperCase());
    const [cAlpha, cEpsilon, cEta, cOmicron, cIota] = [...cDipthongs.map((d) => new RegExp(d))];

    if (cAlpha.test(word)) word = word.replace(cAlpha, schema.CAPITAL_ALPHA + schema.CAPITAL_UPSILON_DIPTHONG);
    if (cEpsilon.test(word)) word = word.replace(cEpsilon, schema.CAPITAL_EPSILON + schema.CAPITAL_UPSILON_DIPTHONG);
    if (cEta.test(word)) word = word.replace(cEta, schema.CAPITAL_ETA + schema.CAPITAL_UPSILON_DIPTHONG);
    if (cOmicron.test(word)) word = word.replace(cOmicron, schema.CAPITAL_OMICRON + schema.CAPITAL_UPSILON_DIPTHONG);
    if (cIota.test(word)) word = word.replace(cIota, schema.CAPITAL_UPSILON_DIPTHONG + schema.CAPITAL_IOTA);
  }

  return word;
};

export const rules = (word: string, schema: Schema) => {
  if (/γ/i.test(word)) {
    word = gammaNasalRules(word, schema, schema.preserveCapitals);
  }

  if (/ρ/i.test(word)) {
    word = rhoRules(word, schema, schema.preserveCapitals);
  }

  // if DIAERESIS, place between vowels to avoid dipthong
  const hasDiaeresis = /\u{0308}/u.test(word);
  if (hasDiaeresis) {
    const pos = word.indexOf("\u{0308}");
    word = changeElementSubstr(word, pos, "\u{0308}");
  }

  // \u{0314} is rough breathing mark
  if (/\u{0314}/u.test(word)) {
    const pos = word.indexOf("\u{0314}");
    word = `${schema.ROUGH_BREATHING_MARK}${changeElementSplit(word, /\u{0314}/u, "")}`;
  }

  if (/υ/i.test(word)) {
    word = diphtongRules(word, schema, schema.preserveCapitals);
  }

  // removes remaining DIAERESIS after diphthongs have been combined
  if (hasDiaeresis) word = word.replace(/\u{0308}/u, "");

  return mapChars(word, schema);
};
