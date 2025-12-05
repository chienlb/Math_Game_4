"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { createPlanetTexture, createPlanetNormalMap } from "@/lib/planet-textures"

const STAR_COUNT = 2000
const SUN_RADIUS = 12
const SUN_GLOW_RADIUS_1 = 13.5
const SUN_GLOW_RADIUS_2 = 15.5
const SUN_GLOW_RADIUS_3 = 18

const PLANETS = [
  {
    name: "Mercury",
    size: 4,
    distance: 28,
    speed: 0.08,
    color: 0x8c7853,
    emissive: 0x4a3d2a,
    rings: false,
    glowColor: 0xaa9066,
    patternType: "craters" as const,
  },
  {
    name: "Venus",
    size: 5,
    distance: 42,
    speed: 0.03,
    color: 0xffc649,
    emissive: 0xffaa00,
    rings: false,
    glowColor: 0xffd880,
    patternType: "clouds" as const,
  },
  {
    name: "Earth",
    size: 4.8,
    distance: 58,
    speed: 0.018,
    color: 0x2e7cde,
    emissive: 0x1a4a8a,
    rings: false,
    glowColor: 0x4a9eff,
    patternType: "clouds" as const,
  },
  {
    name: "Mars",
    size: 4.2,
    distance: 75,
    speed: 0.012,
    color: 0xe27b58,
    emissive: 0x8a4a35,
    rings: false,
    glowColor: 0xff9d7a,
    patternType: "rough" as const,
  },
] as const

export default function SolarSystemBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null)
  const raycasterRef = useRef<THREE.Raycaster | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = window.innerWidth
    const height = window.innerHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    camera.position.z = 100
    renderer.setSize(width, height)
    renderer.setClearColor(0x0a0e27, 1)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    // Enhanced stars background with twinkling
    const starsGeometry = new THREE.BufferGeometry()
    const starPositions = new Float32Array(STAR_COUNT * 3)
    const starSizes = new Float32Array(STAR_COUNT)
    const starOpacities = new Float32Array(STAR_COUNT)

    for (let i = 0; i < STAR_COUNT * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 2000
      starPositions[i + 1] = (Math.random() - 0.5) * 2000
      starPositions[i + 2] = (Math.random() - 0.5) * 2000
      starSizes[i / 3] = Math.random() * 2 + 0.5
      starOpacities[i / 3] = Math.random()
    }

    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3))
    starsGeometry.setAttribute("size", new THREE.BufferAttribute(starSizes, 1))
    starsGeometry.setAttribute("opacity", new THREE.BufferAttribute(starOpacities, 1))

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Enhanced Sun with realistic texture
    const sunGroup = new THREE.Group()

    // Create sun texture
    const sunTexture = createPlanetTexture(0xfdb813, 512, {
      gradientIntensity: 0.8,
      patternType: "smooth",
    })

    // Main sun with texture
    const sunGeometry = new THREE.SphereGeometry(SUN_RADIUS, 64, 64)
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xfdb813,
      emissiveIntensity: 1.5,
      metalness: 0.1,
      roughness: 0.2,
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.castShadow = true
    sunGroup.add(sun)

    // Multiple glow layers
    for (let i = 0; i < 4; i++) {
      const glowRadius = SUN_RADIUS + 1.5 + i * 2
      const glowGeometry = new THREE.SphereGeometry(glowRadius, 32, 32)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0xffa500 : i === 1 ? 0xff8c00 : i === 2 ? 0xff6b00 : 0xff4500,
      transparent: true,
        opacity: (0.4 - i * 0.08),
        side: THREE.BackSide,
    })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      sunGroup.add(glow)
    }

    scene.add(sunGroup)

    // Create realistic planets with textures
    const planetGroups: THREE.Group[] = []
    const planetMeshes: THREE.Mesh[] = []

    PLANETS.forEach((planet) => {
      const planetGroup = new THREE.Group()

      // Orbit line with glow
      const orbitGeometry = new THREE.BufferGeometry()
      const orbitPoints: number[] = []
      for (let i = 0; i <= 256; i++) {
        const angle = (i / 256) * Math.PI * 2
        orbitPoints.push(Math.cos(angle) * planet.distance, 0, Math.sin(angle) * planet.distance)
      }
      orbitGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(orbitPoints), 3))

      // Outer glow orbit
      const orbitGlowMaterial = new THREE.LineBasicMaterial({
        color: planet.glowColor,
        transparent: true,
        opacity: 0.08,
        linewidth: 2,
      })
      const orbitGlow = new THREE.Line(orbitGeometry, orbitGlowMaterial)
      scene.add(orbitGlow)

      // Main orbit line
      const orbitMaterial = new THREE.LineBasicMaterial({
        color: 0x4a5568,
        transparent: true,
        opacity: 0.4,
        linewidth: 1,
      })
      const orbit = new THREE.Line(orbitGeometry, orbitMaterial)
      scene.add(orbit)

      // Create realistic planet with texture
      const planetGeometry = new THREE.SphereGeometry(planet.size, 64, 64)
      
      // Create planet texture
      const planetTexture = createPlanetTexture(planet.color, 512, {
        gradientIntensity: 0.7,
        patternType: planet.patternType,
      })
      
      // Create normal map for surface detail
      const normalMap = createPlanetNormalMap(512)

      const planetMaterial = new THREE.MeshStandardMaterial({
        map: planetTexture,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.8, 0.8),
        color: planet.color,
        emissive: planet.emissive,
        emissiveIntensity: 0.15,
        metalness: 0.05,
        roughness: 0.85,
        envMapIntensity: 1.0,
      })

      const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial)
      planetMesh.castShadow = true
      planetMesh.receiveShadow = true
      planetGroup.add(planetMesh)

      // Subtle glow around planet
      const glowGeometry = new THREE.SphereGeometry(planet.size * 1.15, 32, 32)
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: planet.glowColor,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
      })
      const glow = new THREE.Mesh(glowGeometry, glowMaterial)
      planetGroup.add(glow)

      // Add orbiting particles around planet
      const particleCount = 6
      for (let i = 0; i < particleCount; i++) {
        const particleGeom = new THREE.SphereGeometry(0.12, 12, 12)
        const particleMat = new THREE.MeshBasicMaterial({
          color: planet.glowColor,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
        })
        const particle = new THREE.Mesh(particleGeom, particleMat)
        const angle = (i / particleCount) * Math.PI * 2
        particle.userData = {
          angle: angle,
          distance: planet.size * 1.8,
          speed: 0.04,
        }
        planetGroup.add(particle)
      }

      // Store planet data
      planetGroup.userData = {
        angle: Math.random() * Math.PI * 2,
        ...planet,
        hovered: false,
      }

      scene.add(planetGroup)
      planetGroups.push(planetGroup)
      planetMeshes.push(planetMesh)
    })

    // Enhanced lighting for realistic spheres
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const sunLight = new THREE.PointLight(0xfdb813, 4, 300)
    sunLight.position.copy(sun.position)
    sunLight.castShadow = true
    sunLight.shadow.mapSize.width = 2048
    sunLight.shadow.mapSize.height = 2048
    scene.add(sunLight)

    // Directional light from sun for better sphere lighting
    const directionalLight = new THREE.DirectionalLight(0xfdb813, 2)
    directionalLight.position.set(0, 0, 0)
    directionalLight.castShadow = true
    scene.add(directionalLight)

    // Additional accent lights for depth
    const accentLight1 = new THREE.PointLight(0x00d9ff, 1, 200)
    accentLight1.position.set(-120, 60, 60)
    scene.add(accentLight1)

    const accentLight2 = new THREE.PointLight(0xff006e, 0.8, 200)
    accentLight2.position.set(120, -60, 60)
    scene.add(accentLight2)

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    raycasterRef.current = raycaster

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width) * 2 - 1
      mouseRef.current.y = -(e.clientY / height) * 2 + 1
    }

    const handleClick = (e: MouseEvent) => {
      const mouse = new THREE.Vector2()
      mouse.x = (e.clientX / width) * 2 - 1
      mouse.y = -(e.clientY / height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(planetMeshes, true)

      if (intersects.length > 0) {
        const planetMesh = intersects[0].object
        const planetGroup = planetMesh.parent as THREE.Group
        if (planetGroup && planetGroup.userData.name) {
          console.log(`Clicked on ${planetGroup.userData.name}`)
        }
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop with frame limiting
    let animationId: number
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS
    
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const currentTime = Date.now()
      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return
      
      lastTime = currentTime - (deltaTime % frameInterval)
      const time = currentTime * 0.001

      // Rotate sun with enhanced effects
      sunGroup.rotation.y += 0.004
      sunGroup.children.forEach((child, i) => {
        if (i > 0) {
          child.rotation.y += (0.002 - i * 0.0005) * (i % 2 === 0 ? 1 : -1)
        }
      })

      // Pulsing sun glow
      const pulseScale = 1 + Math.sin(time * 1.5) * 0.15
      if (sunGroup.children[1]) {
        sunGroup.children[1].scale.set(pulseScale, pulseScale, pulseScale)
      }

      // Animate planets with realistic rotation
      planetGroups.forEach((planetGroup) => {
        const planetData = planetGroup.userData

        // Orbital motion
        planetData.angle += planetData.speed
        planetGroup.position.x = Math.cos(planetData.angle) * planetData.distance
        planetGroup.position.z = Math.sin(planetData.angle) * planetData.distance

        // Realistic rotation (planets rotate on their axis)
        planetGroup.rotation.y += 0.015
        planetGroup.rotation.x = Math.sin(planetData.angle * 0.3) * 0.05

        // Subtle y wobble
        planetGroup.position.y = Math.sin(planetData.angle * 0.5) * 2

        // Subtle scale pulsing
        const scale = 1 + Math.sin(time * 0.5 + planetData.angle) * 0.05
        planetGroup.scale.set(scale, scale, scale)

        // Animate orbiting particles
        planetGroup.children.forEach((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh && child.userData.angle !== undefined) {
            child.userData.angle += child.userData.speed
            const angle = child.userData.angle
            const distance = child.userData.distance

            child.position.x = Math.cos(angle) * distance
            child.position.y = Math.sin(angle * 0.7) * distance
            child.position.z = Math.sin(angle * 1.2) * distance * 0.5

            child.rotation.x += 0.05
            child.rotation.y += 0.05

            // Pulsing particles
            const particlePulse = Math.sin(time * 3 + child.userData.angle) * 0.3 + 0.7
            child.scale.set(particlePulse, particlePulse, particlePulse)
          }
        })

        // Hover effect detection
        const planetIndex = planetGroups.indexOf(planetGroup)
        if (planetIndex >= 0 && planetIndex < planetMeshes.length) {
          raycaster.setFromCamera(new THREE.Vector2(mouseRef.current.x, mouseRef.current.y), camera)
          const intersects = raycaster.intersectObject(planetMeshes[planetIndex], true)

          const isHovered = intersects.length > 0
          
          if (isHovered && !planetData.hovered) {
            planetData.hovered = true
            setHoveredPlanet(planetData.name)
          } else if (!isHovered && planetData.hovered) {
            planetData.hovered = false
            setHoveredPlanet((prev) => (prev === planetData.name ? null : prev))
          }

          // Hover scale effect
          if (planetData.hovered) {
            const hoverScale = 1.2
            planetGroup.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), 0.1)
          } else {
            planetGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
          }
        }
      })

      // Enhanced camera movement based on mouse
      camera.position.x += (mouseRef.current.x * 20 - camera.position.x) * 0.03
      camera.position.y += (mouseRef.current.y * 20 - camera.position.y) * 0.03
      camera.lookAt(scene.position)

      // Twinkling stars
      const opacities = starsGeometry.attributes.opacity.array as Float32Array
      for (let i = 0; i < STAR_COUNT; i++) {
        opacities[i] = Math.sin(time * 2 + i) * 0.5 + 0.5
      }
      starsGeometry.attributes.opacity.needsUpdate = true

      // Rotate stars slowly
      stars.rotation.y += 0.00003

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationId)

      // Cleanup textures
      sunTexture.dispose()
      planetMeshes.forEach((mesh) => {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          if (mesh.material.map) mesh.material.map.dispose()
          if (mesh.material.normalMap) mesh.material.normalMap.dispose()
        }
      })

      // Cleanup geometries and materials
      scene.traverse((object: THREE.Object3D) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Points) {
          if (object.geometry) object.geometry.dispose()
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        }
      })

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [hoveredPlanet])

  return (
    <>
      <div ref={containerRef} className="fixed inset-0 -z-20" />
    </>
  )
}
