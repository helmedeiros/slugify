var slugify = require('../../lib/slugify.js');

describe('punctuation option', function() {

  it('should strip punctuation by default', function() {
    expect(slugify('hello, world!')).toBe('hello-world');
  });

  it('should replace punctuation with separator', function() {
    expect(slugify('hello,world', {punctuation: 'replace'})).toBe('hello-world');
  });

  it('should keep punctuation when asked', function() {
    expect(slugify('hello!world', {punctuation: 'keep'})).toBe('hello!world');
  });
});
