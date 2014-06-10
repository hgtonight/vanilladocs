module.exports = {
  docs: {
    files: [
      'docs/**/*',
      'site/layouts/*',
      'site/partials/*',
      'site/documents/*'
    ],
    tasks: [
      'docs'
    ]
  },
  less: {
    files: [
      'site/assets/**/*.less'
    ],
    tasks: [
      'less'
    ]
  },
  js: {
    files: [
      'site/assets/**/*.js'
    ],
    tasks: [
      'copy:js'
    ]
  },
  livereload: {
    options: {
      'livereload': true
    },
    files: [
      '.tmp/assets/*.{css,js}',
      'dist/**/*.html'
    ]
  }
};
