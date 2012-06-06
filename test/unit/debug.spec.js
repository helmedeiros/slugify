var slugify = require('../../lib/slugify.js');

describe('debug mode', function() {

  it('should return a trace object', function() {
    var result = slugify('Hello & World', {symbols: 'en', debug: true});
    expect(result.slug).toBe('hello-and-world');
    expect(result.trace.input).toBe('Hello & World');
    expect(result.trace.symbols.length).toBe(1);
  });

  it('should record stop words removed', function() {
    var result = slugify('the cat', {removeStopWords: true, debug: true});
    expect(result.trace.stopWords).toContain('the');
  });

  it('should record dropped keywords when prioritizing', function() {
    var result = slugify('alpha beta gamma', {prioritizeKeywords: 2, debug: true});
    expect(result.trace.droppedKeywords.length).toBe(1);
  });
});
