const path = require('path')
const mount = require('koa-mount')
const createServe = require('koa-static')
const {ensureLeading} = require('pre-suf')

const error = require('./error')

const ensurePath = s => ensureLeading(s, '/')

const serve = (app, s, cwd) => {
  Object.keys(s).forEach(staticPath => {
    const def = s[staticPath]
    const {
      root,
      ...options
    } = typeof def === 'string'
      ? {
        root: def
      }
      : def

    // Compatibility
    if (options.maxAge) {
      options.maxage = options.maxAge
    }

    const serve = createServe(path.join(cwd, root), options)
    // Default static root
    if (staticPath === 'default') {
      app.use(serve)
      return
    }

    app.use(mount(ensurePath(staticPath), serve))
  })
}

module.exports = ({
  static: staticFiles = {},
  root
} = {}) => {
  if (typeof root !== 'string') {
    throw error('INVALID_STATIC_ROOT', root)
  }

  return app => {
    serve(app, staticFiles, root)
  }
}
