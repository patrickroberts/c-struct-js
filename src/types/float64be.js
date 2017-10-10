import Struct from '../struct'

/**
 * A predefined type for storing a 64-bit floating point number in big-endian byte order.
 *
 * @class Float64BE
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
 * @memberof types.Float64BE
 *
 * @static
 *
 * @readonly
 */
export default class Float64BE extends Struct.extend(
  /**
   * A 64-bit floating point number accessed in big-endian byte order.
   *
   * @see {@link https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64|IEEE 754 Double-precision floating-point format}
   *
   * @member {number} float64be
   *
   * @memberof types.Float64BE
   *
   * @instance
   */
  { name: 'float64be', type: 'Float64', option: false }
) {
  /**
   * @method get
   *
   * @return {number} float64be
   *
   * @memberof types.Float64BE
   *
   * @instance
   */
  get () { return this.float64be }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Float64BE
   *
   * @instance
   */
  set (value) { this.float64be = value }
}
