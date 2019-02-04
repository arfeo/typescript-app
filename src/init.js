#!/usr/bin/env node

const npmRun = require('npm-run');
const { readFromFile, writeToFile } = require('./files');

const projectInit = () => {
  console.log('Step 1. Initializing the package...');

  return runScript('npm init -y', true);
};

const addDependencies = () => {
  const dependencies = [
    'browser-sync',
    'browserify',
    'del',
    'gulp',
    'gulp-concat',
    'gulp-sass',
    'gulp-tslint',
    'gulp-watch',
    'tsify',
    'tslint',
    'typescript',
    'vinyl-buffer',
    'vinyl-source-stream',
  ];

  console.log('Step 2. Adding dependencies...');

  return runScript(
    `${__dirname}/../node_modules/.bin/npm-add-dependencies --dev  ${dependencies.join(' ')}`,
    true
  ).then(() => {
    return readFromFile('package.json').then(async (data) => {
      let json;

      try {
        json = JSON.parse(data);
      } catch (e) {
        console.error('Could not parse package.json. Stop.');
        process.exit(1);
      }

      // Gulp version hack
      const devDependencies = json['devDependencies'];
      const gulpVersion = devDependencies ? devDependencies['gulp'] : null;

      if (gulpVersion) {
        const parsed = gulpVersion.match(/(\d+).?(\d?).?(\d?)/);

        if (parsed && parsed[1] && parseInt(parsed[1]) < 4) {
          json['devDependencies']['gulp'] = '^4.0.0';

          console.log('Gulp version set to ^4.0.0');

          await writeToFile('package.json', JSON.stringify(json, null, 2));
        }
      }
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
