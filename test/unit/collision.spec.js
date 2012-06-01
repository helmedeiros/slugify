var slugify = require('../../lib/slugify.js');

describe('collision tracker', function() {

  it('should append incremental suffix on collision', function() {
    var tracker = slugify.tracker();
    expect(tracker('My Article')).toBe('my-article');
    expect(tracker('My Article')).toBe('my-article-2');
    expect(tracker('My Article')).toBe('my-article-3');
    expect(tracker('My Article')).toBe('my-article-4');
  });

  it('should respect a custom separator', function() {
    var tracker = slugify.tracker({separator: '_'});
    expect(tracker('My Article')).toBe('my_article');
    expect(tracker('My Article')).toBe('my_article_2');
  });
});
