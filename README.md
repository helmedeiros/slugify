# slugify

[![build status](https://travis-ci.org/helmedeiros/slugify.svg?branch=master)](https://travis-ci.org/helmedeiros/slugify)

simple tool to generate friendly urls. [check it out](http://rbsdev.github.io/slugify/).

## install

```
npm install
```

## usage

```js
var slugify = require('slugify');
slugify('Olá mundo');
```

## options

- `separator` — string between words. defaults to `-`.
- `lowercase` — set to `false` to preserve case. defaults to `true`.
- `punctuation` — `strip`, `replace`, or `keep`. defaults to `strip`.
- `symbols` — symbol-to-word table or locale code, set to `false` to disable.
- `locale` — language code (`en`, `pt`, `de`, `fr`, `es`, `tr`). drives transliteration and symbol words.
- `maxLength` — maximum slug length. defaults to `0` (no limit).
- `truncate` — `word` (default) or `hard`.
- `removeStopWords` — `true` (uses locale list) or a string locale or boolean. defaults to `false`.
- `stopWords` — custom array overriding locale list.
- `prioritizeKeywords` — number of tokens to retain. `0` keeps all.
- `preserveOrder` — keep original order when prioritizing. defaults to `true`.
