const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');

var tsProject = ts.createProject('./tsconfig.json');

gulp.task('build', function() {
    const merge = require('merge2');
    const tsProject = ts.createProject('tsconfig.json', { noImplicitAny: true });
  
    var tsResult = tsProject.src()
        .pipe(tsProject());
  
    return merge([
        tsResult.dts.pipe(gulp.dest('./definitions')),
        tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir))
    ]);
});

gulp.task('clean', function () {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('test', function(cb) {
  var ret = gulp.src('./dist/test/**/*.ts')
  .pipe(tsProject())
  .pipe(mocha( { require: ['ts-node/register'] } ))
  .on('end', function() { cb; });

  return ret;
});

gulp.task('default', function(cb) {
    runSequence('clean', 'build', 'test', cb);
});
