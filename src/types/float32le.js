import Struct from '../struct'

/**
 * A predefined type for storing a 32-bit floating point number in little-endian byte order.
 *
 * @class Float32LE
 *
 * @extends Struct
 *
 * @memberof types
 *
 * @mixin
 */

/**
 * Byte length of instances.
 *
 * @member {number} [byteLength=4]
 *
 * @memberof types.Float32LE
 *
 * @static
 *
 * @readonly
 */
export default class Float32LE extends Struct.extend(
  /**
   * A 32-bit floating point number accessed in big-endian byte order.
   *
   * @see {@link https://en.wikipedia.org/wiki/Single-precision_floating-point_format#IEEE_754_single-precision_binary_floating-point_format:_binary32|IEEE 754 Single-precision floating-point format}
   *
   * @member {number} float32le
   *
   * @memberof types.Float32LE
   *
   * @instance
   */
  { name: 'float32le', type: 'Float32', option: false }
) {
  /**
   * @method get
   *
   * @return {number} float32le
   *
   * @memberof types.Float32LE
   *
   * @instance
   */
  get () { return this.float32le }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Float32LE
   *
   * @instance
   */
  set (value) { this.float32le = value }
}
