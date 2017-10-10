import Struct from '../struct'

/**
 * A predefined type for storing a 32-bit unsigned integer in little-endian byte order.
 *
 * @class Uint32LE
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
 * @memberof types.Uint32LE
 *
 * @static
 *
 * @readonly
 */
export default class Uint32LE extends Struct.extend(
  /**
   * A 32-bit unsigned integer accessed in little-endian byte order.
   *
   * @member {number} uint32le
   *
   * @memberof types.Uint32LE
   *
   * @instance
   */
  { name: 'uint32le', type: 'Uint32', option: true }
) {
  /**
   * @method get
   *
   * @return {number} uint32le
   *
   * @memberof types.Uint32LE
   *
   * @instance
   */
  get () { return this.uint32le }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Uint32LE
   *
   * @instance
   */
  set (value) { this.uint32le = value }
}
