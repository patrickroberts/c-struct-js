export default function defineProperty (Class, {
  name, type, option,
  byteLength = length.call(Class, type),
  byteOffset = Class.byteLength
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

  return Object.assign(Class, { byteLength: byteOffset + byteLength })
}

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
      throw new TypeError('byteLength is required for String type')
    default:
      if (this.isStruct(type)) {
        return type.byteLength
      }

      throw new TypeError(`Unexpected type ${type}`)
  }
}

function createGetter (type) {
  return this.isStruct(type) ? function getter (byteOffset) {
    return type.from(this, this.byteOffset + byteOffset)
  } : this.prototype[`get${type}`]
}

function createSetter (type) {
  return this.isStruct(type) ? function setter (byteOffset, value) {
    return type.from(this, this.byteOffset + byteOffset).set(value)
  } : this.prototype[`set${type}`]
}
