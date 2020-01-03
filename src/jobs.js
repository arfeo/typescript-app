const fs = require('fs');
const { readFromFile, writeToFile, createDirectory, copyFiles } = require('./files');
const { runScript } = require('./utils');

const projectInit = () => {
  console.log('Step 1. Initializing the package...');

  return runScript('npm init -y', true);
};

const addDependencies = () => {
  const dependencies = [
    '@types/jest',
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
    'jest',
    'ts-jest',
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
      json.name = json.name.toLowerCase();

      json.scripts = {
        start: 'gulp',
        build: 'jest && gulp build',
        test: 'jest',
      };

      await writeToFile('package.json', JSON.stringify(json, null, 2));
    });
  }).catch(console.error);
};

const copyAssets = () => {
  console.log('Step 3. Copying assets...');

  const assetsPath = `${__dirname}/../assets`;
  const publicDir = 'public';
  const sourceDir = 'src';
  const testsDir = '__tests__';

  // Root files
  ['.eslintrc', 'gitignore', 'gulpfile.js', 'jest.config.js', 'tsconfig.json'].map((file) => {
    // npm cuts `.gitignore` files during installation, so we use the dirty hack for `.gitignore` here
    fs.copyFileSync(`${assetsPath}/${file}`, (file === 'gitignore' ? `.${file}` : file), (err) => {
      console.error(err);
    });
  });

  // Subdirectories
  return createDirectory(publicDir).then(() => {
    copyFiles(['index.html'], `${assetsPath}/${publicDir}`, `${publicDir}`);
  }).then(() => createDirectory(sourceDir).then(() => {
    copyFiles(['index.ts', 'styles.scss'], `${assetsPath}/${sourceDir}`, `${sourceDir}`);
  })).then(() => createDirectory(testsDir).then(() => {
    copyFiles(['example.test.ts'], `${assetsPath}/${testsDir}`, `${testsDir}`);
  })).catch(console.error);
};

module.exports = {
  projectInit,
  addDependencies,
  copyAssets,
};
