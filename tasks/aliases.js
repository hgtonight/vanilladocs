'use strict';

module.exports = {
  build: [
    'clean'
  , 'docs'
  , 'less'
  , 'copy'
  , 'uncss'
  , 'useminPrepare'
  , 'concat'
  , 'uglify'
  , 'cssmin'
  , 'filerev'
  , 'usemin'
  , 'htmlmin'
  , 'manifest'
  ]
, serve: [
    'docs'
  , 'less'
  , 'copy'
  , 'connect'
  , 'watch'
  ]
, deploy: [
    'wiredep'
  , 'build'
  , 'gh-pages'
  ]
, default: [
    'wiredep'
  , 'build'
  ]
};
