var slugify = require('../../lib/slugify.js');

describe('reserved word protection', function() {

  it('should append the default suffix when reserved', function() {
    expect(slugify('admin')).toBe('admin-page');
  });

  it('should accept a custom reserved list', function() {
    expect(slugify('homepage', {reservedWords: ['homepage'], reservedSuffix: 'site'})).toBe('homepage-site');
  });

  it('should not append when not reserved', function() {
    expect(slugify('articles')).toBe('articles');
  });

  it('should be disabled when protectReserved is false', function() {
    expect(slugify('admin', {protectReserved: false})).toBe('admin');
  });
});
