/**
 * @since 20171216 13:57
 * @author vivaxy
 */

const path = require('path');
const fse = require('fs-extra');

const { projectRootPath } = require('./configs');

module.exports = async() => {
    const swJsFilePath = path.join(projectRootPath, 'sw.js');
    const swJsFileContent = await fse.readFile(swJsFilePath, 'utf8');
    const leadingString = '\'cache-datetime-';
    const startingIndex = swJsFileContent.indexOf(leadingString) + leadingString.length;
    const date = String(new Date().getTime());
    const previousDate = swJsFileContent.slice(startingIndex, startingIndex + date.length);
    fse.writeFile(swJsFilePath, swJsFileContent.replace(previousDate, date));
};
