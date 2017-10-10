import Struct from '../struct'

/**
 * A predefined type for storing a 16-bit signed integer in big-endian byte order.
 *
 * @class Int16BE
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
 * @member {number} [byteLength=2]
 *
 * @memberof types.Int16BE
 *
 * @static
 *
 * @readonly
 */
export default class Int16BE extends Struct.extend(
  /**
   * A 16-bit signed integer accessed in big-endian byte order.
   *
   * @member {number} int16be
   *
   * @memberof types.Int16BE
   *
   * @instance
   */
  { name: 'int16be', type: 'Int16', option: false }
) {
  /**
   * @method get
   *
   * @return {number} int16be
   *
   * @memberof types.Int16BE
   *
   * @instance
   */
  get () { return this.int16be }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Int16BE
   *
   * @instance
   */
  set (value) { this.int16be = value }
}
