!function() {
  'use strict';

  var HISTORY_KEY = 'slugify-demo-history';
  var HISTORY_LIMIT = 8;

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
      symbols: dom.locale.value,
      debug: dom.debug.checked
    };
  };

  var runVersion = function(key, text, options) {
    var fn = versions()[key] || window.slugify;
    return fn(text, options);
  };

  var unwrap = function(value) {
    if (value && typeof value === 'object' && typeof value.slug === 'string') {
      return {slug: value.slug, trace: value.trace};
    }
    return {slug: value, trace: null};
  };

  var renderTrace = function(trace) {
    if (!trace) {
      dom.trace.classList.add('hidden');
      dom.trace.textContent = '';
      return;
    }
    dom.trace.classList.remove('hidden');
    dom.trace.textContent = JSON.stringify(trace, null, 2);
  };

  var renderCompare = function(options) {
    if (!dom.compare.value) {
      dom.compareAlert.classList.add('hidden');
      return;
    }
    var result = unwrap(runVersion(dom.compare.value, dom.input.value, options));
    dom.compareLabel.textContent = 'versão ' + dom.compare.value;
    dom.compareOutput.textContent = result.slug;
    dom.compareAlert.classList.remove('hidden');
  };

  var convert = function() {
    var options = getOptions();
    var primary = unwrap(runVersion(dom.version.value, dom.input.value, options));
    dom.output.textContent = primary.slug;
    dom.alert.classList.remove('hidden');
    renderTrace(primary.trace);
    renderCompare(options);
    if (dom.input.value && primary.slug) {
      pushHistory({text: dom.input.value, slug: primary.slug, at: new Date().toISOString()});
      renderHistory();
    }
  };

  var loadHistory = function() {
    try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); }
    catch (e) { return []; }
  };

  var saveHistory = function(list) {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(list)); }
    catch (e) { }
  };

  var pushHistory = function(entry) {
    var list = loadHistory();
    if (list[0] && list[0].text === entry.text && list[0].slug === entry.slug) { return; }
    list.unshift(entry);
    if (list.length > HISTORY_LIMIT) { list.length = HISTORY_LIMIT; }
    saveHistory(list);
  };

  var renderHistory = function() {
    var list = loadHistory();
    if (list.length === 0) {
      dom.history.classList.add('hidden');
      return;
    }
    dom.history.classList.remove('hidden');
    dom.historyList.innerHTML = '';
    list.forEach(function(item) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'btn btn-default btn-xs slug-history-chip';
      chip.textContent = item.slug;
      chip.title = item.text;
      chip.addEventListener('click', function() {
        dom.input.value = item.text;
        convert();
      });
      dom.historyList.appendChild(chip);
    });
  };

  var copyToClipboard = function(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
      return;
    }
    var temp = document.createElement('textarea');
    temp.value = text;
    document.body.appendChild(temp);
    temp.select();
    try { document.execCommand('copy'); } catch (e) { }
    document.body.removeChild(temp);
  };

  var cache = function() {
    dom.alert = document.querySelector('.slug-alert');
    dom.convert = document.querySelector('.slug-convert');
    dom.input = document.querySelector('.slug-input');
    dom.output = document.querySelector('.slug-output');
    dom.copy = document.querySelector('.slug-copy');
    dom.compareAlert = document.querySelector('.slug-alert-compare');
    dom.compareLabel = document.querySelector('.slug-compare-label');
    dom.compareOutput = document.querySelector('.slug-compare-output');
    dom.trace = document.querySelector('.slug-trace');
    dom.history = document.querySelector('.slug-history');
    dom.historyList = document.querySelector('.slug-history-list');
    dom.historyClear = document.querySelector('.slug-history-clear');
    dom.version = document.getElementById('slug-version-select');
    dom.compare = document.getElementById('slug-compare-select');
    dom.separator = document.getElementById('opt-separator');
    dom.locale = document.getElementById('opt-locale');
    dom.punctuation = document.getElementById('opt-punctuation');
    dom.maxLength = document.getElementById('opt-maxlength');
    dom.lowercase = document.getElementById('opt-lowercase');
    dom.stopwords = document.getElementById('opt-stopwords');
    dom.debug = document.getElementById('opt-debug');
  };

  var bind = function() {
    dom.convert.addEventListener('click', convert);
    dom.input.addEventListener('input', convert);
    dom.copy.addEventListener('click', function() { copyToClipboard(dom.output.textContent); });
    dom.historyClear.addEventListener('click', function() { saveHistory([]); renderHistory(); });
    [dom.version, dom.compare, dom.separator, dom.locale, dom.punctuation, dom.maxLength, dom.lowercase, dom.stopwords, dom.debug].forEach(function(el) {
      el.addEventListener('change', convert);
    });
  };

  var main = function() {
    cache();
    bind();
    renderHistory();
    dom.input.focus();
  };

  document.addEventListener('DOMContentLoaded', main);
}();
