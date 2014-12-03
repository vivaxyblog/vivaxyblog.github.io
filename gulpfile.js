/**
 * @since 14/12/1 上午10:02
 * @author vivaxy
 */
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');

var paths = {
    clean1: ['index.html', 'css', 'img', 'js', '2011', '2014', '2015'],
    clean2: ['_site']
};

var cmd = 'cp -r ./_site/* ./';

gulp.task('move', ['clean1'], shell.task(cmd));

gulp.task('clean1', function(cb){
    return del(paths.clean1, cb);
});

gulp.task('serve', shell.task('jekyll serve'));

gulp.task('default', ['move'], function(cb){
    return del(paths.clean2, cb);
});