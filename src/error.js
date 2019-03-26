const {Errors} = require('err-object')

const {E, error} = new Errors()

E('INVALID_STATIC_ROOT', 'options.root must be a string, but got %s')
E('INVALID_STATIC_FILES', 'files must be an object, but got %s')

module.exports = error
