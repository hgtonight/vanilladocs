---
layout: nil
---

;(function (window, document, undefined) {
  // Nuke jQuery
  window.jQuery = undefined;

  window.init = function () {
    // Asynchronous Google Analytics
    ga('send', 'pageview', location.pathname + location.search);

    // Initialize Anchorify
    anchorify({
      sel: ['h1','h2','h3','h4','h5','h6'].map(function (h) {
        return '.js-markdown-body ' + h;
      }).join()
    , text: '#'
    , cssClass: 'anchor'
    , position: 'prepend'
    });
  }
})(window, document);

{% include assets/vendor/instantclick-3.0.0.min.js %}
{% include assets/vendor/anchorify-1.1.3.min.js %}
