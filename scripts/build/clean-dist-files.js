/**
 * @since 20171216 14:26
 * @author vivaxy
 */
const path = require('path');
const fse = require('fs-extra');

const { projectRootPath } = require('./configs');

module.exports = async() => {
  const toRemovePathList = [
    path.join(projectRootPath, 'css'),
    path.join(projectRootPath, 'js', 'index.min.js'),
  ];
  await Promise.all(toRemovePathList.map((toRemovePath) => {
    return fse.remove(toRemovePath);
  }));
};
