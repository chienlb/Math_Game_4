import * as THREE from "three"

/**
 * Creates a realistic planet texture with gradient and surface details
 */
export function createPlanetTexture(
  baseColor: number,
  size: number = 512,
  options?: {
    gradientIntensity?: number
    noiseScale?: number
    patternType?: "smooth" | "rough" | "clouds" | "craters"
  },
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  const gradientIntensity = options?.gradientIntensity ?? 0.6
  const noiseScale = options?.noiseScale ?? 0.1
  const patternType = options?.patternType ?? "smooth"

  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2

  // Base color
  const baseColorObj = new THREE.Color(baseColor)
  const r = Math.floor(baseColorObj.r * 255)
  const g = Math.floor(baseColorObj.g * 255)
  const b = Math.floor(baseColorObj.b * 255)

  // Create realistic radial gradient for sphere effect with better lighting
  const gradient = ctx.createRadialGradient(centerX * 0.65, centerY * 0.65, 0, centerX, centerY, radius)
  
  // Light side (top-left) - brighter highlight
  const lightR = Math.min(255, r + 80)
  const lightG = Math.min(255, g + 80)
  const lightB = Math.min(255, b + 80)
  
  // Mid-tone
  const midR = Math.min(255, r + 20)
  const midG = Math.min(255, g + 20)
  const midB = Math.min(255, b + 20)
  
  // Dark side (bottom-right) - deeper shadow
  const darkR = Math.max(0, r - 60)
  const darkG = Math.max(0, g - 60)
  const darkB = Math.max(0, b - 60)

  gradient.addColorStop(0, `rgb(${lightR}, ${lightG}, ${lightB})`)
  gradient.addColorStop(0.3, `rgb(${midR}, ${midG}, ${midB})`)
  gradient.addColorStop(0.6, `rgb(${r}, ${g}, ${b})`)
  gradient.addColorStop(1, `rgb(${darkR}, ${darkG}, ${darkB})`)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Add surface patterns
  if (patternType === "rough") {
    // Add realistic noise/texture with better distribution
    const imageData = ctx.getImageData(0, 0, size, size)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const x = (i / 4) % size
      const y = Math.floor(i / 4 / size)
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
      
      if (dist < radius) {
        // Perlin-like noise with multiple octaves
        const noise1 = (Math.random() - 0.5) * 25
        const noise2 = (Math.random() - 0.5) * 15
        const noise3 = (Math.random() - 0.5) * 8
        const totalNoise = noise1 + noise2 * 0.5 + noise3 * 0.25
        
        // Add some color variation
        const colorVariation = (Math.random() - 0.5) * 10
        
        data[i] = Math.max(0, Math.min(255, data[i] + totalNoise + colorVariation)) // R
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + totalNoise)) // G
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + totalNoise - colorVariation)) // B
      }
    }
    ctx.putImageData(imageData, 0, 0)
  } else if (patternType === "clouds") {
    // Add realistic cloud-like patterns with better layering
    for (let i = 0; i < 30; i++) {
      const cloudX = centerX + (Math.random() - 0.5) * radius * 1.5
      const cloudY = centerY + (Math.random() - 0.5) * radius * 1.5
      const cloudRadius = radius * (0.08 + Math.random() * 0.25)
      
      // Main cloud
      const cloudGradient = ctx.createRadialGradient(cloudX, cloudY, 0, cloudX, cloudY, cloudRadius)
      cloudGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 + Math.random() * 0.3})`)
      cloudGradient.addColorStop(0.6, `rgba(255, 255, 255, ${0.2 + Math.random() * 0.2})`)
      cloudGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      
      ctx.fillStyle = cloudGradient
      ctx.beginPath()
      ctx.arc(cloudX, cloudY, cloudRadius, 0, Math.PI * 2)
      ctx.fill()
      
      // Add smaller cloud details for realism
      if (Math.random() > 0.5) {
        const detailX = cloudX + (Math.random() - 0.5) * cloudRadius * 0.8
        const detailY = cloudY + (Math.random() - 0.5) * cloudRadius * 0.8
        const detailRadius = cloudRadius * (0.4 + Math.random() * 0.3)
        
        const detailGradient = ctx.createRadialGradient(detailX, detailY, 0, detailX, detailY, detailRadius)
        detailGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + Math.random() * 0.2})`)
        detailGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
        
        ctx.fillStyle = detailGradient
        ctx.beginPath()
        ctx.arc(detailX, detailY, detailRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  } else if (patternType === "craters") {
    // Add realistic crater-like patterns with rim highlights
    for (let i = 0; i < 20; i++) {
      const craterX = centerX + (Math.random() - 0.5) * radius * 1.5
      const craterY = centerY + (Math.random() - 0.5) * radius * 1.5
      const craterRadius = radius * (0.04 + Math.random() * 0.12)
      
      // Crater shadow (darker center)
      const craterGradient = ctx.createRadialGradient(
        craterX - craterRadius * 0.4,
        craterY - craterRadius * 0.4,
        0,
        craterX,
        craterY,
        craterRadius,
      )
      craterGradient.addColorStop(0, `rgba(0, 0, 0, ${0.5 + Math.random() * 0.3})`)
      craterGradient.addColorStop(0.7, `rgba(0, 0, 0, ${0.2 + Math.random() * 0.2})`)
      craterGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      
      ctx.fillStyle = craterGradient
      ctx.beginPath()
      ctx.arc(craterX, craterY, craterRadius, 0, Math.PI * 2)
      ctx.fill()
      
      // Add rim highlight for realism
      const rimX = craterX + craterRadius * 0.3
      const rimY = craterY + craterRadius * 0.3
      const rimGradient = ctx.createRadialGradient(rimX, rimY, 0, rimX, rimY, craterRadius * 0.3)
      rimGradient.addColorStop(0, `rgba(255, 255, 255, ${0.2 + Math.random() * 0.2})`)
      rimGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      
      ctx.fillStyle = rimGradient
      ctx.beginPath()
      ctx.arc(rimX, rimY, craterRadius * 0.3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Add realistic highlight for sphere effect (Fresnel-like)
  const highlightGradient = ctx.createRadialGradient(
    centerX * 0.55,
    centerY * 0.55,
    0,
    centerX * 0.55,
    centerY * 0.55,
    radius * 0.5,
  )
  highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.5)")
  highlightGradient.addColorStop(0.5, "rgba(255, 255, 255, 0.2)")
  highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

  ctx.fillStyle = highlightGradient
  ctx.beginPath()
  ctx.arc(centerX * 0.55, centerY * 0.55, radius * 0.5, 0, Math.PI * 2)
  ctx.fill()
  
  // Add secondary highlight for more depth
  const secondaryHighlight = ctx.createRadialGradient(
    centerX * 0.7,
    centerY * 0.7,
    0,
    centerX * 0.7,
    centerY * 0.7,
    radius * 0.3,
  )
  secondaryHighlight.addColorStop(0, "rgba(255, 255, 255, 0.3)")
  secondaryHighlight.addColorStop(1, "rgba(255, 255, 255, 0)")

  ctx.fillStyle = secondaryHighlight
  ctx.beginPath()
  ctx.arc(centerX * 0.7, centerY * 0.7, radius * 0.3, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

/**
 * Creates a normal map for planet surface detail
 */
export function createPlanetNormalMap(size: number = 512): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  const centerX = size / 2
  const centerY = size / 2
  const radius = size / 2

  const imageData = ctx.createImageData(size, size)
  const data = imageData.data

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2)
      const index = (y * size + x) * 4

      if (dist < radius) {
        // Normal map: RGB = XYZ * 0.5 + 0.5
        const nx = (x - centerX) / radius
        const ny = (y - centerY) / radius
        const nz = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny))

        // Add some noise for surface detail
        const noise = (Math.random() - 0.5) * 0.1
        const finalNz = Math.max(0, Math.min(1, nz + noise))

        data[index] = Math.floor((nx * 0.5 + 0.5) * 255) // R
        data[index + 1] = Math.floor((ny * 0.5 + 0.5) * 255) // G
        data[index + 2] = Math.floor((finalNz * 0.5 + 0.5) * 255) // B
        data[index + 3] = 255 // A
      } else {
        data[index] = 128
        data[index + 1] = 128
        data[index + 2] = 255
        data[index + 3] = 0
      }
    }
  }

  ctx.putImageData(imageData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

