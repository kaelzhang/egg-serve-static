[![Build Status](https://travis-ci.org/kaelzhang/egg-serve-static.svg?branch=master)](https://travis-ci.org/kaelzhang/egg-serve-static)
[![Coverage](https://codecov.io/gh/kaelzhang/egg-serve-static/branch/master/graph/badge.svg)](https://codecov.io/gh/kaelzhang/egg-serve-static)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/egg-serve-static?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/egg-serve-static)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/egg-serve-static.svg)](http://badge.fury.io/js/egg-serve-static)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/egg-serve-static.svg)](https://www.npmjs.org/package/egg-serve-static)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/egg-serve-static.svg)](https://david-dm.org/kaelzhang/egg-serve-static)
-->

# egg-serve-static

Utilities to create [roe](https://github.com/kaelzhang/roe)/[egg](https://npmjs.org/package/egg) route definitions to serve static files.

## Install

```sh
$ npm i egg-serve-static
```

## Usage

```
project
|-- app
|   |-- router.js
|-- static
|   |-- a.js
|-- compressed
|   |-- a.min.js
```

app/router.js

```js
const define = require('egg-serve-static')

module.exports = define({
  '/js': 'static',
  '/min': {
    root: 'compressed',
    // Override the default max-age
    maxAge: 60000
  }
}, {
  root: '/path/to/project',
  // Default max-age in miniseconds
  maxAge: 120000
})
```

## define(files, options)

- **files** `Object` static files to serve
- **options** `Object` configurations
  - **root** `path` root path to search the files
  - **maxAge?** `number=0` Browser cache max-age in milliseconds

Returns `Function(app)` a roe/egg router function which accepts `app` as the only one parameter.

### define.serve(app, path, root, options)

- **app** `RoeApplication | EggApplication`
- **path** `string` pathname of the request
- **root** `path`
- **options** `Object` the same as above

Add the router definition to `app`, then:

```sh
curl http://localhost:$port$path/a.js

# The content of file `${root}/a.js` will be sent
```

## License

MIT
