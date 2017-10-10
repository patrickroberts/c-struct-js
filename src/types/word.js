import Struct from '../struct'

import Short from './short'
import Float32BE from './float32be'
import Float32LE from './float32le'
import Int32BE from './int32be'
import Int32LE from './int32le'
import Uint32BE from './uint32be'
import Uint32LE from './uint32le'

/**
 * A union of all 4-byte predefined types.
 *
 * @class Word
 *
 * @extends Struct
 *
 * @borrows types.Float32BE#float32be as #float32be
 * @borrows types.Float32LE#float32le as #float32le
 * @borrows types.Int32BE#int32be as #int32be
 * @borrows types.Int32LE#int32le as #int32le
 * @borrows types.Uint32BE#uint32be as #uint32be
 * @borrows types.Uint32LE#uint32le as #uint32le
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
 * @memberof types.Word
 *
 * @static
 *
 * @readonly
 */
export default Struct.union(
  Float32BE,
  Float32LE,
  Int32BE,
  Int32LE,
  Uint32BE,
  Uint32LE,
  Struct.extend(
    /**
     * First 2 bytes of ArrayBuffer as Short.
     *
     * @member {Short} lo
     *
     * @memberof Word
     *
     * @instance
     */
    { name: 'lo', type: Short },

    /**
     * Last 2 bytes of ArrayBuffer as Short.
     *
     * @member {Short} hi
     *
     * @memberof Word
     *
     * @instance
     */
    { name: 'hi', type: Short }
  )
)
