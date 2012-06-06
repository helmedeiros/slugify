var slugify = require('../../lib/slugify.js');

describe('pipeline composition', function() {

  it('should expose a pipeline helper', function() {
    expect(typeof slugify.pipeline).toBe('function');
  });

  it('should compose user steps left to right', function() {
    var trimAndShout = slugify.pipeline([
      function(s) { return s.trim(); },
      function(s) { return s.toUpperCase(); }
    ]);
    expect(trimAndShout('  hello  ')).toBe('HELLO');
  });
});
