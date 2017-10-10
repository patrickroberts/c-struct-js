import Struct from '../struct'

/**
 * A predefined type for storing a 32-bit signed integer in big-endian byte order.
 *
 * @class Int32BE
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
 * @memberof types.Int32BE
 *
 * @static
 *
 * @readonly
 */
export default class Int32BE extends Struct.extend(
  /**
   * A 32-bit signed integer accessed in big-endian byte order.
   *
   * @member {number} int32be
   *
   * @memberof types.Int32BE
   *
   * @instance
   */
  { name: 'int32be', type: 'Int32', option: false }
) {
  /**
   * @method get
   *
   * @return {number} int32be
   *
   * @memberof types.Int32BE
   *
   * @instance
   */
  get () { return this.int32be }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Int32BE
   *
   * @instance
   */
  set (value) { this.int32be = value }
}
