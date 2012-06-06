var slugify = require('../../lib/slugify.js');

describe('custom rules', function() {

  it('should apply a regex rule on the finished slug', function() {
    expect(slugify('hello world', {customRules: [{pattern: /world/, replacement: 'galaxy'}]})).toBe('hello-galaxy');
  });

  it('should apply a function rule', function() {
    expect(slugify('javascript', {customRules: [function(s) { return s + '-library'; }]})).toBe('javascript-library');
  });

  it('should chain multiple rules in order', function() {
    var output = slugify('input', {
      customRules: [
        function(s) { return s + '-alpha'; },
        {pattern: /alpha/, replacement: 'beta'}
      ]
    });
    expect(output).toBe('input-beta');
  });
});
