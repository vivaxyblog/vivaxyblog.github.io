/**
 * @since 14/12/1 上午10:02
 * @author vivaxy
 */
var gulp = require('gulp');
var del = require('del');
var shell = require('gulp-shell');
var fs = require('fs');

var paths = {
    clean1: ['index.html', 'css', 'image', 'js', '2011', '2014', '2015'],
    clean2: ['_site']
};

var cmdMove = 'cp -r ./_site/* ./';
var cmdGit = 'git add .';

gulp.task('clean1', function (cb) {
    fs.open(paths.clean2[0], 'r', function (err, fd) {
        if (err) return err;
        return del(paths.clean1, cb);
    });
});

gulp.task('move', ['clean1'], shell.task(cmdMove));

gulp.task('clean2', ['move'], function (cb) {
    return del(paths.clean2, cb);
});

/**
 * default task
 */
gulp.task('default', ['clean2'], shell.task(cmdGit));

