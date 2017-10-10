import Struct from './src/struct'
import * as types from './src/types'

Object.defineProperty(Struct, 'types', {
  enumerable: true,
  writable: true,
  value: types
})

module.exports = Struct
