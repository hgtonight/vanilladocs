;(function ($, window, document, undefined) {

  window.docsInit = function () {

    // Build Table of Contents
    $('.js-toc-page').toc({
      selector : '.js-content h2, .js-content h3'
    , ulClass  : 'nav' // Scrollspy integration
    });

    $('body').scrollspy({
      target : '.js-toc-page'
    , offset : 0
    });

    // Asynchronous Google Analytics
    ga('send', 'pageview', location.pathname + location.search);

  };

})(jQuery, window, document);
