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
  , 'rev'
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
  , 'cdnify'
  , 'gh-pages'
  ]
, default: [
    'wiredep'
  , 'build'
  ]
};
