const test = require('ava')
const path = require('path')
const {Roe} = require('roe')
const supertest = require('supertest')

const content = `// a.js
`

const fixture = s => path.join(__dirname, 'fixtures', s)

const CASES = [
  ['/js/a.js', content],
  ['/cached-js/a.js', content, 60],
  ['/b.js', `// b.js
`]
]

let app

test.before(async () => {
  app = new Roe({
    baseDir: fixture('normal')
  })

  await app.ready()
})

CASES.forEach(([url, c, maxAge = 0]) => {
  test(url, async t => {
    const r = supertest(app.callback())
    .get(url)
    .expect(200, c)
    .expect('Cache-Control', `max-age=${maxAge}`)

    await r
    t.pass()
  })
})

test('invalid root', t => {
  t.throws(() => new Roe({
    baseDir: fixture('error')
  }), /root must be a string, but got undefined/)
})
