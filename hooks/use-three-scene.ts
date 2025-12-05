import { useEffect, useRef, RefObject } from "react"
import * as THREE from "three"
import { GAME_CONFIG } from "@/lib/constants"

interface UseThreeSceneOptions {
  containerRef: RefObject<HTMLDivElement>
  onAnimate?: (scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) => void
  cameraPosition?: { x?: number; y?: number; z: number }
  enableShadows?: boolean
  fogConfig?: { color: number; near: number; far: number } | null
}

export function useThreeScene({
  containerRef,
  onAnimate,
  cameraPosition = { z: 30 },
  enableShadows = false,
  fogConfig = { color: GAME_CONFIG.THREE.BACKGROUND_COLOR, near: GAME_CONFIG.THREE.FOG_NEAR, far: GAME_CONFIG.THREE.FOG_FAR },
}: UseThreeSceneOptions) {
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    if (fogConfig) {
      scene.fog = new THREE.Fog(fogConfig.color, fogConfig.near, fogConfig.far)
    }

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      GAME_CONFIG.THREE.FOV,
      width / height,
      GAME_CONFIG.THREE.NEAR,
      GAME_CONFIG.THREE.FAR,
    )
    camera.position.set(cameraPosition.x ?? 0, cameraPosition.y ?? 0, cameraPosition.z)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setClearColor(GAME_CONFIG.THREE.BACKGROUND_COLOR, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace

    if (enableShadows) {
      renderer.shadowMap.enabled = true
      renderer.shadowMap.type = THREE.PCFShadowMap
    }

    container.appendChild(renderer.domElement)

    // Store refs
    sceneRef.current = scene
    cameraRef.current = camera
    rendererRef.current = renderer

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate)
      if (onAnimate && scene && camera && renderer) {
        onAnimate(scene, camera, renderer)
      }
      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return
      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      // Dispose geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose())
          } else {
            object.material.dispose()
          }
        }
      })

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      sceneRef.current = null
      cameraRef.current = null
      rendererRef.current = null
    }
  }, [containerRef, onAnimate, cameraPosition.z, cameraPosition.x, cameraPosition.y, enableShadows, fogConfig])

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
  }
}

