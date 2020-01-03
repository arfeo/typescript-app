const npmRun = require('npm-run');

const runScript = (script, mute = false) => {
  return new Promise((resolve) => {
    const stdout = npmRun.execSync(script);

    if (!mute) {
      console.log(stdout.toString());
    }

    resolve();
  });
};

module.exports = { runScript };
