(function() {
  var KEY = 'theme-preference';

  function get() {
    var s = localStorage.getItem(KEY);
    if (s) return s;
    return 'dark';
  }

  function set(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(KEY, t);
    var el = document.querySelector('.theme-toggle');
    if (el) {
      el.textContent = t === 'dark' ? '☀' : '☾';
      el.title = t === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  window.toggleTheme = function() {
    var cur = document.documentElement.getAttribute('data-theme') || 'dark';
    set(cur === 'dark' ? 'light' : 'dark');
  };

  set(get());
})();
