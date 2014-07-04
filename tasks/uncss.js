'use strict';

module.exports = {
  dist: {
    options: {
      csspath: '.tmp/assets'
    , ignoreSheets: [/fonts.googleapis/]
    , htmlroot: '.tmp'
    , ignore: [
        '.open > .dropdown-menu'       // Open dropdown
      , '.dropdown-menu > li + li > a' // Consecutive dropdown links
      ]
    },
    files: {
      '.tmp/assets/docs.css': ['dist/**/*.html']
    }
  }
};
