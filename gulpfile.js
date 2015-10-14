var gulp = require('gulp'),
  browserify = require('browserify'),
  source = require('vinyl-source-stream'),
  reactify = require('reactify');

var jsxSrc = './public/javascripts/src/app.jsx',
  jsFile = 'app.js',
  jsDest = './public/javascripts/build/';

/*
 * Transform jsx to js
 */

gulp.task('js', function(){
  return browserify(jsxSrc)
    .transform(reactify)
    .bundle()
    .pipe(source(jsFile))
    .pipe(gulp.dest(jsDest));

});

gulp.task('default', ['js']);
