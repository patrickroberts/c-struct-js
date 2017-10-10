import Struct from '../struct'

/**
 * A predefined type for storing a 32-bit signed integer in little-endian byte order.
 *
 * @class Int32LE
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
 * @memberof types.Int32LE
 *
 * @static
 *
 * @readonly
 */
export default class Int32LE extends Struct.extend(
  /**
   * A 32-bit signed integer accessed in big-endian byte order.
   *
   * @member {number} int32le
   *
   * @memberof types.Int32LE
   *
   * @instance
   */
  { name: 'int32le', type: 'Int32', option: true }
) {
  /**
   * @method get
   *
   * @return {number} int32le
   *
   * @memberof types.Int32LE
   *
   * @instance
   */
  get () { return this.int32le }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Int32LE
   *
   * @instance
   */
  set (value) { this.int32le = value }
}
