var slugify = require('../../lib/slugify.js');

describe('stop words then prioritization', function() {

  it('should remove stop words before prioritizing', function() {
    var output = slugify('how to travel from berlin to paris by train', {
      removeStopWords: true,
      prioritizeKeywords: 3
    });
    expect(output).toBe('travel-berlin-paris');
  });
});
