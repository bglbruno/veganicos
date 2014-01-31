var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var rename = require('gulp-rename');

gulp.task('scripts', function(){
	return gulp
		.src(['./public/javascripts/*.js'])
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min",
			ext: ".js"
		}))
		.pipe(gulp.dest('./public/javascripts/min'));
});
