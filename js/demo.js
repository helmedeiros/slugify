!function() {
  'use strict';

  var dom = {};

  var versions = function() {
    return {
      'current': window.slugify,
      '0.3.0': window.slugify_0_3_0 || window.slugify,
      '0.2.0': window.slugify_0_2_0 || window.slugify,
      '0.1.0': window.slugify_0_1_0 || window.slugify
    };
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

  var runVersion = function(key, text, options) {
    var fn = versions()[key] || window.slugify;
    return fn(text, options);
  };

  var unwrap = function(value) {
    return value && typeof value === 'object' && typeof value.slug === 'string' ? value.slug : value;
  };

  var renderCompare = function(options) {
    if (!dom.compare.value) {
      dom.compareAlert.classList.add('hidden');
      return;
    }
    var slug = unwrap(runVersion(dom.compare.value, dom.input.value, options));
    dom.compareLabel.textContent = 'versão ' + dom.compare.value;
    dom.compareOutput.textContent = slug;
    dom.compareAlert.classList.remove('hidden');
  };

  var convert = function() {
    var options = getOptions();
    var slug = unwrap(runVersion(dom.version.value, dom.input.value, options));
    dom.output.textContent = slug;
    dom.alert.classList.remove('hidden');
    renderCompare(options);
  };

  var cache = function() {
    dom.alert = document.querySelector('.slug-alert');
    dom.convert = document.querySelector('.slug-convert');
    dom.input = document.querySelector('.slug-input');
    dom.output = document.querySelector('.slug-output');
    dom.compareAlert = document.querySelector('.slug-alert-compare');
    dom.compareLabel = document.querySelector('.slug-compare-label');
    dom.compareOutput = document.querySelector('.slug-compare-output');
    dom.version = document.getElementById('slug-version-select');
    dom.compare = document.getElementById('slug-compare-select');
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
    [dom.version, dom.compare, dom.separator, dom.locale, dom.punctuation, dom.maxLength, dom.lowercase, dom.stopwords].forEach(function(el) {
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
