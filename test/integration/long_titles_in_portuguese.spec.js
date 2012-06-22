var slugify = require('../../lib/slugify.js');

describe('long portuguese titles', function() {

  it('should produce a short SEO slug from a long title', function() {
    var output = slugify('A jornada épica do programador pelo Sertão das tecnologias', {
      locale: 'pt',
      removeStopWords: true,
      maxLength: 50
    });
    expect(output.length).toBeLessThan(51);
    expect(output.indexOf('a-jornada')).toBe(-1);
  });
});
