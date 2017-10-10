import Struct from '../struct'

/**
 * A predefined type for storing a 32-bit unsigned integer in big-endian byte order.
 *
 * @class Uint32BE
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
 * @memberof types.Uint32BE
 *
 * @static
 *
 * @readonly
 */
export default class Uint32BE extends Struct.extend(
  /**
   * A 32-bit unsigned integer accessed in big-endian byte order.
   *
   * @member {number} uint32be
   *
   * @memberof types.Uint32BE
   *
   * @instance
   */
  { name: 'uint32be', type: 'Uint32', option: false }
) {
  /**
   * @method get
   *
   * @return {number} uint32be
   *
   * @memberof types.Uint32BE
   *
   * @instance
   */
  get () { return this.uint32be }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Uint32BE
   *
   * @instance
   */
  set (value) { this.uint32be = value }
}
