#!/usr/bin/env node
const { projectInit, addDependencies, copyAssets } = require('./src/jobs');

console.log(
  'This script automates the creation of a basic TypeScript application\n' +
  '(typescript + sass + gulp + eslint + jest + browserify)\n'
);

projectInit()
  .then(addDependencies)
  .then(copyAssets)
  .then(() => console.log('Success.'))
  .catch(console.error);
