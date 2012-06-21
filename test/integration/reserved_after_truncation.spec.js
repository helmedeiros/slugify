var slugify = require('../../lib/slugify.js');

describe('reserved after truncation', function() {

  it('should still protect reserved words after slicing', function() {
    expect(slugify('admin', {maxLength: 5})).toBe('admin-page');
  });
});
