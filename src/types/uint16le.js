import Struct from '../struct'

/**
 * A predefined type for storing a 16-bit unsigned integer in little-endian byte order.
 *
 * @class Uint16LE
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
 * @memberof types.Uint16LE
 *
 * @static
 *
 * @readonly
 */
export default class Uint16LE extends Struct.extend(
  /**
   * A 16-bit unsigned integer accessed in little-endian byte order.
   *
   * @member {number} uint16le
   *
   * @memberof types.Uint16LE
   *
   * @instance
   */
  { name: 'uint16le', type: 'Uint16', option: true }
) {
  /**
   * @method get
   *
   * @return {number} uint16le
   *
   * @memberof types.Uint16LE
   *
   * @instance
   */
  get () { return this.uint16le }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Uint16LE
   *
   * @instance
   */
  set (value) { this.uint16le = value }
}
