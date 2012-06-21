var slugify = require('../../lib/slugify.js');

describe('case preserved with locale rules', function() {

  it('should preserve case after german eszett expansion', function() {
    expect(slugify('Straße', {locale: 'de', lowercase: false})).toBe('Strasse');
  });
});
