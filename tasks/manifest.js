'use strict';

module.exports = {
  dist: {
    options: {
      basePath: 'dist/'
    , verbose: false
    }
  , src: [
      '**/*.{html,css,js,json,svg,png,jpg}'
    ]
  , dest: 'dist/manifest.appcache'
  }
};
