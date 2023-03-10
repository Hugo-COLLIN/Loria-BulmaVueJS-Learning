const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost:8080',
      show: true,
      browser: 'webkit',
      video: {
        enabled: true,
      },
      subtitle: {
        enabled: true,
      },
    }
  },
  include: {
    I: './steps_file.js'
  },
  name: 'tests',
  plugins: {
    subtitles: {
      enabled: true
    },
    autoDelay: {
      enabled: true,
      delayAfter: 750
    },
  }
}