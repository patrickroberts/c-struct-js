const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const gulp = require('gulp')
const jsdoc2md = require('jsdoc-to-markdown')

function order (a, b) {
  const { order: oa, memberof: ma, scope: sa, kind: ka } = a
  const { order: ob, memberof: mb, scope: sb, kind: kb } = b

  if (ma === mb && sa === sb && ka !== kb) {
    return kb.localeCompare(ka)
  }

  return oa - ob
}

gulp.task('docs', () => {
  return Promise.all([
    jsdoc2md.getTemplateData({
      configure: 'gulp/jsdoc.json',
      files: 'src/struct.js'
    }),
    readFile('gulp/template.hbs')
  ])
  .then(
    ([data, template]) => jsdoc2md.render({
      data: data.sort(order),
      template: template.toString('utf8')
    })
  )
  .then(out => writeFile('README.md', out))
})
