var slugify = require('../../lib/slugify.js');

describe('keyword prioritization', function() {

  it('should keep the highest scoring tokens', function() {
    expect(slugify('how to travel from berlin to paris by train', {prioritizeKeywords: 3})).toBe('travel-berlin-paris');
  });

  it('should preserve order by default', function() {
    var output = slugify('alpha beta gamma delta', {prioritizeKeywords: 2});
    expect(output).toBe('alpha-gamma');
  });

  it('should drop order when preserveOrder is false', function() {
    var output = slugify('alpha beta gamma delta', {prioritizeKeywords: 2, preserveOrder: false});
    expect(output.length).toBeGreaterThan(0);
  });
});
