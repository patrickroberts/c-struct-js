import Struct from '../struct'

/**
 * A predefined type for storing an 8-bit unsigned integer.
 *
 * @class Uint8
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
 * @member {number} [byteLength=1]
 *
 * @memberof types.Uint8
 *
 * @static
 *
 * @readonly
 */
export default class Uint8 extends Struct.extend(
  /**
   * An 8-bit unsigned integer.
   *
   * @member {number} uint8
   *
   * @memberof types.Uint8
   *
   * @instance
   */
  { name: 'uint8', type: 'Uint8' }
) {
  /**
   * @method get
   *
   * @return {number} uint8
   *
   * @memberof types.Uint8
   *
   * @instance
   */
  get () { return this.uint8 }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Uint8
   *
   * @instance
   */
  set (value) { this.uint8 = value }
}
