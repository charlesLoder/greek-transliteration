import { titForTat } from "../src/titForTat";

describe("Greek and Coptic block", () => {
  test("standard capitals", () => {
    const capitals = "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ".normalize("NFKD");
    expect(titForTat(capitals)).toEqual("ABGDEZĒTHIKLMNXOPRSTYPHCHPSŌ");
  });

  test("standard lowercase", () => {
    const lower = "αβγδεζηθικλμνξοπρστυφχψω".normalize("NFKD");
    expect(titForTat(lower)).toEqual("abgdezēthiklmnxoprstyphchpsō");
  });

  test("characters with only tonos", () => {
    // tonos (0384) by itself decomposes into 'space' + '\u{0301}'
    const withTonos = "\u{0384}ΆΈΉΊΌΎΏάέήίόύώ".normalize("NFKD");
    expect(titForTat(withTonos)).toEqual(" AEĒIOYŌaeēioyō");
  });

  test("characters with DIALYTIKA, optionally tonos", () => {
    // GREEK DIALYTIKA TONOS (U+0385) decomposes into 'space' + '\u{0308}' COMBINING DIAERESIS + '\u{0301}'
    const withDia = "\u{0385}ΐΪΫΰϊϋ".normalize("NFKD");
    expect(titForTat(withDia)).toEqual(" \u{0308}i\u{0308}I\u{0308}Y\u{0308}y\u{0308}i\u{0308}y\u{0308}");
  });
});

describe("Greek Extended block", () => {
  test("with smooth breathing mark (PSILI)", () => {
    const withPsili = "ἀἐἠἰὀὐὠἈἘἨἸὈὨ".normalize("NFKD");
    expect(titForTat(withPsili)).toEqual("aeēioyōAEĒIOŌ");
  });

  test("with rough breathing mark (DASIA)", () => {
    const withDasia = "ἁἑἡἱὁὑὡἉἙἩἹὉὙὩ".normalize("NFKD");
    expect(titForTat(withDasia)).toEqual(
      "a\u{0314}e\u{0314}ē\u{0314}i\u{0314}o\u{0314}y\u{0314}ō\u{0314}A\u{0314}E\u{0314}Ē\u{0314}I\u{0314}O\u{0314}Y\u{0314}Ō\u{0314}"
    );
  });

  // no need to test each letter everytime
  test("with VARIA", () => {
    const withVARIA = "ὰ".normalize("NFKD");
    expect(titForTat(withVARIA)).toEqual("a");
  });

  test("with OXIA", () => {
    const withVaria = "ά".normalize("NFKD");
    expect(titForTat(withVaria)).toEqual("a");
  });

  test("with YPOGEGRAMMENI", () => {
    const withIotaSub = "ᾀᾁ".normalize("NFKD");
    expect(titForTat(withIotaSub)).toEqual("aa\u{0314}");
  });

  test("with VRACHY", () => {
    const withVrachy = "ᾰ".normalize("NFKD");
    expect(titForTat(withVrachy)).toEqual("a");
  });

  test("with MACRON", () => {
    const withMacron = "ᾱ".normalize("NFKD");
    expect(titForTat(withMacron)).toEqual("a");
  });

  test("with PERISPOMENI", () => {
    const withPerspomeni = "ᾶ".normalize("NFKD");
    expect(titForTat(withPerspomeni)).toEqual("a");
  });

  test("with DIALYTIKA and VARIA", () => {
    const withDial = "ῢ".normalize("NFKD");
    expect(titForTat(withDial)).toEqual("y\u{0308}");
  });
});
