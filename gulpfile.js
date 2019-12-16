const { series, parallel } = require('gulp');

const gulp = require('gulp');
const gulp_prettier = require('gulp-prettier');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const del = require('del');
const path = require('path');

exports.build = series(
  clean,
  parallel(
    build,
    copyconfigfiles
  )
);
exports.clean = clean;
exports.copyconfigfiles = copyconfigfiles;
exports.test = test;
exports.pretty = pretty;
exports.default = series(
  clean,
  parallel(
    build,
    copyconfigfiles
  )
);

const tsProject = ts.createProject('./tsconfig.json');

function build(cb) {
  const merge = require('merge2');

  var tsResult = tsProject.src()
      .pipe(tsProject());


  return merge([
    tsResult.dts.pipe(gulp.dest('./definitions')),
    tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
  ]);
}

function clean(cb) {
  return del([
    'dist/**/*'
  ]);
}

function test(cb) {
  return gulp.src('./dist/test/**/*.ts')
    .pipe(tsProject())
    .pipe(mocha( { require: ['ts-node/register'] } ))
    .on('end', function() { cb; });
}

function copyconfigfiles(cb) {
    return gulp.src('./config/**/*.json')
        .pipe(gulp.dest('./dist/config/'));
}

function pretty(cb) {
  return tsProject.src()
      .pipe(gulp_prettier.check(
    {
      config: './.prettierrc.js',
      ignorePath: './prettierignore'
    }));
}
