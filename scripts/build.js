/**
 * @since 20171216 13:49
 * @author vivaxy
 */
const cleanDistFiles = require('./build/clean-dist-files');
const copyCssResources = require('./build/copy-css-resources');
const compileLessToMinCssFile = require('./build/compile-less-to-min-css-file');
const updateServiceWorkerCacheName = require('./build/update-service-worker-cache-name');
const uglifyAndConcatJsFiles = require('./build/uglify-and-concat-js-files');

const main = async() => {
  await cleanDistFiles();
  await copyCssResources();
  await compileLessToMinCssFile();
  await uglifyAndConcatJsFiles();
  await updateServiceWorkerCacheName();
};

main().catch((ex) => {
  console.error(ex);
  process.exit(1);
});
