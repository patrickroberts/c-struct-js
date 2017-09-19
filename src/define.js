function length (type) {
  switch (type) {
    case 'Int8':
    case 'Uint8':
      return 1
    case 'Int16':
    case 'Uint16':
      return 2
    case 'Float32':
    case 'Int32':
    case 'Uint32':
      return 4
    case 'Float64':
      return 8
    case 'String':
      throw new TypeError('String type byteLength is required')
    default:
      if (this.isStruct(type)) {
        return type.byteLength
      }

      throw new TypeError(`Unexpected type ${type}`)
  }
}

function padding (alignment, offset) {
  const padding = alignment - (offset % alignment)

  switch (padding) {
    case alignment:
      return 0
    default:
      return padding
  }
}

function createGetter (type) {
  return this.isStruct(type) ? function getter (byteOffset) {
    return type.from(this, byteOffset)
  } : this.prototype[`get${type}`]
}

function createSetter (type) {
  return this.isStruct(type) ? function setter (byteOffset, value) {
    return type.from(this, byteOffset).set(value)
  } : this.prototype[`set${type}`]
}

export default function defineProperty (Class, {
  name, type, option,
  byteLength = length.call(Class, type),
  byteAlignment = Math.max(Class.byteAlignment, byteLength),
  byteOffset = Class.byteLength - Class.bytePadding + padding(byteLength, Class.byteLength - Class.bytePadding),
  bytePadding = padding(byteAlignment, byteOffset + byteLength)
}) {
  const getter = createGetter.call(Class, type)
  const setter = createSetter.call(Class, type)

  const descriptor = {
    configurable: true,
    enumerable: true
  }

  if (type === 'String') {
    Object.assign(descriptor, {
      get () {
        return getter.call(this, byteOffset, byteLength, option)
      },
      set (value) {
        return setter.call(this, byteOffset, byteLength, value, option)
      }
    })
  } else {
    Object.assign(descriptor, {
      get () {
        return getter.call(this, byteOffset, option)
      },
      set (value) {
        return setter.call(this, byteOffset, value, option)
      }
    })
  }

  Object.defineProperty(Class.prototype, name, descriptor)

  return Object.assign(Class, {
    byteAlignment,
    byteLength: Math.max(Class.byteLength, byteOffset + byteLength + bytePadding),
    bytePadding
  })
}
