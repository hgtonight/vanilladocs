'use strict';

var docpad = require('docpad');

module.exports = function (grunt, options) {
  var config = require('../site/config');

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
