var slugify = require('../../lib/slugify.js');

describe('symbols then locale', function() {

  it('should expand symbols using locale words before transliterating', function() {
    expect(slugify('100 % algodão', {locale: 'pt', symbols: true})).toBe('100-porcento-algodao');
  });

  it('should still apply locale overrides on the expanded text', function() {
    expect(slugify('Straße & Haus', {locale: 'de', symbols: true})).toBe('strasse-und-haus');
  });
});
