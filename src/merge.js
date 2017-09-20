export default function mergeClasses (Union, Class) {
  for (const key in Class.prototype) {
    if (Union.prototype.hasOwnProperty(key)) {
      throw new TypeError(`Union contains conflicting key ${key}`)
    }

    Object.defineProperty(Union.prototype, key, Object.getOwnPropertyDescriptor(Class.prototype, key))
  }

  Union.byteLength = Math.max(Union.byteLength, Class.byteLength)

  return Union
}
