var slugify = require('../../lib/slugify.js');

describe('locale option', function() {

  it('should default to english behaviour', function() {
    expect(slugify('Straße')).toBe('strase');
  });

  it('should apply german eszett rule', function() {
    expect(slugify('Straße', {locale: 'de'})).toBe('strasse');
  });

  it('should apply german umlaut diaeresis', function() {
    expect(slugify('Schöner Tag', {locale: 'de'})).toBe('schoener-tag');
  });

  it('should apply turkish dotless i', function() {
    expect(slugify('Iğdır', {locale: 'tr'})).toBe('igdir');
  });

  it('should apply french oe ligature', function() {
    expect(slugify('cœur', {locale: 'fr'})).toBe('coeur');
  });
});
