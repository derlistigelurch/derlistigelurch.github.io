// Language switch for all pages. Elements carry lang="de" / lang="en" (and the class
// "l10n"); lang.css hides every language except the chosen one. Without JavaScript all
// languages stay visible. Order of choice: ?lang=xx, the saved choice, the browser language,
// English. To add a language, add it to LANGS and mark the new texts the same way.
(function () {
  var LANGS = ['de', 'en'];
  var KEY = 'lang';
  var root = document.documentElement;

  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) >= 0) return q;
    try {
      var saved = localStorage.getItem(KEY);
      if (LANGS.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var nav = navigator.languages || [navigator.language || ''];
    for (var i = 0; i < nav.length; i++) {
      var code = String(nav[i]).toLowerCase().slice(0, 2);
      if (LANGS.indexOf(code) >= 0) return code;
    }
    return 'en';
  }

  function set(lang, save) {
    root.lang = lang;
    root.setAttribute('data-lang', lang);
    var title = root.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    if (save) { try { localStorage.setItem(KEY, lang); } catch (e) {} }
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++)
      buttons[i].setAttribute('aria-pressed', String(buttons[i].getAttribute('data-set') === lang));
  }

  set(pick(), false);

  document.addEventListener('DOMContentLoaded', function () {
    set(root.getAttribute('data-lang'), false);
    var buttons = document.querySelectorAll('.lang-switch button');
    for (var i = 0; i < buttons.length; i++)
      buttons[i].addEventListener('click', function () { set(this.getAttribute('data-set'), true); });
  });
})();
