/**
 * @since 14/12/1 上午10:02
 * @author vivaxy
 */
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');

var paths = {
    src: ['_site/*'],
    del: ['index.html', 'css', 'img', 'js', '2011', '2014', '2015'],
    dest: ''
};

gulp.task('move', ['clean'], shell.task('cp -r ./_site/* ./'));

gulp.task('clean', function(cb){
    return del(paths.del, cb);
});

gulp.task('serve', shell.task('jekyll serve'));

gulp.task('default', ['move'], function(cb){
    return del(paths.src, cb);
});