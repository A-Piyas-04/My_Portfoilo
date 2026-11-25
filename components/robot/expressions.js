// Every expression is a set of weights the face shader blends between.
// Order matters: the index is the slot in the shader's uE[] uniform array.
export const KEYS = [
  'open', 'happy', 'worry', 'surprise', 'squint',
  'heart', 'star', 'ko', 'laugh', 'dizzy',
  'sleep', 'angry', 'wink', 'shades', 'skeptic',
  'smile', 'grin', 'mouthO', 'wavy', 'blush',
  'sweat', 'sparkle', 'zzz', 'loveFx', 'glitch',
]

export const K = Object.fromEntries(KEYS.map((k, i) => [k, i]))

const BASE = { open: 1, smile: 0.3 }

const PRESETS = {
  neutral: {},
  happy: { happy: 1, smile: 0.8, blush: 0.35 },
  joy: { happy: 1, grin: 1, blush: 0.6 },
  love: { heart: 1, smile: 0.85, blush: 0.9, loveFx: 1 },
  starstruck: { star: 1, grin: 0.9, sparkle: 1 },
  laugh: { laugh: 1, grin: 1, blush: 0.5 },
  wink: { wink: 1, smile: 0.95, blush: 0.3 },
  dizzy: { dizzy: 1, wavy: 1, smile: 0 },
  curious: { squint: 0.2, skeptic: 0.8, mouthO: 0.4, smile: 0 },
  surprised: { surprise: 1, mouthO: 1, smile: 0 },
  sleepy: { sleep: 1, zzz: 1, mouthO: 0.3, smile: 0 },
  cool: { shades: 1, smile: 0.75 },
  angry: { angry: 1, smile: -0.7 },
  worried: { open: 0.85, worry: 1, wavy: 0.6, sweat: 1, smile: -0.2 },
  thinking: { open: 0.8, worry: 0.25, squint: 0.55, skeptic: 0.5, smile: 0 },
  excited: { happy: 0.85, surprise: 0.3, grin: 0.8, sparkle: 0.5 },
  ko: { ko: 1, wavy: 0.8, glitch: 1, smile: 0 },
  shy: { happy: 0.6, worry: 0.4, blush: 1, smile: 0.4, sweat: 0.5 },
  presenting: { star: 1, grin: 1, sparkle: 1, blush: 0.4 },
}

export const EXPRESSIONS = Object.fromEntries(
  Object.entries(PRESETS).map(([name, p]) => {
    const arr = new Float32Array(KEYS.length)
    const merged = { ...BASE, ...p }
    KEYS.forEach((k, i) => { arr[i] = merged[k] ?? 0 })
    return [name, arr]
  })
)
