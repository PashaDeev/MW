const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const less = require('gulp-less');
const cssmin = require('gulp-csso');
const sourcemap = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const gulpsync = require('gulp-sync')(gulp);
const browsersync = require('browser-sync').create();
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const INITIAL = {
  pug: './pug/screens/index.pug',
  less: './less/index.less',
  js: './js/index.js'
};

const WATCH = {
  html: './pug/**/*.pug',
  style: './less/**/*.less',
  js: './js/**/*.js'
};

const PATH = {
  html: {
    src: './html/',
  },
  style: {
    src: './styles',
  },
  build: '../build/',
  clean: '../build'
};

const COPY = {
  img: './img/**',
  fonts: './fonts/**/*.{woff,woff2,otf}'
};

gulp.task('default', ['build'], function () {
  browsersync.init({
    server: PATH.build
  });

  gulp.watch(WATCH.html, ['html']);
  gulp.watch(WATCH.style, ['style']);
  gulp.watch(WATCH.js, ['bundle']);
  gulp.watch([COPY.img, COPY.fonts], ['copy']);
});

gulp.task('html', function () {
  return gulp.src(INITIAL.pug)
    .pipe(plumber())
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(PATH.html.src))
    .pipe(gulp.dest(PATH.build))
    .pipe(browsersync.stream())
});

gulp.task('style', function () {
  return gulp.src(INITIAL.less)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
        autoprefixer({
            browsers: [
                'last 1 version',
                'last 2 Chrome versions',
                'last 2 Firefox versions',
                'last 2 Opera versions',
                'last 2 Edge versions'
            ]
        })]))
    .pipe(sourcemap.write())
    .pipe(gulp.dest(PATH.style.src))
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(PATH.build))
    .pipe(browsersync.stream())
});

gulp.task('bundle', function () {
  return gulp.src(INITIAL.js)
    .pipe(plumber())
    .pipe(named())
    .pipe(webpack( require('./webpack.config') ))
    .pipe(gulp.dest(PATH.build))
    .pipe(browsersync.stream())
});

gulp.task('clean', function () {
  return gulp.src(PATH.clean, {read: false})
    .pipe(clean({force: true}))
});

gulp.task('copy', function () {
  return gulp.src([
    COPY.img,
    COPY.fonts
  ])
    .pipe(plumber())
    .pipe(gulp.dest(PATH.build))
});


gulp.task('build', gulpsync.sync([
  'clean',
  [
    'html',
    'style',
    'bundle',
    'copy',
  ]
]));



