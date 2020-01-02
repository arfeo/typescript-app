#!/usr/bin/env node
const { projectInit, addDependencies } = require('./src/init.js');
const { copyAssets, createSources } = require('./src/files');

console.log(
  'This script automates the creation of a basic TypeScript application\n' +
  '(typescript + sass + gulp + eslint + browserify)\n'
);

projectInit()
  .then(addDependencies)
  .then(copyAssets)
  .then(createSources)
  .then(() => console.log('Success.'))
  .catch(console.error);
