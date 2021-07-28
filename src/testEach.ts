const changeElementSplit = (input: string, split: RegExp, join: string) => input.split(split).join(join);

const changeElementSubstr = (input: string, index: number, join: string) => {
  return input.substring(0, index - 1) + join + input.substring(index - 1, index) + input.substring(index + 1);
};

const rules = (array: string[]) => {
  return array.map((element: string) => {
    // tests for gg > ng
    if (/gg/.test(element)) {
      element = changeElementSplit(element, /gg/, "ng");
    }

    // tests for gk > nk
    if (/gk/.test(element)) {
      element = changeElementSplit(element, /gk/, "nk");
    }

    // tests for gx > nx
    if (/gx/.test(element)) {
      element = changeElementSplit(element, /gx/, "nx");
    }

    // tests for gch > nch
    if (/gc/.test(element)) {
      element = changeElementSplit(element, /gc/, "nc");
    }

    // tests initial rho
    if (/r\u{0314}/u.test(element)) {
      element = changeElementSplit(element, /r\u{0314}/u, "rh");
    }

    // tests medial rho
    if (/rr/.test(element)) {
      element = changeElementSplit(element, /rr/, "rrh");
    }

    // test DIAERESIS to avoid dipthong
    if (/\u{0308}/u.test(element)) {
      const pos = element.indexOf("\u{0308}");
      element = changeElementSubstr(element, pos, "\u{0308}");
    }

    // test for \u{0314} > h
    if (/\u{0314}/u.test(element)) {
      element = `h${changeElementSplit(element, /\u{0314}/u, "")}`;
    }

    // tests if has upsilon as dipthong
    if (/y/.test(element)) {
      // ay > au
      if (/ay/.test(element)) {
        element = changeElementSplit(element, /ay/, "au");
      }

      // ey > eu
      if (/ey/.test(element)) {
        element = changeElementSplit(element, /ey/, "eu");
      }

      // ēy > ēu
      if (/ēy/.test(element)) {
        element = changeElementSplit(element, /ēy/, "ēu");
      }

      // oy > ou
      if (/oy/.test(element)) {
        element = changeElementSplit(element, /oy/, "ou");
      }

      // yi > ui
      if (/yi/.test(element)) {
        element = changeElementSplit(element, /yi/, "ui");
      }
    }

    // removes remaining DIAERESIS after diphthongs have been combines
    if (/\u{0308}/u.test(element)) {
      element = changeElementSplit(element, /\u{0308}/u, "");
    }

    return element;
  }); // map
};

export const testEach = (array: string[]) => {
  return rules(array);
};
