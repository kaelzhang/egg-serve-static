const path = require('path')
const mount = require('koa-mount')
const createServe = require('koa-static')
const {ensureLeading} = require('pre-suf')

const error = require('./error')

const ensurePath = s => ensureLeading(s, '/')

const serve = (router, s, cwd) => {
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
      router.use(serve)
      return
    }

    router.use(mount(ensurePath(staticPath), serve))
  })
}

module.exports = ({
  static: staticFiles = {},
  root
} = {}) => {
  if (typeof root !== 'string') {
    throw error('INVALID_STATIC_ROOT', root)
  }

  return ({
    router
  }) => {
    serve(router, staticFiles, root)
  }
}
