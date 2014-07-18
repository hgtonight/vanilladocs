'use strict';

module.exports = {
  options: {
    assetsDirs: [
      'dist'
    ]
  , patterns: {
      searchgrun: [
        [/searchManifest\s=\s*['"]([^"']+\.json)['"]/gm, 'Update references to search manifest']
      ]
    }
  }
, html: 'dist/**/*.html'
, search: 'dist/**/*.html'
};
