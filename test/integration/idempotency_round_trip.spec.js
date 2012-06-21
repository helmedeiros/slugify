var slugify = require('../../lib/slugify.js');

describe('idempotency round trip', function() {

  it('should converge after three runs', function() {
    var a = slugify('The Ultimate Guide to Travel in Europe!', {removeStopWords: true, prioritizeKeywords: 4});
    var b = slugify(a, {removeStopWords: true, prioritizeKeywords: 4});
    var c = slugify(b, {removeStopWords: true, prioritizeKeywords: 4});
    expect(b).toBe(c);
  });
});
