var slugify = require('../../lib/slugify.js');

describe('collision tracker in a loop', function() {

  it('should produce unique slugs for ten copies', function() {
    var tracker = slugify.tracker();
    var seen = {};
    for (var i = 0; i < 10; i += 1) {
      var s = tracker('My Article');
      expect(seen[s]).toBeUndefined();
      seen[s] = true;
    }
  });
});
