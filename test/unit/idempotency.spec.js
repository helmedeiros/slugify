var slugify = require('../../lib/slugify.js');

describe('idempotency', function() {

  it('should be idempotent for plain text', function() {
    var once = slugify('Hello World');
    var twice = slugify(once);
    expect(twice).toBe(once);
  });

  it('should be idempotent with a custom separator', function() {
    var once = slugify('Hello World', {separator: '_'});
    var twice = slugify(once, {separator: '_'});
    expect(twice).toBe(once);
  });

  it('should be idempotent across locales', function() {
    var once = slugify('Straße', {locale: 'de'});
    var twice = slugify(once, {locale: 'de'});
    expect(twice).toBe(once);
  });
});
