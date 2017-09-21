const Struct = require('../../')

class Word extends Struct.extend(
  { name: 'word', type: 'String', byteLength: 4, option: 'binary' }
) {
  set (string) {
    this.word = string
  }
}

const Chunk = Struct.extend(
  { name: 'id', type: Word },
  { name: 'size', type: 'Uint32', option: true }
)

class Uint16LE extends Struct.extend(
  { name: 'uint16', type: 'Uint16', option: true }
) {
  set (number) {
    this.uint16 = number
  }
}

class Uint32LE extends Struct.extend(
  { name: 'uint32', type: 'Uint32', option: true }
) {
  set (number) {
    this.uint32 = number
  }
}

module.exports = class WAV extends Struct.extend(
  { name: 'chunk', type: Chunk },
  { name: 'format', type: Word },
  { name: 'subChunk1', type: Chunk },
  { name: 'audioFormat', type: Uint16LE },
  { name: 'numChannels', type: Uint16LE },
  { name: 'sampleRate', type: Uint32LE },
  { name: 'byteRate', type: Uint32LE },
  { name: 'blockAlign', type: Uint16LE },
  { name: 'bitsPerSample', type: Uint16LE },
  { name: 'subChunk2', type: Chunk }
) {
  constructor (numChannels, sampleRate, bitsPerSample) {
    const bytesPerSample = bitsPerSample >>> 3

    super(new ArrayBuffer(WAV.byteLength))

    this.chunk.id = 'RIFF'
    this.chunk.size = this.byteLength - this.chunk.byteLength
    this.format = 'WAVE'
    this.subChunk1.id = 'fmt '
    this.subChunk1.size = 16
    this.audioFormat = 1
    this.numChannels = numChannels
    this.sampleRate = sampleRate
    this.byteRate = numChannels * sampleRate * bytesPerSample
    this.blockAlign = numChannels * bytesPerSample
    this.bitsPerSample = bitsPerSample
    this.subChunk2.id = 'data'
    this.subChunk2.size = 0
  }
}
