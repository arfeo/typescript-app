#!/usr/bin/env node
const npmRun = require('npm-run');
const { readFromFile, writeToFile } = require('./files');

const projectInit = () => {
  console.log('Step 1. Initializing the package...');

  return runScript('npm init -y', true);
};

const addDependencies = () => {
  const dependencies = [
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'browser-sync',
    'browserify',
    'del',
    'gulp',
    'gulp-concat',
    'gulp-eslint',
    'gulp-sass',
    'gulp-uglify',
    'gulp-watch',
    'tsify',
    'typescript',
    'vinyl-buffer',
    'vinyl-source-stream',
  ];

  console.log('Step 2. Adding dependencies...');

  return runScript(
    `${__dirname}/../node_modules/.bin/add-dependencies --dev  ${dependencies.join(' ')}`,
    true
  ).then(() => {
    return readFromFile('package.json').then(async (data) => {
      let json = {};

      try {
        json = JSON.parse(data.toString());
      } catch (e) {
        console.error('Could not parse package.json. Stop.');
        process.exit(1);
      }

      // Update `package.json` file
      json.scripts = {
        start: 'gulp',
        build: 'gulp build',
        test: 'echo "Error: no test specified" && exit 1',
      };

      await writeToFile('package.json', JSON.stringify(json, null, 2));
    });
  }).catch(console.error);
};

const runScript = (script, mute = false) => {
  return new Promise((resolve) => {
    const stdout = npmRun.execSync(script);

    if (!mute) {
      console.log(stdout.toString());
    }

    resolve();
  });
};

module.exports = {
  projectInit,
  addDependencies,
};
