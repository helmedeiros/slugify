var slugify = require('../../lib/slugify.js');

describe('full SEO pipeline', function() {

  it('should clean, strip stop words, prioritize, and truncate', function() {
    var output = slugify('The Ultimate Guide to Travel in Europe in 2012', {
      removeStopWords: true,
      prioritizeKeywords: 4,
      maxLength: 40
    });
    expect(output.length).toBeLessThan(41);
    expect(output.indexOf('the')).toBe(-1);
  });
});
