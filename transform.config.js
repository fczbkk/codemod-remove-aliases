const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '__testfixtures__'),
  aliases: {
    'components': path.resolve(__dirname, 'components'),
    'filters': path.resolve(__dirname, 'filters')
  }
}
