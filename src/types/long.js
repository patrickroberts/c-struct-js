import Struct from '../struct'

import Word from './word'
import Float64BE from './float64be'
import Float64LE from './float64le'

/**
 * A union of all 8-byte predefined types.
 *
 * @class Long
 *
 * @extends Struct
 *
 * @borrows types.Float64BE#float64be as #float64be
 * @borrows types.Float64LE#float64le as #float64le
 *
 * @memberof types
 *
 * @mixin
 */

/**
 * Byte length of instances.
 *
 * @member {number} [byteLength=8]
 *
 * @memberof types.Long
 *
 * @static
 *
 * @readonly
 */
export default Struct.union(
  Float64BE,
  Float64LE,
  Struct.extend(
    /**
     * First 4 bytes of ArrayBuffer as Word.
     *
     * @member {Word} lo
     *
     * @memberof Long
     *
     * @instance
     */
    { name: 'lo', type: Word },

    /**
     * Last 4 bytes of ArrayBuffer as Word.
     *
     * @member {Word} hi
     *
     * @memberof Long
     *
     * @instance
     */
    { name: 'hi', type: Word }
  )
)
