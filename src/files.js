const fs = require('fs');

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

const copyFiles = (files, sourceDir, targetDir) => {
  if (!Array.isArray(files)) {
    return;
  }
  
  files.map((file) => {
    fs.copyFileSync(`${sourceDir}/${file}`, `${targetDir}/${file}`, (err) => {
      console.error(err);
    });
  });
};

module.exports = {
  createDirectory,
  readFromFile,
  writeToFile,
  copyFiles,
};
