import { Buffer } from 'buffer'

import defineProperty from './define'
import mergeClasses from './merge'

/**
 * @external ArrayBuffer
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer|ArrayBuffer}
 */

/**
 * @external Buffer
 * @see {@link https://nodejs.org/api/buffer.html|Buffer}
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
 *
 * @example
 * // create 3 classes
 * const Int32 = Struct.extend({ name: 'i32', type: 'Int32' })
 * const Uint32 = Struct.extend({ name: 'u32', type: 'Uint32' })
 * const Utf8 = Struct.extend({ name: 'str', type: 'String', byteLength: 4, option: 'binary' })
 * // create a union of the 3 classes
 * const Union = Struct.union(Int32, Uint32, Utf8)
 * // create an instance of the union to view an array buffer
 * let union = new Union(new ArrayBuffer(Union.byteLength))
 * // set the string using binary encoding
 * union.str = 'ßé+å'
 * // check uint32 value
 * console.log(union.u32.toString(16))
 * // reverse bytes
 * union.setUint32(0, union.getUint32(0, true), false)
 * // print all members
 * for (const key in union) console.log(key, union[key].toString(16))
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
   */
  static byteLength = 0

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
   * @param {external:ArrayBuffer|external:Buffer|external:DataView|external:TypedArray} value - A valid ArrayBuffer or view of one.
   * @param {number} [byteOffset=0] - Byte offset at which to view value.
   *
   * @throws {external:TypeError} value must be a valid ArrayBuffer or view.
   *
   * @return {Struct}
   *
   * @memberof Struct
   *
   * @static
   */
  static from (value, byteOffset = 0) {
    if (!ArrayBuffer.isView(value) && !(value instanceof ArrayBuffer)) {
      throw new TypeError('value must be a valid ArrayBuffer or view')
    }

    return new this(value.buffer || value, byteOffset)
  }

  /**
   * Validates constructors that extend Struct.
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
   */
  getString (byteOffset, byteLength, encoding = 'utf8') {
    return Buffer
      .from(this.buffer, byteOffset, byteLength)
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
   * @param {string} value - Unencoded string value to write to ArrayBuffer.
   * @param {string} [encoding=utf8] - Encoding within ArrayBuffer of string to write.
   *
   * @throws {external:TypeError} encoding must be a valid string encoding.
   *
   * @memberof Struct
   *
   * @instance
   */
  setString (byteOffset, byteLength, value, encoding = 'utf8') {
    Buffer
      .from(value, encoding.replace(/[\W_]/g, '').toLowerCase())
      .copy(Buffer.from(this.buffer, byteOffset, byteLength))
  }

  /**
   * Sets memory in ArrayBuffer starting at byteOffset with data from typedArray.
   *
   * @method set
   *
   * @param {external:Buffer|external:DataView|external:TypedArray} typedArray - View of data to copy.
   * @param {number} [byteOffset=0] - Byte offset within ArrayBuffer at which to write.
   *
   * @memberof Struct
   *
   * @instance
   */
  set (typedArray, byteOffset = 0) {
    new Uint8Array(this.buffer, byteOffset).set(typedArray)
  }
}
