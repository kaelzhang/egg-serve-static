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
const serve = require('egg-serve-static')

module.exports = serve({
  '/js': 'static',
  '/min': {
    root: 'compressed',
    // miniseconds
    maxAge: 60000
  }
}, {
  root: '/path/to/project'
})
```

### serve(files, options)

- **files** `Object` static files to serve
- **options** `Object` configurations
  - **root** `path` root path to search the files
  - **maxAge?** `number=0` Browser cache max-age in milliseconds

## License

MIT
