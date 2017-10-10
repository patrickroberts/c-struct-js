export default function mergeClasses (Union, Class) {
  for (const key in Class.prototype) {
    if (Union.prototype.hasOwnProperty(key)) {
      throw new TypeError(`Union contains conflicting key ${key}`)
    }

    let proto = Class.prototype

    while (!proto.hasOwnProperty(key)) {
      proto = Object.getPrototypeOf(proto)
    }

    Object.defineProperty(Union.prototype, key, Object.getOwnPropertyDescriptor(proto, key))
  }

  Union.byteLength = Math.max(Union.byteLength, Class.byteLength)

  return Union
}
