'use strict';

var docpad = require('docpad');

module.exports = function (grunt, options) {
  var config = {
    srcPath: 'site'
  , outPath: 'dist'
  , documentsPaths: [
      'documents/'
    , '../docs/'
    ]
  , collections: {
      docs: function () {
        return this.getCollection('html').findAllLive({
          layout: {
            $has: ['docs', 'api']
          }
        });
      }
    }
  , plugins: {
      cleanurls: {
        static: true
      , collectionName: 'docs'
      }
    , sitemap: {
        collectionName: 'docs'
      }
    , shortcodeparser: {
        codes: require('../site/shortcodes')
      }
    }
  , templateData: {
      site: {
        title: 'Vanilla Documentation'
      , url: 'http://docs.vanillaforums.com'
      }
    }
  };

  grunt.registerTask('docs', function () {
    var done = this.async();

    docpad.createInstance(config, function (err, instance) {
      instance.action('generate', function (err) {
        if (err) {
          return grunt.warn(err);
        }

        done();
      });
    });
  });
};
