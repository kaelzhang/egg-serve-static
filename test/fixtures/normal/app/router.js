const path = require('path')
const define = require('../../../..')

module.exports = define({
  static: {
    '/js': 'static',
    '/cached-js': {
      root: 'cache',
      // miniseconds
      maxAge: 60000
    }
  },

  root: path.join(__dirname, '..')
})