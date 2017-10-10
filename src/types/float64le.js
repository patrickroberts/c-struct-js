import Struct from '../struct'

/**
 * A predefined type for storing a 64-bit floating point number in little-endian byte order.
 *
 * @class Float64LE
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
 * @member {number} [byteLength=8]
 *
 * @memberof types.Float64LE
 *
 * @static
 *
 * @readonly
 */
export default class Float64LE extends Struct.extend(
  /**
   * A 64-bit floating point number accessed in little-endian byte order.
   *
   * @see {@link https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64|IEEE 754 Double-precision floating-point format}
   *
   * @member {number} float64le
   *
   * @memberof types.Float64LE
   *
   * @instance
   */
  { name: 'float64le', type: 'Float64', option: true }
) {
  /**
   * @method get
   *
   * @return {number} float64le
   *
   * @memberof types.Float64LE
   *
   * @instance
   */
  get () { return this.float64le }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Float64LE
   *
   * @instance
   */
  set (value) { this.float64le = value }
}
