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
  var Struct = window.Struct
</script>
```

<a name="Struct"></a>

## Struct ⇐ [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
**Kind**: global class  
**Extends**: [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)  

* [Struct](#Struct) ⇐ [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
    * [new Struct(buffer, [byteOffset])](#new_Struct_new)
    * _instance_
        * [.getString(byteOffset, byteLength, [encoding])](#Struct+getString) ⇒ <code>string</code>
        * [.setString(byteOffset, byteLength, value, [encoding])](#Struct+setString)
        * [.set(typedArray, [byteOffset])](#Struct+set)
    * _static_
        * [.byteLength](#Struct.byteLength) : <code>number</code>
        * [.extend(...descriptors)](#Struct.extend) ⇒ <code>constructor</code>
        * [.from(value, [byteOffset])](#Struct.from) ⇒ [<code>Struct</code>](#Struct)
        * [.isStruct(value)](#Struct.isStruct) ⇒ <code>boolean</code>
        * [.union(...Classes)](#Struct.union) ⇒ <code>constructor</code>

<a name="new_Struct_new"></a>

### new Struct(buffer, [byteOffset])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | [<code>ArrayBuffer</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) |  | An instance of ArrayBuffer to view. |
| [byteOffset] | <code>number</code> | <code>0</code> | Byte offset at which to view ArrayBuffer. |

**Example**  
```js
// create 3 classesconst Int32 = Struct.extend({ name: 'i32', type: 'Int32' })const Uint32 = Struct.extend({ name: 'u32', type: 'Uint32' })const Utf8 = Struct.extend({ name: 'str', type: 'String', byteLength: 4, option: 'binary' })// create a union of the 3 classesconst Union = Struct.union(Int32, Uint32, Utf8)// create an instance of the union to view an array bufferlet union = new Union(new ArrayBuffer(Union.byteLength))// set the string using binary encodingunion.str = 'ßé+å'// check uint32 valueconsole.log(union.u32.toString(16))// reverse bytesunion.setUint32(0, union.getUint32(0, true), false)// print all membersfor (const key in union) console.log(key, union[key].toString(16))
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
| value | <code>string</code> |  | Unencoded string value to write to ArrayBuffer. |
| [encoding] | <code>string</code> | <code>&quot;utf8&quot;</code> | Encoding within ArrayBuffer of string to write. |

<a name="Struct+set"></a>

### struct.set(typedArray, [byteOffset])
Sets memory in ArrayBuffer starting at byteOffset with data from typedArray.

**Kind**: instance method of [<code>Struct</code>](#Struct)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| typedArray | [<code>Buffer</code>](https://nodejs.org/api/buffer.html) \| [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) \| [<code>TypedArray</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) |  | View of data to copy. |
| [byteOffset] | <code>number</code> | <code>0</code> | Byte offset within ArrayBuffer at which to write. |

<a name="Struct.byteLength"></a>

### Struct.byteLength : <code>number</code>
Byte length of instances.

**Kind**: static property of [<code>Struct</code>](#Struct)  
**Default**: <code>0</code>  
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

<a name="Struct.from"></a>

### Struct.from(value, [byteOffset]) ⇒ [<code>Struct</code>](#Struct)
Creates an instance of Struct to view given value at byteOffset.

**Kind**: static method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) value must be a valid ArrayBuffer or view.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | [<code>ArrayBuffer</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) \| [<code>Buffer</code>](https://nodejs.org/api/buffer.html) \| [<code>DataView</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) \| [<code>TypedArray</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) |  | A valid ArrayBuffer or view of one. |
| [byteOffset] | <code>number</code> | <code>0</code> | Byte offset at which to view value. |

<a name="Struct.isStruct"></a>

### Struct.isStruct(value) ⇒ <code>boolean</code>
Validates constructors that extend Struct.

**Kind**: static method of [<code>Struct</code>](#Struct)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | A value to test. |

<a name="Struct.union"></a>

### Struct.union(...Classes) ⇒ <code>constructor</code>
Creates a union class that extends Struct with members of all Classes.

**Kind**: static method of [<code>Struct</code>](#Struct)  
**Throws**:

- [<code>TypeError</code>](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) Union contains conflicting key.


| Param | Type | Description |
| --- | --- | --- |
| ...Classes | <code>constructor</code> | Classes that extend Struct. |


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
