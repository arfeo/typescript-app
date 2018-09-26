#!/usr/bin/env node

const fs = require('fs');
const PUBLIC_DIR_NAME = 'public';

const copyAssets = () => {
  console.log('Step 3. Copying assets...');

  ['gulpfile.js', 'tsconfig.json', 'tslint.json'].map((file) => {
    fs.copyFileSync(`${__dirname}/../assets/${file}`, file, console.error);
  });

  createDirectory(PUBLIC_DIR_NAME).then(() => {
    ['index.html'].map((file) => {
      fs.copyFileSync(
        `${__dirname}/../assets/${file}`,
        `${PUBLIC_DIR_NAME}/${file}`,
        console.error
      );
    });
  });
};

const createSources = () => {
  const sourceDir = 'src';

  console.log('Step 4. Creating source files...');

  return createDirectory(sourceDir)
    .then(writeToFile(
      `${sourceDir}/index.ts`,
      `window.onload = () => { document.getElementById('root').innerHTML = 'TypeScript app. It works!'; }`,
    )).then(writeToFile(
      `${sourceDir}/styles.scss`,
      `body { background-color: black; color: white; }`,
    ));
};

const createDirectory = (dir) => {
  return new Promise((resolve) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    resolve();
  });
};

const readFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data.toString());
    });
  });
};

const writeToFile = (filePath, fileContent) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, fileContent, (err) => {
      if (err) {
        reject(err);
      }

      resolve();
    });
  });
};

module.exports = {
  copyAssets,
  createSources,
  readFromFile,
  writeToFile,
};
