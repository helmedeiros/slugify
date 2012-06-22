# slugify

[![build status](https://travis-ci.org/helmedeiros/slugify.svg?branch=master)](https://travis-ci.org/helmedeiros/slugify)

simple tool to generate friendly urls. [check it out](https://helmedeiros.github.io/slugify/).

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
- `reservedWords` — array of words that should not become slugs alone.
- `reservedSuffix` — suffix used when a reserved word is detected. defaults to `page`.
- `protectReserved` — disable reserved-word handling by setting to `false`.
- `customRules` — array of regex rules `{pattern, replacement}` or functions.
- `debug` — return `{slug, trace}` for migrations and debugging.

## url collisions

```js
var tracker = slugify.tracker();
tracker('My Article'); // 'my-article'
tracker('My Article'); // 'my-article-2'
```

## pipeline

```js
var steps = slugify.pipeline([
  function(s) { return s.trim(); },
  function(s) { return s.toUpperCase(); }
]);
```

## contributing

see [CONTRIBUTING](CONTRIBUTING.md).

## license

[MIT](LICENSE).

## demo

try it live at [helmedeiros.github.io/slugify](https://helmedeiros.github.io/slugify). switch versions to compare old and new behaviour.
