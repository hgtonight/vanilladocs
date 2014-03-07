var gulp    = require('gulp')
  , sass    = require('gulp-sass')
  , rename  = require('gulp-rename')
  , minify  = require('gulp-minify-css')
  , uglify  = require('gulp-uglify')
  , concat  = require('gulp-concat')
  , plumber = require('gulp-plumber');

gulp.task('sass', function () {
  gulp.src([
    'assets/scss/**/*.scss'
  , '!assets/scss/**/_*.scss'
  ])
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['bower_components/bourbon/app/assets/stylesheets']
    }))
    .pipe(minify())
    .pipe(rename(function (path) {
      path.basename += '.min';
    }))
    .pipe(gulp.dest('assets/css'));
});

gulp.task('scripts', function () {
  gulp.src([
    'assets/js/vendor/anchorific-1.0.0.min.js'

    // Application specific Javascript
  , 'assets/js/main.js'
  ])
    .pipe(uglify())
    .pipe(concat('docs.min.js'))
    .pipe(gulp.dest('assets/js'));
});

gulp.task('watch', function() {
  gulp.watch('assets/scss/**', ['sass']);
  gulp.watch('assets/js/**', ['scripts']);
});
