import { transliterate } from "../src/transliterate";

describe("Koine Greek", () => {
  test("basic words", () => {
    expect(transliterate("κύριος θεός")).toEqual("kyrios theos");
  });

  test("double rho", () => {
    expect(transliterate("Πύρρος")).toEqual("pyrrhos");
  });

  test("double gamma", () => {
    expect(transliterate("ἄγγελος")).toEqual("angelos");
  });

  test("breathing mark", () => {
    expect(transliterate("ὕμνος")).toEqual("hymnos");
  });

  test("diphthong", () => {
    expect(transliterate("αυτου")).toEqual("autou");
  });

  test("diphthong with rough breathing mark", () => {
    expect(transliterate("υἱοῦ θεοῦ")).toEqual("huiou theou");
  });

  test("DIAERESIS separating diphthong", () => {
    expect(transliterate("πραϋσμός")).toEqual("praysmos");
  });

  test("mixed with latin characters", () => {
    expect(transliterate("v.3 ... τοῦ λεγομένου Καϊάφα")).toEqual("v.3 ... tou legomenou kaiapha");
  });

  test("preserve capital: false", () => {
    expect(transliterate("Αλφα")).toEqual("alpha");
  });

  test("preserve capital", () => {
    expect(transliterate("Αλφα", { preserveCapitals: true })).toEqual("Alpha");
  });
});
