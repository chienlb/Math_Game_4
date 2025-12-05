import * as THREE from "three"
import { GAME_CONFIG } from "./constants"

/**
 * Creates a standard lighting setup for game scenes
 */
export function createGameLights(scene: THREE.Scene, options?: { intensity?: number; distance?: number }) {
  const intensity = options?.intensity ?? 2
  const distance = options?.distance ?? 150

  const lights: THREE.Light[] = []

  // Colored point lights
  const light1 = new THREE.PointLight(GAME_CONFIG.COLORS.LIGHT_CYAN, intensity, distance)
  light1.position.set(20, 20, 20)
  light1.castShadow = true
  scene.add(light1)
  lights.push(light1)

  const light2 = new THREE.PointLight(GAME_CONFIG.COLORS.LIGHT_PINK, intensity, distance)
  light2.position.set(-20, -20, 20)
  light2.castShadow = true
  scene.add(light2)
  lights.push(light2)

  const light3 = new THREE.PointLight(GAME_CONFIG.COLORS.LIGHT_GREEN, intensity * 0.75, distance * 0.67)
  light3.position.set(0, 25, 0)
  scene.add(light3)
  lights.push(light3)

  // Ambient light
  const ambientLight = new THREE.AmbientLight(GAME_CONFIG.COLORS.AMBIENT, 0.4)
  scene.add(ambientLight)
  lights.push(ambientLight)

  return lights
}

/**
 * Creates a sphere with material and shadow settings
 */
export function createSphereMesh(
  radius: number,
  color: THREE.Color | number,
  options?: {
    segments?: number
    metalness?: number
    roughness?: number
    emissiveIntensity?: number
  },
): THREE.Mesh {
  const segments = options?.segments ?? 64
  const geometry = new THREE.SphereGeometry(radius, segments, segments)
  const material = new THREE.MeshStandardMaterial({
    color: typeof color === "number" ? color : color.getHex(),
    metalness: options?.metalness ?? 0.5,
    roughness: options?.roughness ?? 0.3,
    emissiveIntensity: options?.emissiveIntensity ?? 0.7,
    envMapIntensity: 1.2,
  })

  if (color instanceof THREE.Color) {
    material.emissive = color.clone().multiplyScalar(0.7)
  }

  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true

  return mesh
}

/**
 * Creates a box/cube mesh with material and shadow settings
 */
export function createBoxMesh(
  size: number,
  color: THREE.Color | number,
  options?: {
    metalness?: number
    roughness?: number
    emissiveIntensity?: number
  },
): THREE.Mesh {
  const geometry = new THREE.BoxGeometry(size, size, size)
  const material = new THREE.MeshStandardMaterial({
    color: typeof color === "number" ? color : color.getHex(),
    metalness: options?.metalness ?? 0.6,
    roughness: options?.roughness ?? 0.3,
    emissiveIntensity: options?.emissiveIntensity ?? 0.6,
    envMapIntensity: 1.3,
  })

  if (color instanceof THREE.Color) {
    material.emissive = color instanceof THREE.Color ? color.clone().multiplyScalar(0.5) : new THREE.Color(0x000000)
  }

  const mesh = new THREE.Mesh(geometry, material)
  mesh.castShadow = true
  mesh.receiveShadow = true

  return mesh
}

/**
 * Creates a glowing sphere with multiple glow layers for bloom effect
 */
export function createGlowingSphere(
  radius: number,
  color: THREE.Color | number,
  options?: {
    segments?: number
    glowLayers?: number
    glowIntensity?: number
  },
): THREE.Group {
  const group = new THREE.Group()
  const segments = options?.segments ?? 64
  const glowLayers = options?.glowLayers ?? 3
  const glowIntensity = options?.glowIntensity ?? 0.8

  const colorHex = typeof color === "number" ? color : color.getHex()
  const colorObj = typeof color === "number" ? new THREE.Color(color) : color

  // Main sphere with enhanced materials
  const mainGeometry = new THREE.SphereGeometry(radius, segments, segments)
  const mainMaterial = new THREE.MeshStandardMaterial({
    color: colorHex,
    metalness: 0.9,
    roughness: 0.05,
    emissive: colorHex,
    emissiveIntensity: glowIntensity * 1.2,
    envMapIntensity: 1.5,
  })
  const mainSphere = new THREE.Mesh(mainGeometry, mainMaterial)
  mainSphere.castShadow = true
  mainSphere.receiveShadow = true
  group.add(mainSphere)

  // Glow layers
  for (let i = 0; i < glowLayers; i++) {
    const glowRadius = radius * (1.1 + i * 0.15)
    const glowGeometry = new THREE.SphereGeometry(glowRadius, 32, 32)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: colorHex,
      transparent: true,
      opacity: (0.3 - i * 0.08) * glowIntensity,
      side: THREE.BackSide,
    })
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial)
    group.add(glowMesh)
  }

  return group
}

/**
 * Creates a particle system with glowing particles
 */
export function createParticleSystem(
  count: number,
  color: THREE.Color | number,
  options?: {
    size?: number
    spread?: number
    speed?: number
  },
): { particles: THREE.Points; update: (time: number) => void } {
  const size = options?.size ?? 0.1
  const spread = options?.spread ?? 50
  const speed = options?.speed ?? 0.5

  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const velocities = new Float32Array(count * 3)

  const colorHex = typeof color === "number" ? color : color.getHex()
  const colorObj = typeof color === "number" ? new THREE.Color(color) : color

  for (let i = 0; i < count; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * spread
    positions[i3 + 1] = (Math.random() - 0.5) * spread
    positions[i3 + 2] = (Math.random() - 0.5) * spread

    const hue = Math.random()
    const particleColor = new THREE.Color().setHSL(hue, 0.9, 0.6)
    colors[i3] = particleColor.r
    colors[i3 + 1] = particleColor.g
    colors[i3 + 2] = particleColor.b

    sizes[i] = Math.random() * size + size * 0.5

    velocities[i3] = (Math.random() - 0.5) * speed
    velocities[i3 + 1] = (Math.random() - 0.5) * speed
    velocities[i3 + 2] = (Math.random() - 0.5) * speed
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.PointsMaterial({
    size: size * 10,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })

  const particles = new THREE.Points(geometry, material)

  const update = (time: number) => {
    const positions = geometry.attributes.position.array as Float32Array
    const colors = geometry.attributes.color.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Update position
      positions[i3] += velocities[i3] * 0.01
      positions[i3 + 1] += velocities[i3 + 1] * 0.01
      positions[i3 + 2] += velocities[i3 + 2] * 0.01

      // Bounce off boundaries
      if (Math.abs(positions[i3]) > spread / 2) velocities[i3] *= -1
      if (Math.abs(positions[i3 + 1]) > spread / 2) velocities[i3 + 1] *= -1
      if (Math.abs(positions[i3 + 2]) > spread / 2) velocities[i3 + 2] *= -1

      // Update color based on time
      const hue = (time * 0.1 + i * 0.01) % 1
      const particleColor = new THREE.Color().setHSL(hue, 0.9, 0.6)
      colors[i3] = particleColor.r
      colors[i3 + 1] = particleColor.g
      colors[i3 + 2] = particleColor.b
    }

    geometry.attributes.position.needsUpdate = true
    geometry.attributes.color.needsUpdate = true
  }

  return { particles, update }
}

/**
 * Creates a trail effect using a line
 */
export function createTrail(
  points: THREE.Vector3[],
  color: THREE.Color | number,
  options?: {
    width?: number
    opacity?: number
  },
): THREE.Line {
  const geometry = new THREE.BufferGeometry().setFromPoints(points)
  const colorHex = typeof color === "number" ? color : color.getHex()
  const material = new THREE.LineBasicMaterial({
    color: colorHex,
    transparent: true,
    opacity: options?.opacity ?? 0.6,
    linewidth: options?.width ?? 2,
  })
  return new THREE.Line(geometry, material)
}

/**
 * Creates enhanced lighting with more dynamic colors
 */
export function createEnhancedLights(scene: THREE.Scene, options?: { intensity?: number; distance?: number }) {
  const intensity = options?.intensity ?? 2.5
  const distance = options?.distance ?? 200

  const lights: THREE.Light[] = []

  // Multiple colored point lights for richer lighting
  const colors = [
    { color: 0x00f3ff, pos: [25, 25, 25] },
    { color: 0xff006e, pos: [-25, -25, 25] },
    { color: 0x00ff88, pos: [0, 30, 0] },
    { color: 0xffaa00, pos: [-30, 0, 30] },
    { color: 0xaa00ff, pos: [30, -20, 20] },
  ]

  colors.forEach(({ color, pos }) => {
    const light = new THREE.PointLight(color, intensity * 0.8, distance)
    light.position.set(pos[0], pos[1], pos[2])
    light.castShadow = true
    scene.add(light)
    lights.push(light)
  })

  // Enhanced ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  lights.push(ambientLight)

  // Hemisphere light for more natural lighting
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6)
  scene.add(hemisphereLight)
  lights.push(hemisphereLight)

  return lights
}
