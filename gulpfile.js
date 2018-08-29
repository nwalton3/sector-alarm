/* gulpfile.js */

// Include gulp
const gulp = require('gulp'); 

// Include Our Plugins
// const concat = require('gulp-concat');
// const ext_replace = require('gulp-ext-replace');
// const jshint = require('gulp-jshint');
// const pug = require('gulp-pug');
// const rename = require('gulp-rename');
// const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');



// Sass
var sassConfig = {
	inputDirectory: 'sass/*.sass',
	outputDirectory: 'dist/css',
	options: {
		outputStyle: 'compressed'
	}
}

gulp.task('sass', function() {
	return gulp
		.src(sassConfig.inputDirectory)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass(sassConfig.options).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(sassConfig.outputDirectory))
		.pipe(livereload());
});


// Connect server
gulp.task('connect', function() {
  connect.server({
    port: 9000,
    root: 'dist'
  });
});


// Watch task
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('sass/**/*.sass', ['sass']);
});


// Default Task
gulp.task('default', ['connect', 'sass', 'watch']);

