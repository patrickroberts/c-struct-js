import Struct from '../struct'

/**
 * A predefined type for storing an 8-bit signed integer.
 *
 * @class Int8
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
 * @memberof types.Int8
 *
 * @static
 *
 * @readonly
 */
export default class Int8 extends Struct.extend(
  /**
   * An 8-bit signed integer.
   *
   * @member {number} int8
   *
   * @memberof types.Int8
   *
   * @instance
   */
  { name: 'int8', type: 'Int8' }
) {
  /**
   * @method get
   *
   * @return {number} int8
   *
   * @memberof types.Int8
   *
   * @instance
   */
  get () { return this.int8 }

  /**
   * @method set
   *
   * @param {number} value
   *
   * @memberof types.Int8
   *
   * @instance
   */
  set (value) { this.int8 = value }
}
