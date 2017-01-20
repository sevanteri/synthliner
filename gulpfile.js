var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');


gulp.task('build:scripts', function() {
    gulp.src(['./src/js/**/*.js'])
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build:vendor', function(callback) {
  return gulp.src([
      './node_modules/phaser/dist/pixi.js',
      './node_modules/phaser/dist/p2.js',
      './node_modules/phaser/dist/phaser-split.js',
    ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('build:styles', function() {
    gulp.src(['src/less/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest('dist/build'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build:html', function() {
    gulp.src("src/*.html")
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build:images', function() {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('clean', function() {
    gulp.src("src/*.html")
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/",
        },
        port: 8000
    });
});

gulp.task('scaffold', shell.task([
  'mkdir dist',
  'mkdir dist/assets',
  'mkdir dist/js'
  ]
));

gulp.task('clean', shell.task([
  'rm -rf dist/'
]));

gulp.task('watch', function() {
  gulp.watch('./src/js/**', function(event) {
      gulp.run('build:scripts');
  });

  gulp.watch('./src/less/**', function(event) {
      gulp.run('build:styles');
  });

  gulp.watch('./src/**/*.html', function(event) {
      gulp.run('build:html');
  });

  gulp.watch('./src/assets/**/*', function(event) {
      gulp.run('build:images');
  });
});


gulp.task('default', function() {
    gulp.run('browser-sync', 'build:vendor', 'build:scripts', 'build:styles', 'build:images', 'build:html', 'watch');
});
