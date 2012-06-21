var slugify = require('../../lib/slugify.js');

describe('symbol table override', function() {

  it('should accept an explicit symbol table object', function() {
    expect(slugify('a > b', {symbols: {'>': 'gt'}})).toBe('a-gt-b');
  });

  it('should completely disable expansion when false', function() {
    expect(slugify('rock & roll', {symbols: false})).toBe('rock-roll');
  });
});
