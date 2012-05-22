var slugify = require('../../lib/slugify.js');

describe('symbol words per locale', function() {

  it('should expand & to e in portuguese', function() {
    expect(slugify('rock & roll', {locale: 'pt', symbols: true})).toBe('rock-e-roll');
  });

  it('should expand & to und in german', function() {
    expect(slugify('rock & roll', {locale: 'de', symbols: true})).toBe('rock-und-roll');
  });

  it('should expand & to et in french', function() {
    expect(slugify('rock & roll', {locale: 'fr', symbols: true})).toBe('rock-et-roll');
  });
});
