import Struct from '../struct'

/**
 * A predefined type for storing a 16-bit signed integer in little-endian byte order.
 *
 * @class Int16LE
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
 * @memberof types.Int16LE
 *
 * @static
 *
 * @readonly
 */
export default class Int16LE extends Struct.extend(
  /**
   * A 16-bit signed integer accessed in little-endian byte order.
   *
   * @member {number} int16le
   *
   * @memberof types.Int16LE
   *
   * @instance
   */
  { name: 'int16le', type: 'Int16', option: true }
) {
  /**
   * @method get
   *
   * @return {number} int16le
   *
   * @memberof types.Int16LE
   *
   * @instance
   */
  get () { return this.int16le }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Int16LE
   *
   * @instance
   */
  set (value) { this.int16le = value }
}
