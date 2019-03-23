const {Errors} = require('err-object')

const {E, error} = new Errors()

E('INVALID_STATIC_ROOT', 'root must be a string, but got %s')

module.exports = error
