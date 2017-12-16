/**
 * @since 20171216 14:33
 * @author vivaxy
 */

const path = require('path');
const fse = require('fs-extra');

const { projectRootPath } = require('./configs');

module.exports = async() => {
    await fse.copy(path.join(projectRootPath, 'less', 'resource'), path.join(projectRootPath, 'css', 'resource'));
};
