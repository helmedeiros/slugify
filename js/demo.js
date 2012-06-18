!function() {
  'use strict';

  var dom = {};

  var versions = {
    'current': window.slugify,
    '0.3.0': window.slugify_0_3_0 || window.slugify,
    '0.2.0': window.slugify_0_2_0 || window.slugify,
    '0.1.0': window.slugify_0_1_0 || window.slugify
  };

  var getOptions = function() {
    return {
      separator: dom.separator.value || '-',
      locale: dom.locale.value,
      punctuation: dom.punctuation.value,
      maxLength: parseInt(dom.maxLength.value, 10) || 0,
      lowercase: dom.lowercase.checked,
      removeStopWords: dom.stopwords.checked,
      symbols: dom.locale.value
    };
  };

  var currentSlugify = function() {
    return versions[dom.version.value] || window.slugify;
  };

  var convert = function() {
    var raw = currentSlugify()(dom.input.value, getOptions());
    var slug = typeof raw === 'string' ? raw : raw.slug;
    dom.output.innerHTML = slug;
    dom.alert.classList.remove('hidden');
  };

  var cache = function() {
    dom.alert = document.querySelector('.slug-alert');
    dom.convert = document.querySelector('.slug-convert');
    dom.input = document.querySelector('.slug-input');
    dom.output = document.querySelector('.slug-output');
    dom.version = document.getElementById('slug-version-select');
    dom.separator = document.getElementById('opt-separator');
    dom.locale = document.getElementById('opt-locale');
    dom.punctuation = document.getElementById('opt-punctuation');
    dom.maxLength = document.getElementById('opt-maxlength');
    dom.lowercase = document.getElementById('opt-lowercase');
    dom.stopwords = document.getElementById('opt-stopwords');
  };

  var bind = function() {
    dom.convert.addEventListener('click', convert);
    dom.input.addEventListener('input', convert);
    [dom.version, dom.separator, dom.locale, dom.punctuation, dom.maxLength, dom.lowercase, dom.stopwords].forEach(function(el) {
      el.addEventListener('change', convert);
    });
  };

  var main = function() {
    cache();
    bind();
    dom.input.focus();
  };

  document.addEventListener('DOMContentLoaded', main);
}();
