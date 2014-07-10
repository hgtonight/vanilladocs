'use strict';

module.exports = {
  dist: {
    options: {
      basePath: 'dist/'
    , verbose: false
    , exclude: [
        '404.html'
      ]
    }
  , src: [
      '**/index.html'
    , '**/*.{css,js,json,svg,png,jpg}'
    ]
  , dest: 'dist/manifest.appcache'
  }
};
