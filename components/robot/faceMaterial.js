import * as THREE from 'three'
import { KEYS } from './expressions'

// The robot's face is a phone screen. Eyes, brows and mouth are signed distance
// fields that morph into each other as the expression weights (uE[]) blend.

const vertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragment = /* glsl */ `
#define NK ${KEYS.length}
${KEYS.map((k, i) => `#define E_${k.toUpperCase()} uE[${i}]`).join('\n')}

varying vec2 vUv;
uniform float uE[NK];
uniform float uTime;
uniform float uAspect;
uniform float uIntensity;
uniform float uBlink;
uniform float uSwap;
uniform vec2 uLook;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uPink;

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float dot2(vec2 v) { return dot(v, v); }
mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float sdRoundBox(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}
float sdSeg(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}
float sdArc(vec2 p, vec2 sc, float ra, float rb) {
  p.x = abs(p.x);
  return ((sc.y * p.x > sc.x * p.y) ? length(p - sc * ra) : abs(length(p) - ra)) - rb;
}
float sdHeart(vec2 p) {
  p.x = abs(p.x);
  if (p.y + p.x > 1.0) return sqrt(dot2(p - vec2(0.25, 0.75))) - sqrt(2.0) / 4.0;
  return sqrt(min(dot2(p - vec2(0.0, 1.0)), dot2(p - 0.5 * max(p.x + p.y, 0.0)))) * sign(p.x - p.y);
}
float sdStar5(vec2 p, float r, float rf) {
  const vec2 k1 = vec2(0.809016994375, -0.587785252292);
  const vec2 k2 = vec2(-k1.x, k1.y);
  p.x = abs(p.x);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1;
  p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = abs(p.x);
  p.y -= r;
  vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0.0, 1.0);
  float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
  return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
}

float aa(float d) { float w = fwidth(d) * 1.2 + 0.001; return 1.0 - smoothstep(-w, w, d); }
float halo(float d) { return exp(-max(d, 0.0) * 30.0) * 0.5; }

vec2 eyeCenter(float side) {
  return vec2(side * 0.3, 0.06) + uLook * vec2(0.08, 0.06);
}

float eye(vec2 p, float side) {
  vec2 q = p - eyeCenter(side);
  q = rot(side * 0.32 * E_WORRY) * q;
  q.y += 0.03 * E_WORRY;
  float sk = E_SKEPTIC * step(0.0, side);
  q /= 1.0 + 0.15 * E_SURPRISE;

  float open = max(E_OPEN * (1.0 - E_SQUINT * 0.55) * (1.0 - sk * 0.45) * uBlink, 0.06);
  vec2 qs = vec2(q.x, q.y / open);
  float dPill = sdRoundBox(qs, vec2(0.075, 0.13), 0.072) * min(1.0, open + 0.25);
  float cut = dot(q - vec2(0.0, 0.025), normalize(vec2(-side * 0.8, 1.0)));
  dPill = mix(dPill, max(dPill, cut), E_ANGRY);

  float dRing = min(abs(length(q) - 0.115) - 0.03, length(q - uLook * 0.035) - 0.036);
  float dArc = sdArc(q - vec2(0.0, -0.045), vec2(sin(1.15), cos(1.15)), 0.11, 0.03);
  float hb = 0.22 * (1.0 + 0.09 * sin(uTime * 9.0));
  float dHeart = sdHeart(q / hb + vec2(0.0, 0.52)) * hb;
  float dStar = sdStar5(rot(uTime * 0.9 * side) * q, 0.15, 0.45);
  float qx = q.x * -side;
  vec2 qc = vec2(qx, q.y + 0.012 * sin(uTime * 22.0));
  float dChev = min(sdSeg(qc, vec2(-0.07, 0.09), vec2(0.06, 0.0)), sdSeg(qc, vec2(0.06, 0.0), vec2(-0.07, -0.09))) - 0.028;
  float dX = min(sdSeg(q, vec2(-0.08), vec2(0.08)), sdSeg(q, vec2(-0.08, 0.08), vec2(0.08, -0.08))) - 0.026;
  vec2 sq = rot(uTime * 5.0 * side) * q;
  float r = length(sq);
  float f = r / 0.042 - (atan(sq.y, sq.x) / 6.2831853);
  float dSpiral = max(abs(fract(f) - 0.5) * 0.042 - 0.009, r - 0.13);
  float dLine = sdArc(vec2(q.x, -q.y) + vec2(0.0, 0.09), vec2(sin(0.9), cos(0.9)), 0.11, 0.022);

  float wink = E_WINK * step(side, 0.0);
  float d = dPill;
  d = mix(d, dRing, E_SURPRISE);
  d = mix(d, dArc, max(E_HAPPY, wink));
  d = mix(d, dHeart, E_HEART);
  d = mix(d, dStar, E_STAR);
  d = mix(d, dChev, E_LAUGH);
  d = mix(d, dX, E_KO);
  d = mix(d, dSpiral, E_DIZZY);
  d = mix(d, dLine, E_SLEEP);
  return d;
}

float brow(vec2 p, float side) {
  vec2 c = eyeCenter(side);
  float sk = E_SKEPTIC * step(0.0, side);
  float t = E_ANGRY - E_WORRY;
  vec2 inner = vec2(c.x - side * 0.085, c.y + 0.2 - 0.055 * t + 0.06 * sk);
  vec2 outer = vec2(c.x + side * 0.085, c.y + 0.2 + 0.025 * t + 0.06 * sk);
  return sdSeg(p, inner, outer) - 0.017;
}

float mouth(vec2 p) {
  vec2 m = p - vec2(0.0, -0.27) - uLook * vec2(0.05, 0.03);
  float k = E_SMILE;
  float w = 0.085 + 0.03 * abs(k);
  float xx = clamp(m.x, -w, w);
  float yy = -0.055 * k * (1.0 - (xx * xx) / (w * w));
  float dCurve = length(vec2(m.x - xx, m.y - yy)) - 0.02;

  float w2 = 0.11;
  float x2 = clamp(m.x, -w2, w2);
  float dWave = length(vec2(m.x - x2, m.y - 0.02 * sin(x2 * 55.0 + uTime * 7.0))) - 0.018;

  vec2 g = m - vec2(0.0, 0.035);
  g.y /= 1.0 + 0.18 * E_LAUGH * sin(uTime * 22.0);
  float dGrin = max(length(g * vec2(1.0, 1.2)) - 0.115, g.y);

  float dO = abs(length(m * vec2(1.0, 0.85)) - 0.045 - 0.02 * E_MOUTHO) - 0.018;

  float d = dCurve;
  d = mix(d, dWave, E_WAVY);
  d = mix(d, dGrin, E_GRIN);
  d = mix(d, dO, E_MOUTHO);
  return d;
}

void main() {
  vec2 uv = vUv;
  float glitch = clamp(E_GLITCH + uSwap * 0.45, 0.0, 1.0);
  float row = floor(uv.y * 28.0);
  float n = hash(row * 7.13 + floor(uTime * 24.0));
  uv.x += (n - 0.5) * 0.12 * glitch * step(0.55, n);

  vec2 p = (uv - 0.5) * vec2(uAspect, 1.0);
  vec2 p0 = (vUv - 0.5) * vec2(uAspect, 1.0);

  float dScreen = sdRoundBox(p0, vec2(uAspect * 0.5, 0.5), 0.12);
  if (dScreen > 0.0) discard;

  vec3 accent = uColorA;
  vec3 col = vec3(0.012, 0.006, 0.01) + accent * 0.07 * max(0.0, 1.0 - length(p0) * 1.1);

  // Eyes, brows, mouth.
  float dE = min(eye(p, -1.0), eye(p, 1.0));
  float eyeDim = 1.0 - 0.85 * E_SHADES;
  float browW = max(E_ANGRY, max(E_WORRY * 0.9, E_SKEPTIC));
  float dB = min(brow(p, -1.0), brow(p, 1.0));
  float dM = mouth(p);

  float feat = (aa(dE) + halo(dE)) * eyeDim + (aa(dB) + halo(dB) * 0.6) * browW + aa(dM) + halo(dM) * 0.8;
  vec3 grad = mix(uColorA, uColorB, smoothstep(-0.25, 0.3, p.y));

  // Sunglasses.
  vec2 lc = vec2(0.3, 0.07) + uLook * vec2(0.05, 0.03);
  float lensL = sdRoundBox(p - vec2(-lc.x, lc.y), vec2(0.155, 0.1), 0.06);
  float lensR = sdRoundBox(p - lc, vec2(0.155, 0.1), 0.06);
  float lens = min(lensL, lensR);
  float bridge = sdSeg(p, vec2(-0.15, 0.13) + vec2(0.0, uLook.y * 0.03), vec2(0.15, 0.13) + vec2(0.0, uLook.y * 0.03)) - 0.014;
  float rim = min(abs(lens) - 0.012, bridge);
  float glintPos = mod(uTime * 0.7, 3.0) - 1.2;
  float glint = aa(lens) * exp(-abs(p.x + p.y * 0.8 - glintPos) * 40.0);
  float shades = (aa(rim) + halo(rim) * 0.5 + aa(lens) * 0.12 + glint * 0.9) * E_SHADES;

  col += grad * (feat + shades) * uIntensity * (0.93 + 0.07 * sin(vUv.y * 320.0 + uTime * 4.0));

  // Blush.
  for (int i = 0; i < 2; i++) {
    float side = i == 0 ? -1.0 : 1.0;
    vec2 b = (p - vec2(side * 0.46, -0.13)) * vec2(1.0, 1.8);
    col += uPink * exp(-dot(b, b) * 90.0) * 0.55 * E_BLUSH;
  }

  // Sweat drop.
  vec2 s = p - vec2(0.58, 0.24 - 0.04 * fract(uTime * 0.8));
  float dS = length(vec2(s.x * (1.0 + max(s.y, 0.0) * 30.0), s.y)) - 0.034;
  col += vec3(0.75, 0.85, 1.0) * (aa(dS) + halo(dS) * 0.4) * E_SWEAT * 0.8;

  // Sparkles.
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    vec2 pos = vec2(-0.6 + fi * 0.58, 0.32 - fi * 0.17 + mod(fi, 2.0) * 0.2);
    float tw = max(0.0, sin(uTime * 4.0 + fi * 2.1));
    vec2 sp = p - pos;
    float spark = exp(-abs(sp.x) * 120.0 - abs(sp.y) * 26.0) + exp(-abs(sp.y) * 120.0 - abs(sp.x) * 26.0);
    col += mix(uColorB, vec3(1.0), 0.5) * spark * tw * E_SPARKLE * 1.4;
  }

  // Floating hearts.
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    float f = fract(uTime * 0.4 + fi / 3.0);
    vec2 pos = vec2(-0.55 + fi * 0.55 + 0.04 * sin(uTime * 2.0 + fi * 1.7), -0.45 + f * 0.95);
    float dh = sdHeart((p - pos) / 0.075 + vec2(0.0, 0.5)) * 0.075;
    col += uPink * aa(dh) * (1.0 - f) * smoothstep(0.0, 0.15, f) * E_LOVEFX * 0.9;
  }

  // Z z z.
  for (int i = 0; i < 2; i++) {
    float fi = float(i);
    float f = fract(uTime * 0.35 + fi * 0.5);
    float z = 0.035 + f * 0.035;
    vec2 zq = (p - vec2(0.48 + f * 0.16, 0.08 + f * 0.33)) / z;
    float dZ = min(min(sdSeg(zq, vec2(-1.0, 1.0), vec2(1.0, 1.0)), sdSeg(zq, vec2(1.0, 1.0), vec2(-1.0, -1.0))), sdSeg(zq, vec2(-1.0, -1.0), vec2(1.0, -1.0))) * z - 0.007;
    col += grad * aa(dZ) * (1.0 - f) * smoothstep(0.0, 0.1, f) * E_ZZZ;
  }

  // Phone chrome: punch-hole camera, signal bars, battery.
  float cam = length(p0 - vec2(0.0, 0.42));
  col = mix(col, vec3(0.0), aa(cam - 0.018));
  col += vec3(0.35) * aa(abs(cam - 0.018) - 0.002) * 0.4;
  float chrome = 0.0;
  for (int i = 0; i < 3; i++) {
    float fi = float(i);
    chrome += aa(sdRoundBox(p0 - vec2(-0.66 + fi * 0.022, 0.405 + fi * 0.006), vec2(0.006, 0.008 + fi * 0.006), 0.002));
  }
  float bat = sdRoundBox(p0 - vec2(0.64, 0.415), vec2(0.04, 0.017), 0.006);
  chrome += aa(abs(bat) - 0.003);
  float level = 0.55 + 0.4 * sin(uTime * 0.2);
  chrome += aa(sdRoundBox(p0 - vec2(0.64 - 0.032 * (1.0 - level), 0.415), vec2(0.032 * level, 0.009), 0.003));
  col += grad * chrome * 0.32;

  // Glass: edge glow, soft diagonal highlight, scanlines, glitch flicker.
  col += accent * exp(-abs(dScreen) * 60.0) * 0.18;
  col += vec3(1.0) * smoothstep(0.09, 0.0, abs(p0.x * 0.55 + p0.y - 0.32)) * 0.045;
  col *= 0.94 + 0.06 * sin(vUv.y * 420.0);
  col *= 1.0 - 0.45 * glitch * step(0.82, hash(floor(uTime * 30.0)));
  col.r += glitch * 0.06 * step(0.6, n);

  gl_FragColor = vec4(col, 1.0);
}
`

export function createFaceMaterial({ colorA, colorB, pink, aspect }) {
  return new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    toneMapped: false,
    uniforms: {
      uE: { value: new Float32Array(KEYS.length) },
      uTime: { value: 0 },
      uAspect: { value: aspect },
      uIntensity: { value: 1.25 },
      uBlink: { value: 1 },
      uSwap: { value: 0 },
      uLook: { value: new THREE.Vector2() },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uPink: { value: new THREE.Color(pink) },
    },
  })
}
