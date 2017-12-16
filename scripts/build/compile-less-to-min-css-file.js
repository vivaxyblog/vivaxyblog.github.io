/**
 * @since 20171216 14:11
 * @author vivaxy
 */

const path = require('path');
const less = require('less');
const fse = require('fs-extra');
const cssmin = require('cssmin');

const { projectRootPath } = require('./configs');

module.exports = async() => {
    const lessEntryPath = path.join(projectRootPath, 'less', 'index.less');
    const lessEntryContent = await fse.readFile(lessEntryPath, 'utf8');
    const output = await less.render(lessEntryContent, { paths: [path.join(projectRootPath, 'less')] });
    await fse.writeFile(path.join(projectRootPath, 'css', 'index.min.css'), cssmin(output.css));
};
