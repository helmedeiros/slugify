var slugify = require('../../lib/slugify.js');

describe('symbol words', function() {

  it('should not expand by default', function() {
    expect(slugify('rock & roll')).toBe('rock-roll');
  });

  it('should expand ampersand to and in english', function() {
    expect(slugify('rock & roll', {symbols: 'en'})).toBe('rock-and-roll');
  });

  it('should expand at symbol', function() {
    expect(slugify('meet @ noon', {symbols: 'en'})).toBe('meet-at-noon');
  });

  it('should expand percent', function() {
    expect(slugify('100 % cotton', {symbols: 'en'})).toBe('100-percent-cotton');
  });

  it('should accept a custom symbol table', function() {
    expect(slugify('a & b', {symbols: {'&': 'AND'}})).toBe('a-and-b');
  });

  it('should disable symbol expansion when false', function() {
    expect(slugify('a & b', {symbols: false})).toBe('a-b');
  });
});
