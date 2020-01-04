#!/usr/bin/env node
const { projectInit, addDependencies, copyAssets } = require('./src/jobs');

console.log('Set up a ready-to-use TypeScript application (typescript + eslint + sass + jest + gulp + browsersync)\n');

projectInit()
  .then(addDependencies)
  .then(copyAssets)
  .then(() => console.log('Success.'))
  .catch(console.error);
