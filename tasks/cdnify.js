'use strict';

var url  = require('url')
  , path = require('path');

module.exports = {
  options: {
    base: url.format({
      protocol: false
    , hostname: 'cdn.rawgit.com'
    , pathname: path.join(
        process.env.GH_OWNER || ''
      , process.env.GH_PROJECT_NAME || ''
      , 'gh-pages'
      )
    })
  }
, dist: {
    files: [{
      expand: true
    , cwd: 'dist'
    , src: '**/*.html'
    , dest: 'dist'
    }]
  }
};
