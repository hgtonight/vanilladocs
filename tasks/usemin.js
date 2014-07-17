'use strict';

module.exports = {
  options: {
    assetsDirs: [
      'dist'
    ]
  , patterns: {
      js: [
        [/url:\s*['"]([^"']+\.json)['"]/gm, 'Update references to local Ajax\'ed JSON documents']
      ]
    }
  }
, js: 'dist/assets/*.js'
, html: 'dist/**/*.html'
};
