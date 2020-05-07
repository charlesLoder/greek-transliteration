# greek-transliteration

Transliterate Unicode Greek text according to SBL's guidelines

## install

### npm

`npm install --save greek-transliteration`

### local

Download or clone this repository.

```bash
cd greek-transliteration
npm install
npm run build
```

## example

```javascript
const grc = require("greek-transliteration");
const transliterate = grc.transliterate;

transliterate("θεός") >>> "theos";
```

## DOCS

### transliterate

```javascript
grc.transliterate(text);
```

Takes `text` \<\<String\>\>.

```javascript
grc.transliterate("υἱοῦ θεοῦ") >>> "huiou theou";
```

---

## License

MIT

## Live

Use it live at [charlesLoder.github.io/greekTransliteration](https://charlesloder.github.io/greekTransliteration/index.html)

## Changelog

## Contributing

Please feel free to Fork, create Pull Requests, or submit issues.
