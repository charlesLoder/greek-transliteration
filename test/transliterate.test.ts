import { transliterate } from "../src/transliterate";

describe("preserve capitals", () => {
  test("true", () => {
    const lower = "Αα";
    expect(transliterate(lower)).toEqual("Aa");
  });

  test("false", () => {
    const lower = "Αα";
    expect(transliterate(lower, { preserveCapitals: false })).toEqual("aa");
  });
});

describe("no orthographic rules", () => {
  test("standard lowercase", () => {
    const lower = "αβγδεζηθικλμνξοπρστυφχψω";
    expect(transliterate(lower)).toEqual("abgdezēthiklmnxoprstyphchpsō");
  });

  test("standard capitals", () => {
    const capitals = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ";
    expect(transliterate(capitals)).toEqual("ABGDEZĒTHIKLMNXOPRSTYPHCHPSŌ");
  });

  test("single word", () => {
    expect(transliterate("κύριος")).toEqual("kyrios");
  });

  test("two words", () => {
    expect(transliterate("κύριος θεός")).toEqual("kyrios theos");
  });

  test("mixed with latin characters", () => {
    expect(transliterate("v.3 ... κύριος θεός")).toEqual("v.3 ... kyrios theos");
  });
});

describe("orthographic features", () => {
  describe("gamma nasal", () => {
    test("gamma gamma", () => {
      expect(transliterate("ἄγγελος")).toEqual("angelos");
    });

    test("gamma kappa", () => {
      expect(transliterate("ἄγκος")).toEqual("ankos");
    });

    test("gamma xi", () => {
      expect(transliterate("φόρμιγξ")).toEqual("phorminx");
    });

    test("gamma chi", () => {
      expect(transliterate("ἄγχι")).toEqual("anchi");
    });
  });

  describe("upsilon diphthong", () => {
    test("alpha, omicron", () => {
      expect(transliterate("αυτου")).toEqual("autou");
    });

    test("epsilon", () => {
      expect(transliterate("πιστεύσαντες")).toEqual("pisteusantes");
    });

    test("eta", () => {
      expect(transliterate("γρηῦς")).toEqual("grēus");
    });

    test("iota", () => {
      expect(transliterate("ἀγυιά")).toEqual("aguia");
    });

    test("DIAERESIS separating diphthong", () => {
      expect(transliterate("πραϋσμός")).toEqual("praysmos");
    });

    test("DIALYTIKA separating diphthong", () => {
      expect(transliterate("καταπραΰνω")).toEqual("katapraynō");
    });
  });

  describe("rho", () => {
    test("medial rho", () => {
      expect(transliterate("Πύρρος")).toEqual("Pyrrhos");
    });
  });

  describe("rough breathing mark", () => {
    test("regular", () => {
      expect(transliterate("ὕμνος")).toEqual("hymnos");
    });

    test("with dipthong", () => {
      expect(transliterate("υἱός")).toEqual("huios");
    });

    test("initial rho", () => {
      expect(transliterate("ῥαββί")).toEqual("rhabbi");
    });
  });
});

describe("extended markings should be removed", () => {
  test("TONOS", () => {
    // spaces before upsilon prevent diphtong
    expect(transliterate("ΆΈΉΊΌ ΎΏάέήίό ύώ")).toEqual("AEĒIO YŌaeēio yō");
  });

  test("PSILI (smooth breathing mark)", () => {
    // spaces before upsilon prevent diphtong
    expect(transliterate("ἀἐἠἰὀ ὐὠἈἘἨἸὈὨ")).toEqual("aeēio yōAEĒIOŌ");
  });

  test("VARIA", () => {
    expect(transliterate("ὰ")).toEqual("a");
  });

  test("OXIA", () => {
    expect(transliterate("ά")).toEqual("a");
  });

  test("YPOGEGRAMMENI", () => {
    expect(transliterate("ᾀ")).toEqual("a");
  });

  test("VRACHY", () => {
    expect(transliterate("ᾰ")).toEqual("a");
  });

  test("MACRON", () => {
    expect(transliterate("ᾱ")).toEqual("a");
  });

  test("PERISPOMENI", () => {
    expect(transliterate("ᾶ")).toEqual("a");
  });

  test("DIALYTIKA", () => {
    expect(transliterate("μαΐστρος")).toEqual("maistros");
  });
});
