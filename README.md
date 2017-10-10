# c-struct-js

UMD module for DataView extension inspired by C structs

[![NPM Version][npm-image]][npm-url] [![Node Version][node-image]][npm-url] [![devDependencies][devdep-image]][npm-url] [![License][license-image]][license-url] [![Standard][style-image]][style-url] [![Github File Size][filesize-image]][filesize-url]

## Usage

#### Install via [`npm`][npm-url]

```bash
$ npm i c-struct-js
```

#### CommonJS

```js
const Struct = require('c-struct-js')
```

#### ES6 import (using babel)

```js
import Struct from 'c-struct-js'
```

#### AMD requireJS

```js
define(['c-struct-js'], (Struct) => { ... })
```

#### Or include via [`unpkg`][unpkg-url]

```html
<script src="https://unpkg.com/c-struct-js"></script>
```

#### UMD global

```html
<script>
  const { Struct } = window
</script>
```

## Classes

<dl>
<dt><a href="#Struct">Struct</a> ⇐ <code><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView">DataView</a></code></dt>
<dd></dd>
</dl>

## Objects

<dl>
<dt><a href="#types">types</a> : <code>object</code></dt>
<dd><p>Namespace of predefined Struct classes.</p>
</dd>
</dl>

<a name="Struct"></a>

## Struct ⇐ [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
**Kind**: global class  
**Extends**: [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)  

* [Struct](#Struct) ⇐ [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
    * [new Struct(buffer, [byteOffset])](#new_Struct_new)
    * _static_
        * [.extend(...descriptors)](#Struct.extend) ⇒ <code>constructor</code>
        * [.types](#Struct.types) : [<code>types</code>](#types)
        * [.byteLength](#Struct.byteLength) : <code>number</code>
        * [.from(value, [byteOffset])](#Struct.from) ⇒ [<code>Struct</code>](#Struct)
        * [.isStruct(value)](#Struct.isStruct) ⇒ <code>boolean</code>
        * [.union(...Classes)](#Struct.union) ⇒ <code>constructor</code>
    * _instance_
        * [.getString(byteOffset, byteLength, [encoding])](#Struct+getString) ⇒ <code>string</code>
        * [.setString(byteOffset, byteLength, value, [encoding])](#Struct+setString)
        * [.get()](#Struct+get)
        * [.set(typedArray, [byteOffset])](#Struct+set)
        * [.next([constructor], [bytePadding])](#Struct+next)
        * [.prev([constructor], [bytePadding])](#Struct+prev)

<a name="new_Struct_new"></a>

### new Struct(buffer, [byteOffset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | [<code>ArrayBuffer</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) |  | An instance of ArrayBuffer to view. |
| [byteOffset] | <code>number</code> | <code>0</code> | Byte offset at which to view ArrayBuffer. |

<a name="Struct.extend"></a>

### Struct.extend(...descriptors) ⇒ <code>constructor</code>
Creates a class that extends Struct with members defined by arguments.

**Kind**: static method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) Unexpected type.
- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) byteLength is required for String type.


| Param | Type | Description |
| --- | --- | --- |
| ...descriptors | <code>Object</code> | Instance member definitions for extended class. |
| descriptors[].name | <code>string</code> | The member name. |
| descriptors[].type | <code>string</code> \| [<code>Struct</code>](#Struct) | The member type. Accepts strings 'Int8', 'Uint8', 'Int16', 'Uint16', 'Float32', 'Int32', 'Uint32', 'Float64', 'String', or any constructor that extends Struct. |
| [descriptors[].option] | <code>\*</code> | An optional argument to append to the accessor methods of the member. |
| [descriptors[].byteLength] | <code>number</code> | Determined using type by default. Required when type is 'String'. |
| [descriptors[].byteOffset] | <code>number</code> | Determined using order of descriptors by default. |

**Example**  
```js
const Struct = require('c-struct-js')// Implementing RIFF-style chunk headersconst Word = Struct.extend(  { name: 'word', type: 'String', byteLength: 4 })const Chunk = Struct.extend(  { name: 'id', type: Word },  { name: 'size', type: Struct.types.Uint32LE })class RIFF extends Struct.extend(  { name: 'chunk', type: Chunk },  // ...) {  constructor () {    super(new ArrayBuffer(RIFF.byteLength))    this.chunk.id.word = 'RIFF'    this.chunk.size = this.byteLength - this.chunk.byteLength    // ...  }}let riff = new RIFF()let ab = riff.chunk.idlet buf = Buffer.from(ab.buffer, ab.byteOffset, ab.byteLength)console.log(buf.toString())
```
<a name="Struct.types"></a>

### Struct.types : [<code>types</code>](#types)
Namespace of predefined types.

**Kind**: static property of [<code>Struct</code>](#Struct)  
<a name="Struct.byteLength"></a>

### Struct.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Struct</code>](#Struct)  
**Default**: <code>0</code>  
**Read only**: true  
<a name="Struct.from"></a>

### Struct.from(value, [byteOffset]) ⇒ [<code>Struct</code>](#Struct)
Creates an instance of Struct to view given value at byteOffset.

**Kind**: static method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) value must be a valid ArrayBuffer or view.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | [<code>ArrayBuffer</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| [<code>TypedArray</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) |  | A valid ArrayBuffer or TypedArray. |
| [byteOffset] | <code>number</code> | <code>0</code> | Byte offset at which to view value. |

**Example**  
```js
// checking encoded size of WAV fileconst { promisify } = require('util')const fs = require('fs')const read = promisify(fs.read)const open = promisify(fs.open)const close = promisify(fs.close)// using Chunk from previous example// ...// bytes 36-44 contain SubChunk2 of WAV headeropen('test.wav', 'r')  .then(fd => {    return read(fd, Buffer.allocUnsafe(Chunk.byteLength), 0, Chunk.byteLength, 36)      .then((bytesRead, buffer) => close(fd).then(() => Chunk.from(buffer)))  })  .then(chunk => console.log('file size:', 44 + chunk.size))
```
<a name="Struct.isStruct"></a>

### Struct.isStruct(value) ⇒ <code>boolean</code>
Validates constructors that implement Struct.

**Kind**: static method of [<code>Struct</code>](#Struct)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | A value to test. |

**Example**  
```js
console.log(Struct.isStruct(Struct))   // trueconsole.log(Struct.isStruct(RIFF))     // trueconsole.log(Struct.isStruct(DataView)) // false - doesn't implement Structconsole.log(Struct.isStruct(riff))     // false - is instance, not class
```
<a name="Struct.union"></a>

### Struct.union(...Classes) ⇒ <code>constructor</code>
Creates a union class that extends Struct with members of all Classes.

**Kind**: static method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) Union contains conflicting key.


| Param | Type | Description |
| --- | --- | --- |
| ...Classes | <code>constructor</code> | Classes that extend Struct. |

**Example**  
```js
// Getting surrogate pairs of utf16le encodingconst UTF16LE = Struct.extend(  { name: 'code', type: 'String', byteLength: 2, option: 'utf16le' })const UTF16Pair = Struct.extend(  { name: 'lo', type: 'Uint8' },  { name: 'hi', type: 'Uint8' })const UTF16 = Struct.union(Utf16le, Utf16Pair)let utf16 = new Utf16(new ArrayBuffer(UTF16.byteLength))utf16.code = '€'// € ac 20console.log(utf16.code, utf16.lo.toString(16), utf16.hi.toString(16))
```
<a name="Struct+getString"></a>

### struct.getString(byteOffset, byteLength, [encoding]) ⇒ <code>string</code>
Gets string with byteLength and encoding from viewed ArrayBuffer at byteOffset.Depending on data and encoding, returned string may have different length than byteLength.

**Kind**: instance method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) encoding must be a valid string encoding.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| byteOffset | <code>number</code> |  | Byte offset within ArrayBuffer of string to read. |
| byteLength | <code>number</code> |  | Byte length within ArrayBuffer of string to read. |
| [encoding] | <code>string</code> | <code>&quot;utf8&quot;</code> | Encoding within ArrayBuffer of string to read. |

**Example**  
```js
// using utf16 from previous example// ...console.log(utf16.code === utf16.getString(0, 2, 'utf16le')) // true
```
<a name="Struct+setString"></a>

### struct.setString(byteOffset, byteLength, value, [encoding])
Sets string with byteLength and encoding to viewed ArrayBuffer at byteOffset.Depending on byteLength and encoding, set string may be truncated or padded.

**Kind**: instance method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) encoding must be a valid string encoding.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| byteOffset | <code>number</code> |  | Byte offset within ArrayBuffer of string to write. |
| byteLength | <code>number</code> |  | Byte length within ArrayBuffer of string to write. |
| value | <code>string</code> |  | String value to write to ArrayBuffer. |
| [encoding] | <code>string</code> | <code>&quot;utf8&quot;</code> | Encoding within ArrayBuffer of string to write. |

**Example**  
```js
// using utf16 from previous example// ...utf16.setString(0, 2, '$', 'utf16le')// $ 24 0console.log(utf16.code, utf16.lo.toString(16), utf16.hi.toString(16))
```
<a name="Struct+get"></a>

### struct.get()
Default member getter when accessed as a member of a parent Struct.

**Kind**: instance method of [<code>Struct</code>](#Struct)  
**Example**  
```js
// Better implementation for RIFF-style chunk headersclass Word extends Struct.extend(  { name: 'word', type: 'String', byteLength: 4 }) {  get () { return this.word }  set (string) { this.word = string }}const Chunk = Struct.extend(  { name: 'id', type: Word },  { name: 'size', type: Struct.types.Uint32LE })// Other structs...class RIFF extends Struct.extend(  { name: 'chunk', type: Chunk },  // Other fields...) {  constructor (arrayBuffer = new ArrayBuffer(RIFF.byteLength), byteOffset = 0) {    super(arrayBuffer, byteOffset)    this.chunk.id = 'RIFF'    this.chunk.size = this.byteLength - this.chunk.byteLength    // ...  }}let riff = new RIFF()let id = riff.chunk.id// 'RIFF' instead of instance of Wordconsole.log(id)
```
<a name="Struct+set"></a>

### struct.set(typedArray, [byteOffset])
Sets memory in ArrayBuffer starting at byteOffset with data from typedArray.

**Kind**: instance method of [<code>Struct</code>](#Struct)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| typedArray | [<code>TypedArray</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) |  | View of data to copy. |
| [byteOffset] | <code>number</code> | <code>0</code> | Byte offset within ArrayBuffer at which to write. |

**Example**  
```js
// reading header of WAV file into instance of RIFF// using RIFF from previous example// ...let riff = new RIFF()open('test.wav', 'r')  .then(fd => {    return read(fd, Buffer.allocUnsafe(RIFF.byteLength), 0, RIFF.byteLength, 0)      .then((bytesRead, buffer) => close(fd).then(() => buffer))  })  .then(buffer => {    riff.set(buffer)    // populated with header bytes from test.wav    // ...  })
```
<a name="Struct+next"></a>

### struct.next([constructor], [bytePadding])
Initializes the next chunk of the buffer as another instance of Struct.

**Kind**: instance method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) constructor must implement Struct.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [constructor] | <code>constructor</code> | <code>this.constructor</code> | The Struct class with which to initialize. |
| [bytePadding] | <code>number</code> | <code>0</code> | Amount of bytes after the end of this to begin ArrayBuffer view. |

**Example**  
```js
// iterating through a large datasetconst readFile = promisify(fs.readFile)readFile('test.wav')  .then(buffer => {    for (let struct = new Struct.types.Uint8(buffer.buffer, 44); struct !== null; struct = struct.next()) {      // iterates through each byte of sound data      console.log(struct.uint8) // 0-255    }  })
```
<a name="Struct+prev"></a>

### struct.prev([constructor], [bytePadding])
Initializes the previous chunk of the buffer as another instance of Struct.

**Kind**: instance method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) constructor must implement Struct.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [constructor] | <code>constructor</code> | <code>this.constructor</code> | The Struct class with which to initialize. |
| [bytePadding] | <code>number</code> | <code>0</code> | Amount of bytes before the end of this to end ArrayBuffer view. |

**Example**  
```js
// accessing header of first datareadFile('test.wav')  .then(buffer => {    let data = new Struct.types.Uint8(buffer.buffer, 44)    // to properly initialize RIFF header at byteOffset of 0    let riff = data.prev(RIFF, data.byteOffset - Chunk.byteLength)    // 'RIFF'    console.log(riff.chunk.id)  })
```
<a name="types"></a>

## types : <code>object</code>
Namespace of predefined Struct classes.

**Kind**: global namespace  

* [types](#types) : <code>object</code>
    * [.Byte](#types.Byte) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Byte.byteLength) : <code>number</code>
        * _instance_
            * [.char](#types.Byte+char) : <code>String</code>
            * [.int8](#types.Byte+int8) : <code>number</code>
            * [.uint8](#types.Byte+uint8) : <code>number</code>
    * [.Char](#types.Char) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Char.byteLength) : <code>number</code>
        * _instance_
            * [.char](#types.Char+char) : <code>String</code>
            * [.get()](#types.Char+get) ⇒ <code>String</code>
            * [.set(value)](#types.Char+set)
    * [.Float32BE](#types.Float32BE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Float32BE.byteLength) : <code>number</code>
        * _instance_
            * [.float32be](#types.Float32BE+float32be) : <code>number</code>
            * [.get()](#types.Float32BE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Float32BE+set)
    * [.Float32LE](#types.Float32LE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Float32LE.byteLength) : <code>number</code>
        * _instance_
            * [.float32le](#types.Float32LE+float32le) : <code>number</code>
            * [.get()](#types.Float32LE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Float32LE+set)
    * [.Float64BE](#types.Float64BE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Float64BE.byteLength) : <code>number</code>
        * _instance_
            * [.float64be](#types.Float64BE+float64be) : <code>number</code>
            * [.get()](#types.Float64BE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Float64BE+set)
    * [.Float64LE](#types.Float64LE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Float64LE.byteLength) : <code>number</code>
        * _instance_
            * [.float64le](#types.Float64LE+float64le) : <code>number</code>
            * [.get()](#types.Float64LE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Float64LE+set)
    * [.Int16BE](#types.Int16BE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Int16BE.byteLength) : <code>number</code>
        * _instance_
            * [.int16be](#types.Int16BE+int16be) : <code>number</code>
            * [.get()](#types.Int16BE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Int16BE+set)
    * [.Int16LE](#types.Int16LE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Int16LE.byteLength) : <code>number</code>
        * _instance_
            * [.int16le](#types.Int16LE+int16le) : <code>number</code>
            * [.get()](#types.Int16LE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Int16LE+set)
    * [.Int32BE](#types.Int32BE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Int32BE.byteLength) : <code>number</code>
        * _instance_
            * [.int32be](#types.Int32BE+int32be) : <code>number</code>
            * [.get()](#types.Int32BE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Int32BE+set)
    * [.Int32LE](#types.Int32LE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Int32LE.byteLength) : <code>number</code>
        * _instance_
            * [.int32le](#types.Int32LE+int32le) : <code>number</code>
            * [.get()](#types.Int32LE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Int32LE+set)
    * [.Int8](#types.Int8) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Int8.byteLength) : <code>number</code>
        * _instance_
            * [.int8](#types.Int8+int8) : <code>number</code>
            * [.get()](#types.Int8+get) ⇒ <code>number</code>
            * [.set(value)](#types.Int8+set)
    * [.Long](#types.Long) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Long.byteLength) : <code>number</code>
        * _instance_
            * [.float64be](#types.Long+float64be) : <code>number</code>
            * [.float64le](#types.Long+float64le) : <code>number</code>
    * [.Short](#types.Short) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Short.byteLength) : <code>number</code>
        * _instance_
            * [.int16be](#types.Short+int16be) : <code>number</code>
            * [.int16le](#types.Short+int16le) : <code>number</code>
            * [.uint16be](#types.Short+uint16be) : <code>number</code>
            * [.uint16le](#types.Short+uint16le) : <code>number</code>
    * [.Uint16BE](#types.Uint16BE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Uint16BE.byteLength) : <code>number</code>
        * _instance_
            * [.uint16be](#types.Uint16BE+uint16be) : <code>number</code>
            * [.get()](#types.Uint16BE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Uint16BE+set)
    * [.Uint16LE](#types.Uint16LE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Uint16LE.byteLength) : <code>number</code>
        * _instance_
            * [.uint16le](#types.Uint16LE+uint16le) : <code>number</code>
            * [.get()](#types.Uint16LE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Uint16LE+set)
    * [.Uint32BE](#types.Uint32BE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Uint32BE.byteLength) : <code>number</code>
        * _instance_
            * [.uint32be](#types.Uint32BE+uint32be) : <code>number</code>
            * [.get()](#types.Uint32BE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Uint32BE+set)
    * [.Uint32LE](#types.Uint32LE) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Uint32LE.byteLength) : <code>number</code>
        * _instance_
            * [.uint32le](#types.Uint32LE+uint32le) : <code>number</code>
            * [.get()](#types.Uint32LE+get) ⇒ <code>number</code>
            * [.set(value)](#types.Uint32LE+set)
    * [.Uint8](#types.Uint8) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Uint8.byteLength) : <code>number</code>
        * _instance_
            * [.uint8](#types.Uint8+uint8) : <code>number</code>
            * [.get()](#types.Uint8+get) ⇒ <code>number</code>
            * [.set(value)](#types.Uint8+set)
    * [.Word](#types.Word) ⇐ [<code>Struct</code>](#Struct)
        * _static_
            * [.byteLength](#types.Word.byteLength) : <code>number</code>
        * _instance_
            * [.float32be](#types.Word+float32be) : <code>number</code>
            * [.float32le](#types.Word+float32le) : <code>number</code>
            * [.int32be](#types.Word+int32be) : <code>number</code>
            * [.int32le](#types.Word+int32le) : <code>number</code>
            * [.uint32be](#types.Word+uint32be) : <code>number</code>
            * [.uint32le](#types.Word+uint32le) : <code>number</code>

<a name="types.Byte"></a>

### types.Byte ⇐ [<code>Struct</code>](#Struct)
A union of all 1-byte predefined types.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Byte](#types.Byte) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Byte.byteLength) : <code>number</code>
    * _instance_
        * [.char](#types.Byte+char) : <code>String</code>
        * [.int8](#types.Byte+int8) : <code>number</code>
        * [.uint8](#types.Byte+uint8) : <code>number</code>

<a name="types.Byte.byteLength"></a>

#### Byte.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Byte</code>](#types.Byte)  
**Default**: <code>1</code>  
**Read only**: true  
<a name="types.Byte+char"></a>

#### byte.char : <code>String</code>
A single byte binary string character. Accepts any characters from the [latin-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) block.

**Kind**: instance property of [<code>Byte</code>](#types.Byte)  
<a name="types.Byte+int8"></a>

#### byte.int8 : <code>number</code>
An 8-bit signed integer.

**Kind**: instance property of [<code>Byte</code>](#types.Byte)  
<a name="types.Byte+uint8"></a>

#### byte.uint8 : <code>number</code>
An 8-bit unsigned integer.

**Kind**: instance property of [<code>Byte</code>](#types.Byte)  
<a name="types.Char"></a>

### types.Char ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a binary-encoded string character.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Char](#types.Char) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Char.byteLength) : <code>number</code>
    * _instance_
        * [.char](#types.Char+char) : <code>String</code>
        * [.get()](#types.Char+get) ⇒ <code>String</code>
        * [.set(value)](#types.Char+set)

<a name="types.Char.byteLength"></a>

#### Char.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Char</code>](#types.Char)  
**Default**: <code>1</code>  
**Read only**: true  
<a name="types.Char+char"></a>

#### char.char : <code>String</code>
A single byte binary string character. Accepts any characters from the [latin-1](https://en.wikipedia.org/wiki/ISO/IEC_8859-1) block.

**Kind**: instance property of [<code>Char</code>](#types.Char)  
<a name="types.Char+get"></a>

#### char.get() ⇒ <code>String</code>
**Kind**: instance method of [<code>Char</code>](#types.Char)  
**Returns**: <code>String</code> - char  
<a name="types.Char+set"></a>

#### char.set(value)
**Kind**: instance method of [<code>Char</code>](#types.Char)  

| Param | Type |
| --- | --- |
| value | <code>String</code> | 

<a name="types.Float32BE"></a>

### types.Float32BE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 32-bit floating point number in big-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Float32BE](#types.Float32BE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Float32BE.byteLength) : <code>number</code>
    * _instance_
        * [.float32be](#types.Float32BE+float32be) : <code>number</code>
        * [.get()](#types.Float32BE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Float32BE+set)

<a name="types.Float32BE.byteLength"></a>

#### Float32BE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Float32BE</code>](#types.Float32BE)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Float32BE+float32be"></a>

#### float32BE.float32be : <code>number</code>
A 32-bit floating point number accessed in big-endian byte order.

**Kind**: instance property of [<code>Float32BE</code>](#types.Float32BE)  
**See**: [IEEE 754 Single-precision floating-point format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format#IEEE_754_single-precision_binary_floating-point_format:_binary32)  
<a name="types.Float32BE+get"></a>

#### float32BE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Float32BE</code>](#types.Float32BE)  
**Returns**: <code>number</code> - float32be  
<a name="types.Float32BE+set"></a>

#### float32BE.set(value)
**Kind**: instance method of [<code>Float32BE</code>](#types.Float32BE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Float32LE"></a>

### types.Float32LE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 32-bit floating point number in little-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Float32LE](#types.Float32LE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Float32LE.byteLength) : <code>number</code>
    * _instance_
        * [.float32le](#types.Float32LE+float32le) : <code>number</code>
        * [.get()](#types.Float32LE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Float32LE+set)

<a name="types.Float32LE.byteLength"></a>

#### Float32LE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Float32LE</code>](#types.Float32LE)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Float32LE+float32le"></a>

#### float32LE.float32le : <code>number</code>
A 32-bit floating point number accessed in big-endian byte order.

**Kind**: instance property of [<code>Float32LE</code>](#types.Float32LE)  
**See**: [IEEE 754 Single-precision floating-point format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format#IEEE_754_single-precision_binary_floating-point_format:_binary32)  
<a name="types.Float32LE+get"></a>

#### float32LE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Float32LE</code>](#types.Float32LE)  
**Returns**: <code>number</code> - float32le  
<a name="types.Float32LE+set"></a>

#### float32LE.set(value)
**Kind**: instance method of [<code>Float32LE</code>](#types.Float32LE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Float64BE"></a>

### types.Float64BE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 64-bit floating point number in big-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Float64BE](#types.Float64BE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Float64BE.byteLength) : <code>number</code>
    * _instance_
        * [.float64be](#types.Float64BE+float64be) : <code>number</code>
        * [.get()](#types.Float64BE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Float64BE+set)

<a name="types.Float64BE.byteLength"></a>

#### Float64BE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Float64BE</code>](#types.Float64BE)  
**Default**: <code>8</code>  
**Read only**: true  
<a name="types.Float64BE+float64be"></a>

#### float64BE.float64be : <code>number</code>
A 64-bit floating point number accessed in big-endian byte order.

**Kind**: instance property of [<code>Float64BE</code>](#types.Float64BE)  
**See**: [IEEE 754 Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64)  
<a name="types.Float64BE+get"></a>

#### float64BE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Float64BE</code>](#types.Float64BE)  
**Returns**: <code>number</code> - float64be  
<a name="types.Float64BE+set"></a>

#### float64BE.set(value)
**Kind**: instance method of [<code>Float64BE</code>](#types.Float64BE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Float64LE"></a>

### types.Float64LE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 64-bit floating point number in little-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Float64LE](#types.Float64LE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Float64LE.byteLength) : <code>number</code>
    * _instance_
        * [.float64le](#types.Float64LE+float64le) : <code>number</code>
        * [.get()](#types.Float64LE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Float64LE+set)

<a name="types.Float64LE.byteLength"></a>

#### Float64LE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Float64LE</code>](#types.Float64LE)  
**Default**: <code>8</code>  
**Read only**: true  
<a name="types.Float64LE+float64le"></a>

#### float64LE.float64le : <code>number</code>
A 64-bit floating point number accessed in little-endian byte order.

**Kind**: instance property of [<code>Float64LE</code>](#types.Float64LE)  
**See**: [IEEE 754 Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64)  
<a name="types.Float64LE+get"></a>

#### float64LE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Float64LE</code>](#types.Float64LE)  
**Returns**: <code>number</code> - float64le  
<a name="types.Float64LE+set"></a>

#### float64LE.set(value)
**Kind**: instance method of [<code>Float64LE</code>](#types.Float64LE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Int16BE"></a>

### types.Int16BE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 16-bit signed integer in big-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Int16BE](#types.Int16BE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Int16BE.byteLength) : <code>number</code>
    * _instance_
        * [.int16be](#types.Int16BE+int16be) : <code>number</code>
        * [.get()](#types.Int16BE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Int16BE+set)

<a name="types.Int16BE.byteLength"></a>

#### Int16BE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Int16BE</code>](#types.Int16BE)  
**Default**: <code>2</code>  
**Read only**: true  
<a name="types.Int16BE+int16be"></a>

#### int16BE.int16be : <code>number</code>
A 16-bit signed integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Int16BE</code>](#types.Int16BE)  
<a name="types.Int16BE+get"></a>

#### int16BE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Int16BE</code>](#types.Int16BE)  
**Returns**: <code>number</code> - int16be  
<a name="types.Int16BE+set"></a>

#### int16BE.set(value)
**Kind**: instance method of [<code>Int16BE</code>](#types.Int16BE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Int16LE"></a>

### types.Int16LE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 16-bit signed integer in little-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Int16LE](#types.Int16LE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Int16LE.byteLength) : <code>number</code>
    * _instance_
        * [.int16le](#types.Int16LE+int16le) : <code>number</code>
        * [.get()](#types.Int16LE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Int16LE+set)

<a name="types.Int16LE.byteLength"></a>

#### Int16LE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Int16LE</code>](#types.Int16LE)  
**Default**: <code>2</code>  
**Read only**: true  
<a name="types.Int16LE+int16le"></a>

#### int16LE.int16le : <code>number</code>
A 16-bit signed integer accessed in little-endian byte order.

**Kind**: instance property of [<code>Int16LE</code>](#types.Int16LE)  
<a name="types.Int16LE+get"></a>

#### int16LE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Int16LE</code>](#types.Int16LE)  
**Returns**: <code>number</code> - int16le  
<a name="types.Int16LE+set"></a>

#### int16LE.set(value)
**Kind**: instance method of [<code>Int16LE</code>](#types.Int16LE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Int32BE"></a>

### types.Int32BE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 32-bit signed integer in big-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Int32BE](#types.Int32BE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Int32BE.byteLength) : <code>number</code>
    * _instance_
        * [.int32be](#types.Int32BE+int32be) : <code>number</code>
        * [.get()](#types.Int32BE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Int32BE+set)

<a name="types.Int32BE.byteLength"></a>

#### Int32BE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Int32BE</code>](#types.Int32BE)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Int32BE+int32be"></a>

#### int32BE.int32be : <code>number</code>
A 32-bit signed integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Int32BE</code>](#types.Int32BE)  
<a name="types.Int32BE+get"></a>

#### int32BE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Int32BE</code>](#types.Int32BE)  
**Returns**: <code>number</code> - int32be  
<a name="types.Int32BE+set"></a>

#### int32BE.set(value)
**Kind**: instance method of [<code>Int32BE</code>](#types.Int32BE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Int32LE"></a>

### types.Int32LE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 32-bit signed integer in little-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Int32LE](#types.Int32LE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Int32LE.byteLength) : <code>number</code>
    * _instance_
        * [.int32le](#types.Int32LE+int32le) : <code>number</code>
        * [.get()](#types.Int32LE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Int32LE+set)

<a name="types.Int32LE.byteLength"></a>

#### Int32LE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Int32LE</code>](#types.Int32LE)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Int32LE+int32le"></a>

#### int32LE.int32le : <code>number</code>
A 32-bit signed integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Int32LE</code>](#types.Int32LE)  
<a name="types.Int32LE+get"></a>

#### int32LE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Int32LE</code>](#types.Int32LE)  
**Returns**: <code>number</code> - int32le  
<a name="types.Int32LE+set"></a>

#### int32LE.set(value)
**Kind**: instance method of [<code>Int32LE</code>](#types.Int32LE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Int8"></a>

### types.Int8 ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing an 8-bit signed integer.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Int8](#types.Int8) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Int8.byteLength) : <code>number</code>
    * _instance_
        * [.int8](#types.Int8+int8) : <code>number</code>
        * [.get()](#types.Int8+get) ⇒ <code>number</code>
        * [.set(value)](#types.Int8+set)

<a name="types.Int8.byteLength"></a>

#### Int8.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Int8</code>](#types.Int8)  
**Default**: <code>1</code>  
**Read only**: true  
<a name="types.Int8+int8"></a>

#### int8.int8 : <code>number</code>
An 8-bit signed integer.

**Kind**: instance property of [<code>Int8</code>](#types.Int8)  
<a name="types.Int8+get"></a>

#### int8.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Int8</code>](#types.Int8)  
**Returns**: <code>number</code> - int8  
<a name="types.Int8+set"></a>

#### int8.set(value)
**Kind**: instance method of [<code>Int8</code>](#types.Int8)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Long"></a>

### types.Long ⇐ [<code>Struct</code>](#Struct)
A union of all 8-byte predefined types.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Long](#types.Long) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Long.byteLength) : <code>number</code>
    * _instance_
        * [.float64be](#types.Long+float64be) : <code>number</code>
        * [.float64le](#types.Long+float64le) : <code>number</code>

<a name="types.Long.byteLength"></a>

#### Long.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Long</code>](#types.Long)  
**Default**: <code>8</code>  
**Read only**: true  
<a name="types.Long+float64be"></a>

#### long.float64be : <code>number</code>
A 64-bit floating point number accessed in big-endian byte order.

**Kind**: instance property of [<code>Long</code>](#types.Long)  
**See**: [IEEE 754 Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64)  
<a name="types.Long+float64le"></a>

#### long.float64le : <code>number</code>
A 64-bit floating point number accessed in little-endian byte order.

**Kind**: instance property of [<code>Long</code>](#types.Long)  
**See**: [IEEE 754 Double-precision floating-point format](https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64)  
<a name="types.Short"></a>

### types.Short ⇐ [<code>Struct</code>](#Struct)
A union of all 2-byte predefined types.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Short](#types.Short) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Short.byteLength) : <code>number</code>
    * _instance_
        * [.int16be](#types.Short+int16be) : <code>number</code>
        * [.int16le](#types.Short+int16le) : <code>number</code>
        * [.uint16be](#types.Short+uint16be) : <code>number</code>
        * [.uint16le](#types.Short+uint16le) : <code>number</code>

<a name="types.Short.byteLength"></a>

#### Short.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Short</code>](#types.Short)  
**Default**: <code>2</code>  
**Read only**: true  
<a name="types.Short+int16be"></a>

#### short.int16be : <code>number</code>
A 16-bit signed integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Short</code>](#types.Short)  
<a name="types.Short+int16le"></a>

#### short.int16le : <code>number</code>
A 16-bit signed integer accessed in little-endian byte order.

**Kind**: instance property of [<code>Short</code>](#types.Short)  
<a name="types.Short+uint16be"></a>

#### short.uint16be : <code>number</code>
A 16-bit unsigned integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Short</code>](#types.Short)  
<a name="types.Short+uint16le"></a>

#### short.uint16le : <code>number</code>
A 16-bit unsigned integer accessed in little-endian byte order.

**Kind**: instance property of [<code>Short</code>](#types.Short)  
<a name="types.Uint16BE"></a>

### types.Uint16BE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 16-bit unsigned integer in big-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Uint16BE](#types.Uint16BE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Uint16BE.byteLength) : <code>number</code>
    * _instance_
        * [.uint16be](#types.Uint16BE+uint16be) : <code>number</code>
        * [.get()](#types.Uint16BE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Uint16BE+set)

<a name="types.Uint16BE.byteLength"></a>

#### Uint16BE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Uint16BE</code>](#types.Uint16BE)  
**Default**: <code>2</code>  
**Read only**: true  
<a name="types.Uint16BE+uint16be"></a>

#### uint16BE.uint16be : <code>number</code>
A 16-bit unsigned integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Uint16BE</code>](#types.Uint16BE)  
<a name="types.Uint16BE+get"></a>

#### uint16BE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Uint16BE</code>](#types.Uint16BE)  
**Returns**: <code>number</code> - uint16be  
<a name="types.Uint16BE+set"></a>

#### uint16BE.set(value)
**Kind**: instance method of [<code>Uint16BE</code>](#types.Uint16BE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Uint16LE"></a>

### types.Uint16LE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 16-bit unsigned integer in little-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Uint16LE](#types.Uint16LE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Uint16LE.byteLength) : <code>number</code>
    * _instance_
        * [.uint16le](#types.Uint16LE+uint16le) : <code>number</code>
        * [.get()](#types.Uint16LE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Uint16LE+set)

<a name="types.Uint16LE.byteLength"></a>

#### Uint16LE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Uint16LE</code>](#types.Uint16LE)  
**Default**: <code>2</code>  
**Read only**: true  
<a name="types.Uint16LE+uint16le"></a>

#### uint16LE.uint16le : <code>number</code>
A 16-bit unsigned integer accessed in little-endian byte order.

**Kind**: instance property of [<code>Uint16LE</code>](#types.Uint16LE)  
<a name="types.Uint16LE+get"></a>

#### uint16LE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Uint16LE</code>](#types.Uint16LE)  
**Returns**: <code>number</code> - uint16le  
<a name="types.Uint16LE+set"></a>

#### uint16LE.set(value)
**Kind**: instance method of [<code>Uint16LE</code>](#types.Uint16LE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Uint32BE"></a>

### types.Uint32BE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 32-bit unsigned integer in big-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Uint32BE](#types.Uint32BE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Uint32BE.byteLength) : <code>number</code>
    * _instance_
        * [.uint32be](#types.Uint32BE+uint32be) : <code>number</code>
        * [.get()](#types.Uint32BE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Uint32BE+set)

<a name="types.Uint32BE.byteLength"></a>

#### Uint32BE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Uint32BE</code>](#types.Uint32BE)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Uint32BE+uint32be"></a>

#### uint32BE.uint32be : <code>number</code>
A 32-bit unsigned integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Uint32BE</code>](#types.Uint32BE)  
<a name="types.Uint32BE+get"></a>

#### uint32BE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Uint32BE</code>](#types.Uint32BE)  
**Returns**: <code>number</code> - uint32be  
<a name="types.Uint32BE+set"></a>

#### uint32BE.set(value)
**Kind**: instance method of [<code>Uint32BE</code>](#types.Uint32BE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Uint32LE"></a>

### types.Uint32LE ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing a 32-bit unsigned integer in little-endian byte order.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Uint32LE](#types.Uint32LE) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Uint32LE.byteLength) : <code>number</code>
    * _instance_
        * [.uint32le](#types.Uint32LE+uint32le) : <code>number</code>
        * [.get()](#types.Uint32LE+get) ⇒ <code>number</code>
        * [.set(value)](#types.Uint32LE+set)

<a name="types.Uint32LE.byteLength"></a>

#### Uint32LE.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Uint32LE</code>](#types.Uint32LE)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Uint32LE+uint32le"></a>

#### uint32LE.uint32le : <code>number</code>
A 32-bit unsigned integer accessed in little-endian byte order.

**Kind**: instance property of [<code>Uint32LE</code>](#types.Uint32LE)  
<a name="types.Uint32LE+get"></a>

#### uint32LE.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Uint32LE</code>](#types.Uint32LE)  
**Returns**: <code>number</code> - uint32le  
<a name="types.Uint32LE+set"></a>

#### uint32LE.set(value)
**Kind**: instance method of [<code>Uint32LE</code>](#types.Uint32LE)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Uint8"></a>

### types.Uint8 ⇐ [<code>Struct</code>](#Struct)
A predefined type for storing an 8-bit unsigned integer.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Uint8](#types.Uint8) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Uint8.byteLength) : <code>number</code>
    * _instance_
        * [.uint8](#types.Uint8+uint8) : <code>number</code>
        * [.get()](#types.Uint8+get) ⇒ <code>number</code>
        * [.set(value)](#types.Uint8+set)

<a name="types.Uint8.byteLength"></a>

#### Uint8.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Uint8</code>](#types.Uint8)  
**Default**: <code>1</code>  
**Read only**: true  
<a name="types.Uint8+uint8"></a>

#### uint8.uint8 : <code>number</code>
An 8-bit unsigned integer.

**Kind**: instance property of [<code>Uint8</code>](#types.Uint8)  
<a name="types.Uint8+get"></a>

#### uint8.get() ⇒ <code>number</code>
**Kind**: instance method of [<code>Uint8</code>](#types.Uint8)  
**Returns**: <code>number</code> - uint8  
<a name="types.Uint8+set"></a>

#### uint8.set(value)
**Kind**: instance method of [<code>Uint8</code>](#types.Uint8)  

| Param | Type |
| --- | --- |
| value | <code>number</code> | 

<a name="types.Word"></a>

### types.Word ⇐ [<code>Struct</code>](#Struct)
A union of all 4-byte predefined types.

**Kind**: static mixin of [<code>types</code>](#types)  
**Extends**: [<code>Struct</code>](#Struct)  

* [.Word](#types.Word) ⇐ [<code>Struct</code>](#Struct)
    * _static_
        * [.byteLength](#types.Word.byteLength) : <code>number</code>
    * _instance_
        * [.float32be](#types.Word+float32be) : <code>number</code>
        * [.float32le](#types.Word+float32le) : <code>number</code>
        * [.int32be](#types.Word+int32be) : <code>number</code>
        * [.int32le](#types.Word+int32le) : <code>number</code>
        * [.uint32be](#types.Word+uint32be) : <code>number</code>
        * [.uint32le](#types.Word+uint32le) : <code>number</code>

<a name="types.Word.byteLength"></a>

#### Word.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Word</code>](#types.Word)  
**Default**: <code>4</code>  
**Read only**: true  
<a name="types.Word+float32be"></a>

#### word.float32be : <code>number</code>
A 32-bit floating point number accessed in big-endian byte order.

**Kind**: instance property of [<code>Word</code>](#types.Word)  
**See**: [IEEE 754 Single-precision floating-point format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format#IEEE_754_single-precision_binary_floating-point_format:_binary32)  
<a name="types.Word+float32le"></a>

#### word.float32le : <code>number</code>
A 32-bit floating point number accessed in big-endian byte order.

**Kind**: instance property of [<code>Word</code>](#types.Word)  
**See**: [IEEE 754 Single-precision floating-point format](https://en.wikipedia.org/wiki/Single-precision_floating-point_format#IEEE_754_single-precision_binary_floating-point_format:_binary32)  
<a name="types.Word+int32be"></a>

#### word.int32be : <code>number</code>
A 32-bit signed integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Word</code>](#types.Word)  
<a name="types.Word+int32le"></a>

#### word.int32le : <code>number</code>
A 32-bit signed integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Word</code>](#types.Word)  
<a name="types.Word+uint32be"></a>

#### word.uint32be : <code>number</code>
A 32-bit unsigned integer accessed in big-endian byte order.

**Kind**: instance property of [<code>Word</code>](#types.Word)  
<a name="types.Word+uint32le"></a>

#### word.uint32le : <code>number</code>
A 32-bit unsigned integer accessed in little-endian byte order.

**Kind**: instance property of [<code>Word</code>](#types.Word)  

## License

Available under the MIT License
(c) 2017 Patrick Roberts

[npm-url]: https://www.npmjs.com/package/c-struct-js
[npm-image]: https://img.shields.io/npm/v/c-struct-js.svg

[node-image]: https://img.shields.io/node/v/c-struct-js.svg

[devdep-image]: https://img.shields.io/david/dev/patrickroberts/c-struct-js.svg

[license-url]: https://github.com/patrickroberts/c-struct-js/blob/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg

[style-url]: https://standardjs.com/
[style-image]: https://img.shields.io/badge/style-standard-brightgreen.svg

[filesize-url]: https://github.com/patrickroberts/c-struct-js/blob/master/umd/struct.min.js
[filesize-image]: https://img.shields.io/github/size/patrickroberts/c-struct-js/umd/struct.min.js.svg

[unpkg-url]: https://unpkg.com/
