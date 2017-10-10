import Struct from '../struct'

import Char from './char'
import Int8 from './int8'
import Uint8 from './uint8'

/**
 * A union of all 1-byte predefined types.
 *
 * @class Byte
 *
 * @extends Struct
 *
 * @borrows types.Char#char as #char
 * @borrows types.Int8#int8 as #int8
 * @borrows types.Uint8#uint8 as #uint8
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
 * @memberof types.Byte
 *
 * @static
 *
 * @readonly
 */
export default Struct.union(
  Char,
  Int8,
  Uint8
)
