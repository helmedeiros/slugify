var slugify = require('../../lib/slugify.js');

describe('max length option', function() {

  it('should not truncate when under the limit', function() {
    expect(slugify('hello world', {maxLength: 50})).toBe('hello-world');
  });

  it('should truncate at the last word boundary', function() {
    expect(slugify('the quick brown fox', {maxLength: 16})).toBe('the-quick-brown');
  });

  it('should hard truncate when mode is hard', function() {
    expect(slugify('the quick brown fox', {maxLength: 10, truncate: 'hard'})).toBe('the-quick');
  });

  it('should trim trailing separator after truncation', function() {
    expect(slugify('the quick brown', {maxLength: 4})).toBe('the');
  });
});
