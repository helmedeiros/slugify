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
