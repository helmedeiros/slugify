var slugify = require('../../lib/slugify.js');

describe('stop word removal', function() {

  it('should keep stop words by default', function() {
    expect(slugify('the ultimate guide to travel in europe')).toBe('the-ultimate-guide-to-travel-in-europe');
  });

  it('should remove english stop words when enabled', function() {
    expect(slugify('The Ultimate Guide to Travel in Europe', {removeStopWords: true})).toBe('ultimate-guide-travel-europe');
  });

  it('should remove portuguese stop words when enabled with locale', function() {
    expect(slugify('a viagem dos sonhos para o verão', {locale: 'pt', removeStopWords: true})).toBe('viagem-sonhos-verao');
  });

  it('should accept a custom list', function() {
    expect(slugify('quick fox jumps', {removeStopWords: true, stopWords: ['fox']})).toBe('quick-jumps');
  });
});
