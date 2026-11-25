import * as THREE from 'three'

export const PALETTE = {
  shell: '#eeecea', // pearl white, reads against the near-black hero
  trim: '#1c1a1c',
  visor: '#060508',
  glow: '#ff1f2e', // Netflix-red ember
  eyeA: '#ff2b3a',
  eyeB: '#ffc0b4',
  pink: '#ff5d8f',
  hot: '#ffd9c2',
}

export function createMaterials() {
  const shell = new THREE.MeshPhysicalMaterial({
    color: PALETTE.shell,
    roughness: 0.32,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.1,
  })
  const trim = new THREE.MeshPhysicalMaterial({
    color: PALETTE.trim,
    roughness: 0.38,
    metalness: 0.55,
    clearcoat: 0.6,
    envMapIntensity: 1,
  })
  const visor = new THREE.MeshPhysicalMaterial({
    color: PALETTE.visor,
    roughness: 0.08,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    envMapIntensity: 0.35,
  })
  const glow = new THREE.MeshStandardMaterial({
    color: '#1a0204',
    emissive: PALETTE.glow,
    emissiveIntensity: 2.2,
    toneMapped: false,
  })
  return { shell, trim, visor, glow }
}

const flameVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalV;
void main() {
  vUv = uv;
  vNormalV = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// After the cone is flipped, uv.y = 0 at the nozzle and 1 at the tip.
const flameFragment = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormalV;
uniform float uTime;
uniform float uPower;
uniform vec3 uEmber;
uniform vec3 uHot;
void main() {
  float s = vUv.y;
  float flick = 0.85 + 0.15 * sin(uTime * 38.0) * sin(uTime * 23.0 + 1.3);
  float len = mix(0.35, 1.0, uPower) * flick;
  float body = 1.0 - smoothstep(len * 0.55, len, s);
  float center = pow(abs(vNormalV.z), 1.6);
  vec3 col = mix(uHot, uEmber, smoothstep(0.0, len * 0.8, s));
  float a = body * (0.25 + 0.75 * center) * (0.55 + 0.45 * uPower);
  gl_FragColor = vec4(col * a * 1.6, a);
}
`

export function createFlameMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: flameVertex,
    fragmentShader: flameFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uPower: { value: 0.4 },
      uEmber: { value: new THREE.Color(PALETTE.glow) },
      uHot: { value: new THREE.Color(PALETTE.hot) },
    },
  })
}

const planeVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const portalFragment = /* glsl */ `
varying vec2 vUv;
uniform float uTime;
uniform float uOpen;
uniform vec3 uEmber;
uniform vec3 uHot;
void main() {
  vec2 p = (vUv - 0.5) * 2.0;
  float r = length(p);
  float a = atan(p.y, p.x);
  float rad = 0.78 * uOpen;
  float rim = exp(-abs(r - rad) * 28.0) * (0.75 + 0.25 * sin(a * 9.0 - uTime * 10.0));
  float inside = smoothstep(rad, rad * 0.6, r);
  float swirl = 0.5 + 0.5 * sin(a * 5.0 + r * 16.0 - uTime * 9.0);
  float core = inside * (0.25 + 0.5 * swirl) * (1.0 - r / max(rad, 0.001) * 0.6);
  vec3 col = mix(uEmber, uHot, clamp(rim * 0.7 + swirl * inside * 0.3, 0.0, 1.0));
  float alpha = clamp(rim + core, 0.0, 1.0) * uOpen;
  gl_FragColor = vec4(col * alpha * 1.6, alpha);
}
`

export function createPortalMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: planeVertex,
    fragmentShader: portalFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    toneMapped: false,
    uniforms: {
      uTime: { value: 0 },
      uOpen: { value: 0 },
      uEmber: { value: new THREE.Color(PALETTE.glow) },
      uHot: { value: new THREE.Color(PALETTE.hot) },
    },
  })
}

const groundFragment = /* glsl */ `
varying vec2 vUv;
uniform float uStrength;
uniform vec3 uColor;
void main() {
  float r = length((vUv - 0.5) * 2.0);
  float a = exp(-r * r * 4.0) * uStrength;
  gl_FragColor = vec4(uColor * a, a);
}
`

export function createGroundMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader: planeVertex,
    fragmentShader: groundFragment,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    toneMapped: false,
    uniforms: { uStrength: { value: 0.3 }, uColor: { value: new THREE.Color(PALETTE.glow) } },
  })
}

// A dark "product photography" studio: a gray room with a few HDR softboxes,
// baked to a PMREM so the glossy shell gets clean highlight streaks.
export function createStudioEnvironment(renderer) {
  const scene = new THREE.Scene()
  const disposables = []
  const add = (geometry, material, setup) => {
    const mesh = new THREE.Mesh(geometry, material)
    setup(mesh)
    scene.add(mesh)
    disposables.push(geometry, material)
  }
  const panel = (r, g, b) => new THREE.MeshBasicMaterial({ color: new THREE.Color(r, g, b), side: THREE.DoubleSide })

  add(new THREE.BoxGeometry(12, 12, 12), new THREE.MeshBasicMaterial({ color: '#141416', side: THREE.BackSide }), () => {})
  add(new THREE.PlaneGeometry(4, 3), panel(7, 7, 7), (m) => { m.position.set(3.5, 3.5, 4); m.lookAt(0, 0, 0) })
  add(new THREE.PlaneGeometry(0.8, 5), panel(4, 4, 4.2), (m) => { m.position.set(-4.5, 0.5, 3); m.lookAt(0, 0, 0) })
  add(new THREE.PlaneGeometry(0.35, 4), panel(3, 3, 3), (m) => { m.position.set(5, 0, -0.5); m.lookAt(0, 0, 0) })
  add(new THREE.PlaneGeometry(2.5, 2.5), panel(6, 0.4, 0.5), (m) => { m.position.set(-3.5, 2, -4.5); m.lookAt(0, 0, 0) })
  add(new THREE.PlaneGeometry(6, 6), panel(0.35, 0.33, 0.33), (m) => { m.position.set(0, -5.5, 0); m.lookAt(0, 0, 0) })

  const pmrem = new THREE.PMREMGenerator(renderer)
  const target = pmrem.fromScene(scene, 0.04)
  pmrem.dispose()
  disposables.forEach((d) => d.dispose())
  return target
}
