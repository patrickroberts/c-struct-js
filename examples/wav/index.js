const writeFile = require('util')
  .promisify(require('fs').writeFile)

const Struct = require('../../')
const WAV = require('./wav')

let wav = new WAV(1, 44100, 16)

function print (struct, indent = '', log = console.log.bind(console)) {
  for (const key in struct) {
    if (struct[key] instanceof Struct) {
      log(`${indent}${key}:`)
      print(struct[key], indent + '  ')
    } else {
      log(`${indent}${key}: ${struct[key]}`)
    }
  }
}

print(wav)

writeFile('empty.wav', Buffer.from(wav.buffer))
