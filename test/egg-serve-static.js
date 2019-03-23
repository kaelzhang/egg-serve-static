const test = require('ava')
const path = require('path')
const {Roe} = require('roe')
const supertest = require('supertest')

const content = `// a.js
`

const fixture = s => path.join(__dirname, 'fixtures', s)

const CASES = [
  ['/js/a.js', content],
  ['/cached-js/a.js', content, 60]
]

let app

test.before(async () => {
  app = new Roe({
    baseDir: fixture('normal')
  })

  await app.ready()
})

CASES.forEach(([url, c, age]) => {
  test(url, async t => {
    const r = supertest(app.callback())
    .get(url)
    .expect(200, c)

    await r
    t.pass()
  })
})
