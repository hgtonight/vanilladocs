'use strict';

module.exports = {
  build: [
    'clean'
  , 'docs'
  , 'less'
  , 'copy'
  , 'useminPrepare'
  , 'concat'
  , 'uglify'
  , 'cssmin'
  , 'rev'
  , 'usemin'
  , 'htmlmin'
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
