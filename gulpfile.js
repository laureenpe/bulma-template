var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');

gulp.task('script', function(){
	gulp.src(['node_modules/jquery/dist/jquery.js','assets/js/*.js'])
	.pipe(concat('script.js'))
	.pipe(gulp.dest('dist/js/'));
});

gulp.task('style', function(){
	gulp.src(['node_modules/bulma/css/bulma.css','assets/sass/main.scss'])
	.pipe(sass().on('error', sass.logError))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(concat('style.min.css'))
	.pipe(gulp.dest('dist/css/'));
});

gulp.task('webserver', function(){
	gulp.src('../bulma-init/')
	.pipe(webserver({
		fallback: 'index.html',
		livereload: true,
		directoryListing: false,
		open: true
	}));
});

gulp.task('watch', function(){
	gulp.watch('assets/sass/*.scss',['style']);
});

gulp.task('watchjs', function() {
	gulp.watch('assets/js/*.js', ['script']);
    gulp.watch('assets/css/*.css', ['style']);
});

gulp.task('watchjs', function() {
    gulp.watch('assets/js/*.js', ['script']);
});

gulp.task('default', ['script', 'style', 'webserver', 'watch', 'watchjs']);