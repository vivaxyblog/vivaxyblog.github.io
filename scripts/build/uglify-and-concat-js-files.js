/**
 * @since 20171216 14:38
 * @author vivaxy
 */

const path = require('path');
const uglifyJS = require('uglify-js');
const fse = require('fs-extra');

const { projectRootPath } = require('./configs');

module.exports = async() => {
    const uglifyJsFilePathList = [
        path.join(projectRootPath, 'js', 'turbolinks', 'index.js'),
        path.join(projectRootPath, 'js', 'analysis', 'ba.js'),
        path.join(projectRootPath, 'js', 'sw', 'index.js'),
    ];
    const results = await Promise.all(uglifyJsFilePathList.map((jsFilePath) => {
        return (async() => {
                const jsFileContent = await fse.readFile(jsFilePath, 'utf8');
                return uglifyJS.minify(jsFileContent).code;
            }
        )();
    }));
    const concatContent = await fse.readFile(path.join(projectRootPath, 'js', 'turbolinks', 'turbolinks.js'), 'utf8');
    await fse.writeFile(path.join(projectRootPath, 'js', 'index.min.js'), [concatContent, ...results].join('\n\n'));
};
