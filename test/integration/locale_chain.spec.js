var slugify = require('../../lib/slugify.js');

describe('locale fallback chain', function() {

  it('should resolve the active locale table when symbols is true', function() {
    expect(slugify('rock & roll', {locale: 'pt', symbols: true})).toBe('rock-e-roll');
    expect(slugify('100 % cotton', {locale: 'pt', symbols: true})).toBe('100-porcento-cotton');
  });

  it('should fall back to en for missing localeOverrides', function() {
    expect(slugify('café', {locale: 'pt'})).toBe('cafe');
  });
});
