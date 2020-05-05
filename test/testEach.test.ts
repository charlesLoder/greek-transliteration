import { testEach } from "../src/testEach";
// using toEqual instead of toBe since testEach() returns a different object

describe("rules for specific cases", () => {
  test("two gammas", () => {
    expect(testEach(["aggelos"])).toEqual(["angelos"]);
  });

  test("gamma followed by kappa", () => {
    expect(testEach(["agkylion"])).toEqual(["ankylion"]);
  });

  test("gamma followed by xi", () => {
    expect(testEach(["salpigx"])).toEqual(["salpinx"]);
  });

  test("gamma followed by chi", () => {
    expect(testEach(["elegchos"])).toEqual(["elenchos"]);
  });

  test("initial rho", () => {
    expect(testEach(["r\u{0314}ēma"])).toEqual(["rhēma"]);
  });

  test("medial rhos", () => {
    expect(testEach(["pyrros"])).toEqual(["pyrrhos"]);
  });

  test("DIAERESIS splits diphthong", () => {
    expect(testEach(["pray\u{0308}s"])).toEqual(["prays"]);
  });

  test("alpha and upsilon diphthong", () => {
    expect(testEach(["aytos"])).toEqual(["autos"]);
  });

  test("epsilon and upsilon diphthong", () => {
    expect(testEach(["eythys"])).toEqual(["euthys"]);
  });

  test("ēta and upsilon diphthong", () => {
    expect(testEach(["ēyxamen"])).toEqual(["ēuxamen"]);
  });

  test("omicron and upsilon diphthong", () => {
    expect(testEach(["oyde"])).toEqual(["oude"]);
  });

  test("upsilon and iota diphthong", () => {
    // intentionally missing dasia/COMBINING REVERSED COMMA ABOVE \u{0314}
    expect(testEach(["yios"])).toEqual(["uios"]);
  });

  test("rough breathing mark", () => {
    expect(testEach(["ē\u{0314}lios", "i\u{0314}na", "y\u{0314}mnos"])).toEqual(["hēlios", "hina", "hymnos"]);
  });

  test("rough breathing mark with diphtong", () => {
    expect(testEach(["ay\u{0314}tē", "ey\u{0314}riskō", "oy\u{0314}tos", "yi\u{0314}os", "ai\u{0314}resis"])).toEqual([
      "hautē",
      "heuriskō",
      "houtos",
      "huios",
      "hairesis"
    ]);
  });
});
