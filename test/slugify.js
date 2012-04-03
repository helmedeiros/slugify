var slugify = require('../lib/slugify.js');

describe('slugify', function() {
  var map = {
    '!#$%&,.:;?@': '',
    'Acentos Gráficos & Diacríticos': 'acentos-graficos-diacriticos',
    'Atêncão: "10" (dez)': 'atencao-10-dez',
    ' carcará,  armazém,  caí,  ópio, último  ': 'carcara-armazem-cai-opio-ultimo',
    'religião -- “seicho-no-ie”': 'religiao-seicho-no-ie',
    'Straße': 'strase'
  };

  Object.keys(map).forEach(function(key) {
    var value = map[key];

    it.call(this, 'should convert "' + key + '" to "' + map[key] + '"', (function(key, value) {
      return function() {
        expect(slugify(key)).toBe(value);
      };
    })(key, value));
  });
});
