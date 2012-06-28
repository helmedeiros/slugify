!function() {
  'use strict';

  var STORAGE_KEY = 'slugify-demo-state';
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

  var parseCustomRules = function(text) {
    if (!text) { return []; }
    return text.split('\n').reduce(function(rules, line) {
      var trimmed = line.replace(/^\s+|\s+$/g, '');
      if (!trimmed) { return rules; }
      var arrow = trimmed.indexOf('=>');
      if (arrow === -1) { return rules; }
      var left = trimmed.slice(0, arrow).replace(/\s+$/, '');
      var right = trimmed.slice(arrow + 2).replace(/^\s+/, '');
      var match = left.match(/^\/(.*)\/([gimsy]*)$/);
      if (!match) { return rules; }
      try {
        rules.push({pattern: new RegExp(match[1], match[2]), replacement: right});
      } catch (e) { }
      return rules;
    }, []);
  };

  var coerceSymbols = function(value) {
    if (value === 'false') { return false; }
    if (value === 'true') { return true; }
    return value;
  };

  var collectState = function() {
    return {
      text: dom.input.value,
      version: dom.version.value,
      compare: dom.compare.value,
      separator: dom.separator.value,
      locale: dom.locale.value,
      punctuation: dom.punctuation.value,
      truncate: dom.truncate.value,
      maxLength: dom.maxLength.value,
      priority: dom.priority.value,
      reservedSuffix: dom.reservedSuffix.value,
      symbols: dom.symbols.value,
      lowercase: dom.lowercase.checked,
      stopwords: dom.stopwords.checked,
      reserved: dom.reserved.checked,
      debug: dom.debug.checked,
      customRules: dom.customRules.value
    };
  };

  var optionsFromState = function(state) {
    return {
      separator: state.separator || '-',
      locale: state.locale,
      punctuation: state.punctuation,
      truncate: state.truncate,
      maxLength: parseInt(state.maxLength, 10) || 0,
      prioritizeKeywords: parseInt(state.priority, 10) || 0,
      reservedSuffix: state.reservedSuffix || 'page',
      protectReserved: state.reserved,
      symbols: coerceSymbols(state.symbols),
      lowercase: state.lowercase,
      removeStopWords: state.stopwords,
      customRules: parseCustomRules(state.customRules),
      debug: state.debug
    };
  };

  var serializeState = function(state) {
    var parts = [];
    Object.keys(state).forEach(function(key) {
      var value = state[key];
      if (value === false || value === '' || value == null) { return; }
      parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(value === true ? '1' : value));
    });
    return parts.join('&');
  };

  var deserializeState = function(hash) {
    return hash.replace(/^#/, '').split('&').reduce(function(state, pair) {
      if (!pair) { return state; }
      var eq = pair.indexOf('=');
      if (eq === -1) { return state; }
      state[decodeURIComponent(pair.slice(0, eq))] = decodeURIComponent(pair.slice(eq + 1));
      return state;
    }, {});
  };

  var loadStored = function() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
    catch (e) { return {}; }
  };

  var saveStored = function(state) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch (e) { }
  };

  var applyState = function(state) {
    if (state.text != null) { dom.input.value = state.text; }
    if (state.version) { dom.version.value = state.version; }
    if (state.compare != null) { dom.compare.value = state.compare; }
    if (state.separator) { dom.separator.value = state.separator; }
    if (state.locale) { dom.locale.value = state.locale; }
    if (state.punctuation) { dom.punctuation.value = state.punctuation; }
    if (state.truncate) { dom.truncate.value = state.truncate; }
    if (state.maxLength != null) { dom.maxLength.value = state.maxLength; }
    if (state.priority != null) { dom.priority.value = state.priority; }
    if (state.reservedSuffix) { dom.reservedSuffix.value = state.reservedSuffix; }
    if (state.symbols != null) { dom.symbols.value = state.symbols; }
    if (state.customRules != null) { dom.customRules.value = state.customRules; }
    dom.lowercase.checked = state.lowercase === true || state.lowercase === '1' || state.lowercase === 'true';
    dom.stopwords.checked = state.stopwords === true || state.stopwords === '1' || state.stopwords === 'true';
    dom.reserved.checked = state.reserved === true || state.reserved === '1' || state.reserved === 'true';
    dom.debug.checked = state.debug === true || state.debug === '1' || state.debug === 'true';
  };

  var persist = function(state) {
    saveStored(state);
    var encoded = serializeState(state);
    var target = encoded ? '#' + encoded : ' ';
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', target);
    } else {
      window.location.hash = encoded;
    }
  };

  var bootstrapState = function() {
    var fromHash = deserializeState(window.location.hash);
    var stored = loadStored();
    applyState(Object.keys(fromHash).length > 0 ? fromHash : stored);
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
    var key = dom.compare.value;
    if (!key) {
      dom.compareAlert.classList.add('hidden');
      return;
    }
    var result = unwrap(runVersion(key, dom.input.value, options));
    dom.compareLabel.textContent = 'versão ' + key;
    dom.compareOutput.textContent = result.slug;
    dom.compareAlert.classList.remove('hidden');
  };

  var convert = function() {
    var state = collectState();
    var options = optionsFromState(state);
    var primary = unwrap(runVersion(state.version, state.text, options));
    dom.output.textContent = primary.slug;
    dom.alert.classList.remove('hidden');
    renderTrace(primary.trace);
    renderCompare(options);
    persist(state);
    if (state.text && primary.slug) {
      pushHistory({text: state.text, slug: primary.slug, at: new Date().toISOString()});
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
    dom.truncate = document.getElementById('opt-truncate');
    dom.maxLength = document.getElementById('opt-maxlength');
    dom.priority = document.getElementById('opt-priority');
    dom.reservedSuffix = document.getElementById('opt-reservedsuffix');
    dom.symbols = document.getElementById('opt-symbolslocale');
    dom.lowercase = document.getElementById('opt-lowercase');
    dom.stopwords = document.getElementById('opt-stopwords');
    dom.reserved = document.getElementById('opt-reserved');
    dom.debug = document.getElementById('opt-debug');
    dom.customRules = document.getElementById('opt-customrules');
  };

  var bind = function() {
    dom.convert.addEventListener('click', convert);
    dom.input.addEventListener('input', convert);
    dom.copy.addEventListener('click', function() { copyToClipboard(dom.output.textContent); });
    dom.historyClear.addEventListener('click', function() { saveHistory([]); renderHistory(); });
    [dom.version, dom.compare, dom.separator, dom.locale, dom.punctuation, dom.truncate, dom.maxLength, dom.priority, dom.reservedSuffix, dom.symbols, dom.lowercase, dom.stopwords, dom.reserved, dom.debug].forEach(function(el) {
      el.addEventListener('change', convert);
    });
    dom.customRules.addEventListener('input', convert);
  };

  var main = function() {
    cache();
    bootstrapState();
    bind();
    renderHistory();
    if (dom.input.value) { convert(); }
    dom.input.focus();
  };

  document.addEventListener('DOMContentLoaded', main);
}();
