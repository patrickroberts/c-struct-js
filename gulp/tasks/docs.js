const { promisify } = require('util')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const gulp = require('gulp')
const jsdoc2md = require('jsdoc-to-markdown')

gulp.task('docs', async () => {
  return readFile('gulp/template.hbs')
    .then(template => jsdoc2md
      .render({
        configure: 'gulp/jsdoc.json',
        files: 'src/struct.js',
        template: template.toString()
      })
    )
    .then(out => writeFile('README.md', out))
})
