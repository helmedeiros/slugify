var slugify = require('../../lib/slugify.js');

describe('separator option', function() {

  it('should use dash by default', function() {
    expect(slugify('hello world')).toBe('hello-world');
  });

  it('should accept an underscore', function() {
    expect(slugify('hello world', {separator: '_'})).toBe('hello_world');
  });

  it('should accept a dot', function() {
    expect(slugify('hello world', {separator: '.'})).toBe('hello.world');
  });

  it('should collapse multi-character separators', function() {
    expect(slugify('a---b', {separator: '-'})).toBe('a-b');
  });
});
