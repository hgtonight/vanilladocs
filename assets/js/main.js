;(function ($, window, document, undefined) {

  window.docsInit = function () {

    // Build Table of Contents
    $('.content').anchorific({
        navigation  : '.js-toc-page' // Position of navigation
      , speed       : 200            // Speed of sliding back to top
      , anchorClass : 'anchor'       // Class of anchor links
      , anchorText  : '#'            // Prepended or appended to anchor headings
      , top         : '.top'         // Back to top button or link class
      , spy         : true           // Scroll spy
      , position    : 'append'       // Position of anchor text
    });

    // Asynchronous Google Analytics
    ga('send', 'pageview', location.pathname + location.search);

  };

})(jQuery, window, document);
