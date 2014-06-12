'use strict';

module.exports = {
  srcPath: 'site'
, outPath: 'dist'
, documentsPaths: [
    'documents/'
  , '../docs/'
  ]
, plugins: {
    cleanurls: {
      static: true
    }
  }
, templateData: {
    site: {
      title: 'Vanilla Documentation'
    , url: 'http://docs.vanillaforums.com'
    }
  }
};
