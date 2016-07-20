---
layout: post
title: Setup Gulp Livereload
---

## Gulp

[Gulp](http://gulpjs.com/) is a new build tool for web developers.

## Livereload

[Livereload](http://livereload.com/) can reload pages when changes detected.

[Grunt livereload](https://www.npmjs.org/package/grunt-livereload).

## Install gulp livereload

1. Install chrome extension. [link](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

2. Install npm module. `npm install --save-dev gulp-livereload`

## Setup livereload with gulp watch

1. Edit gulpfile.js

```js
// import gulp
var gulp = require('gulp');
// import some module else
var shell = require('gulp-shell');
// import livereload
var livereload = require('gulp-livereload');
// set path
var paths = {
    src: 'src/*',
    des: 'bin-debug/*/*.js'
};
// set build task
gulp.task('build', shell.task('egret build'));
// set watch task
gulp.task('watch', function() {
    // when files in paths.src changed, build task will be triggered
    gulp.watch(paths.src, ['build']);
    // start livereload listener
    // a server will be started, livereload chrome extension will connect this server.
    livereload.listen();
    // when files in paths.des changed, trigger livereload, and this will trigger reload on chrome pages
    // here we don't use source files, because typescript changes need to be compiled to javascript, then changes take effect
    gulp.watch(paths.des).on('change', livereload.changed);
});
// set server task
gulp.task('run', shell.task('egret startserver'));
```

2. Open pages in chrome.

3. Click livereload extension, and when the hollow circle becomes solid, it works.

4. Now we edit some files, save it, pages reload automatically\! WebStorm will save file auto, so changes take effect when typing.

## Example

[http://github.com/vivaxy/eliminate/](http://github.com/vivaxy/eliminate/)

## Problems

When destination files compiled one by one, livereload will be triggered each time\! How to solve it?

## Reference

[Gulp Livereload](https://www.npmjs.org/package/gulp-livereload)

