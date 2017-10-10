import Struct from '../struct'

/**
 * A predefined type for storing a 16-bit unsigned integer in big-endian byte order.
 *
 * @class Uint16BE
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
 * @memberof types.Uint16BE
 *
 * @static
 *
 * @readonly
 */
export default class Uint16BE extends Struct.extend(
  /**
   * A 16-bit unsigned integer accessed in big-endian byte order.
   *
   * @member {number} uint16be
   *
   * @memberof types.Uint16BE
   *
   * @instance
   */
  { name: 'uint16be', type: 'Uint16', option: false }
) {
  /**
   * @method get
   *
   * @return {number} uint16be
   *
   * @memberof types.Uint16BE
   *
   * @instance
   */
  get () { return this.uint16be }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Uint16BE
   *
   * @instance
   */
  set (value) { this.uint16be = value }
}
