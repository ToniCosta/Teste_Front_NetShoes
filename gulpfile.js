'use strict';

var gulp 	   			= require('gulp'),
		plumber  			= require('gulp-plumber'),
		logger   			= require('gulp-logger'),
		sass 	   			= require('gulp-sass'),
		uglify   			= require('gulp-uglify'),
		concat   			= require('gulp-concat'),
		jshint   			= require('gulp-jshint'),
		jshintStylish = require('jshint-stylish'),
		imagemin 			= require('gulp-imagemin'),
		htmlreplace   = require('gulp-html-replace'),
		htmlmin  			= require('gulp-html-minifier'),
		browserSync 	= require('browser-sync'),
		zip 		 			= require('gulp-zip');

var onError = function (error) {
  console.log(error.message);
  this.emit('end');
}

gulp.task('sass', function(){
	gulp.src('source/scss/**/*.scss')
		.pipe(plumber({errorHandler: onError}))
		.pipe(logger({
			before: 'starting sass task...',
			after: 'sass task complete!',
			extname: '.scss',
			showChange: true
		}))
		.pipe(sass({outputStyle: 'compressed'}))
		.pipe(gulp.dest('public/assets/css/'));
});

gulp.task('scripts', ['jshint'], function() {
  gulp.src([
    'source/js/functions.js',
    'source/js/preloader.js',
    'source/js/carrinho.js',
    'source/js/listaProdutos.js',
    'source/js/adicionarProdutos.js'
  ])
  	.pipe(plumber({errorHandler: onError}))
		.pipe(logger({
			before: 'starting scripts task...',
			after: 'scripts task complete!',
			extname: '.js',
			showChange: true
		}))
	  .pipe(concat('netshoes_app.min.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('public/assets/js/'));
});

gulp.task('jshint', function(){
	return gulp.src('source/js/**/*.js')
		.pipe(plumber({errorHandler: onError}))
		.pipe(logger({
			before: 'starting hint task...',
			after: 'hint task complete!',
			showChange: true
		}))
		.pipe(jshint())
		.pipe(jshint.reporter(jshintStylish));
});

gulp.task('images', function(){
	gulp.src('source/imagens/**/*')
		.pipe(plumber({errorHandler: onError}))
		.pipe(logger({
			before: 'starting images task...',
			after: 'images task complete!',
			showChange: true
		}))
		.pipe(imagemin({
		  interlaced: true,
		  progressive: true,
		  optimizationLevel: 7,
		  svgoPlugins: [{removeViewBox: true}]
		}))
		.pipe(gulp.dest('public/assets/imagens/'))
});

gulp.task('htmlreplace', function(){
	gulp.src('source/html/**/*.html')
		.pipe(htmlreplace({
			'css': 'assets/css/style.min.css',
			'js': 'assets/js/netshoes_app.min.js'
		}))
		.pipe(gulp.dest('public/'));
});

gulp.task('watch', function(){
	gulp.watch('source/js/**/*.js', ['scripts']);
	gulp.watch('source/scss/**/*.scss', ['sass']);
	gulp.watch('source/img/**/*', ['images']);
	gulp.watch('source/html/**/*.html', ['htmlreplace']);
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: 'public/'
    }
  });

	gulp.watch('public/**/*').on('change', browserSync.reload);
});

gulp.task('default', ['sass', 'scripts', 'jshint', 'htmlreplace', 'watch', 'server']);