import Struct from '../struct'

/**
 * A predefined type for storing a binary-encoded string character.
 *
 * @class Char
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
 * @memberof types.Char
 *
 * @static
 *
 * @readonly
 */
export default class Char extends Struct.extend(
  /**
   * A single byte binary string character. Accepts any characters from the {@link https://en.wikipedia.org/wiki/ISO/IEC_8859-1|latin-1} block.
   *
   * @member {String} char
   *
   * @memberof types.Char
   *
   * @instance
   */
  { name: 'char', type: 'String', byteLength: 1, option: 'binary' }
) {
  /**
   * @method get
   *
   * @return {String} char
   *
   * @memberof types.Char
   *
   * @instance
   */
  get () { return this.char }

  /**
   * @method set
   *
   * @param {String} value
   *
   * @memberof types.Char
   *
   * @instance
   */
  set (value) { this.char = value }
}
