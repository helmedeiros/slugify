var slugify = require('../../lib/slugify.js');

describe('lowercase option', function() {

  it('should lowercase by default', function() {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should preserve case when disabled', function() {
    expect(slugify('Hello World', {lowercase: false})).toBe('Hello-World');
  });

  it('should still lowercase explicitly when true', function() {
    expect(slugify('Hello World', {lowercase: true})).toBe('hello-world');
  });
});
