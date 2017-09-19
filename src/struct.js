import { Buffer } from 'buffer'
import defineProperty from './define'

export default class Struct extends DataView {
  static byteAlignment = 0
  static byteLength = 0
  static bytePadding = 0

  static create (descriptors) {
    if (!Array.isArray(descriptors)) {
      throw new TypeError('descriptors must be an array')
    }

    return descriptors.reduce(defineProperty, class extends this {
      static byteAlignment = this.byteAlignment
      static byteLength = this.byteLength
      static bytePadding = this.bytePadding
    })
  }

  static from (typedArray, byteOffset = 0) {
    if (!ArrayBuffer.isView(typedArray)) {
      throw new TypeError('first argument must be valid view of ArrayBuffer')
    }

    return new this(typedArray.buffer, byteOffset)
  }

  static isStruct (value) {
    return (
      typeof value === 'function' &&
      value.prototype instanceof DataView &&
      typeof value.byteLength === 'number'
    )
  }

  constructor (buffer, byteOffset = 0) {
    super(buffer, byteOffset, new.target.byteLength)
  }

  set (typedArray) {
    const src = this.constructor.from(typedArray)

    for (const key in this) {
      this[key] = src[key]
    }
  }

  getString (byteOffset, byteLength, encoding = 'binary') {
    return Buffer
      .from(this.buffer, byteOffset, byteLength)
      .toString(encoding.replace(/[\W_]/g, '').toLowerCase())
  }

  setString (byteOffset, byteLength, value, encoding = 'binary') {
    Buffer
      .from(value, encoding.replace(/[\W_]/g, '').toLowerCase())
      .copy(Buffer.from(this.buffer, byteOffset, byteLength))
  }
}
