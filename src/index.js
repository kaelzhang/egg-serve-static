const path = require('path')
const mount = require('koa-mount')
const createServe = require('koa-static')
const {ensureLeading} = require('pre-suf')

const error = require('./error')

const ensurePath = s => ensureLeading(s, '/')
const maxAgeDefined = m => m || m === 0

const serve = (app, pathname, root, options = {}) => {
  options.maxage = options.maxAge

  app.use(mount(pathname, createServe(root, options)))
}

const serveStatic = (app, s, {
  root: cwd,
  maxAge: defaultMaxAge = 0
}) => {
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

    const defined = maxAgeDefined(options.maxAge)
    const maxAge = defined
      ? options.maxAge
      : defaultMaxAge

    serve(app, ensurePath(staticPath), path.join(cwd, root), {
      maxAge
    })
  })
}

module.exports = (staticFiles = {}, config = {}) => {
  if (Object(staticFiles) !== staticFiles) {
    throw error('INVALID_STATIC_FILES', staticFiles)
  }

  const {root} = config

  if (typeof root !== 'string') {
    throw error('INVALID_STATIC_ROOT', root)
  }

  return app => {
    serveStatic(app, staticFiles, config)
  }
}

module.exports.serve = serve
