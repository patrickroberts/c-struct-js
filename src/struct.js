import { Buffer } from 'buffer'

import defineProperty from './define'
import mergeClasses from './merge'

/**
 * @external ArrayBuffer
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer|ArrayBuffer}
 */

/**
 * @external DataView
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView|DataView}
 */

/**
 * @external TypedArray
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray|TypedArray}
 */

/**
 * @external TypeError
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError|TypeError}
 */

/**
 * @class Struct
 *
 * @extends external:DataView
 *
 * @param {external:ArrayBuffer} buffer - An instance of ArrayBuffer to view.
 * @param {number} [byteOffset=0] - Byte offset at which to view ArrayBuffer.
 */
export default class Struct extends DataView {
  /**
   * Byte length of instances.
   *
   * @member {number} [byteLength=0]
   *
   * @memberof Struct
   *
   * @static
   *
   * @readonly
   */
  static byteLength = 0

  /**
   * Namespace of predefined Struct classes.
   *
   * @namespace types
   */

  /**
   * Namespace of predefined types.
   *
   * @member {types} types
   *
   * @memberof Struct
   *
   * @static
   */

  /**
   * Creates a class that extends Struct with members defined by arguments.
   *
   * @method extend
   *
   * @param {...Object} descriptors - Instance member definitions for extended class.
   * @param {string} descriptors[].name - The member name.
   * @param {string|Struct} descriptors[].type - The member type. Accepts strings 'Int8', 'Uint8', 'Int16', 'Uint16', 'Float32', 'Int32', 'Uint32', 'Float64', 'String', or any constructor that extends Struct.
   * @param {*} [descriptors[].option] - An optional argument to append to the accessor methods of the member.
   * @param {number} [descriptors[].byteLength] - Determined using type by default. Required when type is 'String'.
   * @param {number} [descriptors[].byteOffset] - Determined using order of descriptors by default.
   *
   * @throws {external:TypeError} Unexpected type.
   * @throws {external:TypeError} byteLength is required for String type.
   *
   * @return {constructor}
   *
   * @memberof Struct
   *
   * @static
   *
   * @example
   * const Struct = require('c-struct-js')
   *
   * // Implementing RIFF-style chunk headers
   * const Word = Struct.extend(
   *   { name: 'word', type: 'String', byteLength: 4 }
   * )
   *
   * const Chunk = Struct.extend(
   *   { name: 'id', type: Word },
   *   { name: 'size', type: Struct.types.Uint32LE }
   * )
   *
   * class RIFF extends Struct.extend(
   *   { name: 'chunk', type: Chunk },
   *   // ...
   * ) {
   *   constructor () {
   *     super(new ArrayBuffer(RIFF.byteLength))
   *
   *     this.chunk.id.word = 'RIFF'
   *     this.chunk.size = this.byteLength - this.chunk.byteLength
   *     // ...
   *   }
   * }
   *
   * let riff = new RIFF()
   * let ab = riff.chunk.id
   * let buf = Buffer.from(ab.buffer, ab.byteOffset, ab.byteLength)
   *
   * console.log(buf.toString())
   */
  static extend (...descriptors) {
    return descriptors.reduce(defineProperty, class extends this {
      static byteLength = this.byteLength
    })
  }

  /**
   * Creates an instance of Struct to view given value at byteOffset.
   *
   * @method from
   *
   * @param {external:ArrayBuffer|external:TypedArray} value - A valid ArrayBuffer or TypedArray.
   * @param {number} [byteOffset=0] - Byte offset at which to view value.
   *
   * @throws {external:TypeError} value must be a valid ArrayBuffer or view.
   *
   * @return {Struct}
   *
   * @memberof Struct
   *
   * @static
   *
   * @example
   * // checking encoded size of WAV file
   * const { promisify } = require('util')
   * const fs = require('fs')
   * const read = promisify(fs.read)
   * const open = promisify(fs.open)
   * const close = promisify(fs.close)
   *
   * // using Chunk from previous example
   * // ...
   *
   * // bytes 36-44 contain SubChunk2 of WAV header
   * open('test.wav', 'r')
   *   .then(fd => {
   *     return read(fd, Buffer.allocUnsafe(Chunk.byteLength), 0, Chunk.byteLength, 36)
   *       .then((bytesRead, buffer) => close(fd).then(() => Chunk.from(buffer)))
   *   })
   *   .then(chunk => console.log('file size:', 44 + chunk.size))
   */
  static from (value, byteOffset = 0) {
    if (!ArrayBuffer.isView(value) && !(value instanceof ArrayBuffer)) {
      throw new TypeError('value must be a valid ArrayBuffer or TypedArray')
    }

    return new this(value.buffer || value, byteOffset)
  }

  /**
   * Validates constructors that implement Struct.
   *
   * @method isStruct
   *
   * @param {*} value - A value to test.
   *
   * @return {boolean}
   *
   * @memberof Struct
   *
   * @static
   *
   * @example
   * console.log(Struct.isStruct(Struct))   // true
   * console.log(Struct.isStruct(RIFF))     // true
   * console.log(Struct.isStruct(DataView)) // false - doesn't implement Struct
   * console.log(Struct.isStruct(riff))     // false - is instance, not class
   */
  static isStruct (value) {
    return typeof value === 'function' && Object.create(value.prototype) instanceof Struct
  }

  /**
   * Creates a union class that extends Struct with members of all Classes.
   *
   * @method union
   *
   * @param {...constructor} Classes - Classes that extend Struct.
   *
   * @throws {external:TypeError} Union contains conflicting key.
   *
   * @return {constructor}
   *
   * @memberof Struct
   *
   * @static
   *
   * @example
   * // Getting surrogate pairs of utf16le encoding
   * const UTF16LE = Struct.extend(
   *   { name: 'code', type: 'String', byteLength: 2, option: 'utf16le' }
   * )
   *
   * const UTF16Pair = Struct.extend(
   *   { name: 'lo', type: 'Uint8' },
   *   { name: 'hi', type: 'Uint8' }
   * )
   *
   * const UTF16 = Struct.union(Utf16le, Utf16Pair)
   *
   * let utf16 = new Utf16(new ArrayBuffer(UTF16.byteLength))
   *
   * utf16.code = '€'
   *
   * // € ac 20
   * console.log(utf16.code, utf16.lo.toString(16), utf16.hi.toString(16))
   */
  static union (...Classes) {
    return Classes.reduce(mergeClasses, this.extend())
  }

  constructor (buffer, byteOffset = 0) {
    super(buffer, byteOffset, new.target.byteLength)
  }

  /**
   * Gets string with byteLength and encoding from viewed ArrayBuffer at byteOffset.
   * Depending on data and encoding, returned string may have different length than byteLength.
   *
   * @method getString
   *
   * @param {number} byteOffset - Byte offset within ArrayBuffer of string to read.
   * @param {number} byteLength - Byte length within ArrayBuffer of string to read.
   * @param {string} [encoding=utf8] - Encoding within ArrayBuffer of string to read.
   *
   * @throws {external:TypeError} encoding must be a valid string encoding.
   *
   * @return {string}
   *
   * @memberof Struct
   *
   * @instance
   *
   * @example
   * // using utf16 from previous example
   * // ...
   *
   * console.log(utf16.code === utf16.getString(0, 2, 'utf16le')) // true
   */
  getString (byteOffset, byteLength, encoding = 'utf8') {
    return Buffer
      .from(this.buffer, this.byteOffset + byteOffset, byteLength)
      .toString(encoding.replace(/[\W_]/g, '').toLowerCase())
  }

  /**
   * Sets string with byteLength and encoding to viewed ArrayBuffer at byteOffset.
   * Depending on byteLength and encoding, set string may be truncated or padded.
   *
   * @method setString
   *
   * @param {number} byteOffset - Byte offset within ArrayBuffer of string to write.
   * @param {number} byteLength - Byte length within ArrayBuffer of string to write.
   * @param {string} value - String value to write to ArrayBuffer.
   * @param {string} [encoding=utf8] - Encoding within ArrayBuffer of string to write.
   *
   * @throws {external:TypeError} encoding must be a valid string encoding.
   *
   * @memberof Struct
   *
   * @instance
   *
   * @example
   * // using utf16 from previous example
   * // ...
   *
   * utf16.setString(0, 2, '$', 'utf16le')
   *
   * // $ 24 0
   * console.log(utf16.code, utf16.lo.toString(16), utf16.hi.toString(16))
   */
  setString (byteOffset, byteLength, value, encoding = 'utf8') {
    Buffer
      .from(String(value), encoding.replace(/[\W_]/g, '').toLowerCase())
      .copy(Buffer.from(this.buffer, this.byteOffset + byteOffset, byteLength))
  }

  /**
   * Default member getter when accessed as a member of a parent Struct.
   *
   * @method get
   *
   * @memberof Struct
   *
   * @instance
   *
   * @example
   * // Better implementation for RIFF-style chunk headers
   * class Word extends Struct.extend(
   *   { name: 'word', type: 'String', byteLength: 4 }
   * ) {
   *   get () { return this.word }
   *   set (string) { this.word = string }
   * }
   *
   * const Chunk = Struct.extend(
   *   { name: 'id', type: Word },
   *   { name: 'size', type: Struct.types.Uint32LE }
   * )
   *
   * // Other structs...
   *
   * class RIFF extends Struct.extend(
   *   { name: 'chunk', type: Chunk },
   *   // Other fields...
   * ) {
   *   constructor (arrayBuffer = new ArrayBuffer(RIFF.byteLength), byteOffset = 0) {
   *     super(arrayBuffer, byteOffset)
   *
   *     this.chunk.id = 'RIFF'
   *     this.chunk.size = this.byteLength - this.chunk.byteLength
   *     // ...
   *   }
   * }
   *
   * let riff = new RIFF()
   * let id = riff.chunk.id
   *
   * // 'RIFF' instead of instance of Word
   * console.log(id)
   */
  get () {
    return this
  }

  /**
   * Sets memory in ArrayBuffer starting at byteOffset with data from typedArray.
   *
   * @method set
   *
   * @param {external:TypedArray} typedArray - View of data to copy.
   * @param {number} [byteOffset=0] - Byte offset within ArrayBuffer at which to write.
   *
   * @memberof Struct
   *
   * @instance
   *
   * @example
   * // reading header of WAV file into instance of RIFF
   *
   * // using RIFF from previous example
   * // ...
   * let riff = new RIFF()
   *
   * open('test.wav', 'r')
   *   .then(fd => {
   *     return read(fd, Buffer.allocUnsafe(RIFF.byteLength), 0, RIFF.byteLength, 0)
   *       .then((bytesRead, buffer) => close(fd).then(() => buffer))
   *   })
   *   .then(buffer => {
   *     riff.set(buffer)
   *     // populated with header bytes from test.wav
   *     // ...
   *   })
   */
  set (typedArray, byteOffset = 0) {
    new Uint8Array(this.buffer, this.byteOffset + byteOffset, this.byteLength).set(typedArray)
  }

  /**
   * Initializes the next chunk of the buffer as another instance of Struct.
   *
   * @method next
   *
   * @param {constructor} [constructor=this.constructor] - The Struct class with which to initialize.
   * @param {number} [bytePadding=0] - Amount of bytes after the end of this to begin ArrayBuffer view.
   *
   * @throws {external:TypeError} constructor must implement Struct.
   *
   * @memberof Struct
   *
   * @instance
   *
   * @example
   * // iterating through a large dataset
   * const readFile = promisify(fs.readFile)
   *
   * readFile('test.wav')
   *   .then(buffer => {
   *     for (let struct = new Struct.types.Uint8(buffer.buffer, 44); struct !== null; struct = struct.next()) {
   *       // iterates through each byte of sound data
   *       console.log(struct.uint8) // 0-255
   *     }
   *   })
   */
  next (constructor = this.constructor, bytePadding = 0) {
    if (!Struct.isStruct(constructor)) {
      throw new TypeError('constructor must implement Struct')
    }

    const arrayBuffer = this.buffer
    const byteOffset = this.byteOffset + this.byteLength + bytePadding

    if (byteOffset + constructor.byteLength > arrayBuffer.byteLength) {
      return null
    }

    return constructor.from(arrayBuffer, byteOffset)
  }

  /**
   * Initializes the previous chunk of the buffer as another instance of Struct.
   *
   * @method prev
   *
   * @param {constructor} [constructor=this.constructor] - The Struct class with which to initialize.
   * @param {number} [bytePadding=0] - Amount of bytes before the end of this to end ArrayBuffer view.
   *
   * @throws {external:TypeError} constructor must implement Struct.
   *
   * @memberof Struct
   *
   * @instance
   *
   * @example
   * // accessing header of first data
   *
   * readFile('test.wav')
   *   .then(buffer => {
   *     let data = new Struct.types.Uint8(buffer.buffer, 44)
   *     // to properly initialize RIFF header at byteOffset of 0
   *     let riff = data.prev(RIFF, data.byteOffset - Chunk.byteLength)
   *
   *     // 'RIFF'
   *     console.log(riff.chunk.id)
   *   })
   */
  prev (constructor = this.constructor, bytePadding = 0) {
    if (!Struct.isStruct(constructor)) {
      throw new TypeError('constructor must implement Struct')
    }

    const arrayBuffer = this.buffer
    const byteOffset = this.byteOffset - bytePadding - constructor.byteLength

    if (byteOffset < 0) {
      return null
    }

    return constructor.from(arrayBuffer, byteOffset)
  }
}
