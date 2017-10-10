import Struct from '../struct'

import Byte from './byte'
import Int16BE from './int16be'
import Int16LE from './int16le'
import Uint16BE from './uint16be'
import Uint16LE from './uint16le'

/**
 * A union of all 2-byte predefined types.
 *
 * @class Short
 *
 * @extends Struct
 *
 * @borrows types.Int16BE#int16be as #int16be
 * @borrows types.Int16LE#int16le as #int16le
 * @borrows types.Uint16BE#uint16be as #uint16be
 * @borrows types.Uint16LE#uint16le as #uint16le
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
 * @memberof types.Short
 *
 * @static
 *
 * @readonly
 */
export default Struct.union(
  Int16BE,
  Int16LE,
  Uint16BE,
  Uint16LE,
  Struct.extend(
    /**
     * First byte of ArrayBuffer as Byte.
     *
     * @member {Byte} lo
     *
     * @memberof Short
     *
     * @instance
     */
    { name: 'lo', type: Byte },

    /**
     * Last byte of ArrayBuffer as Byte.
     *
     * @member {Byte} hi
     *
     * @memberof Short
     *
     * @instance
     */
    { name: 'hi', type: Byte }
  )
)
