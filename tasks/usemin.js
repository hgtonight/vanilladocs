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
, html: 'dist/**/*.html'
, js: 'dist/assets/*.js'
};
