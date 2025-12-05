"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import * as THREE from "three"
import { GAME_TYPES } from "@/lib/constants"
import type { GameType } from "@/lib/constants"

interface GameInfo {
  title: string
  color: number
  posX: number
  hue: number
  emoji: string
  description: string
  difficulty: string
  gameType: Exclude<GameType, "menu">
}

const GAMES: GameInfo[] = [
  {
    title: "Tìm Số Tiếp Theo",
    color: 0x10b981,
    posX: -25,
    hue: 0.4,
    emoji: "🔢",
    description: "Tìm quy luật và chọn số tiếp theo trong dãy số",
    difficulty: "⭐ Dễ - Trung Bình",
    gameType: GAME_TYPES.NEXT,
  },
  {
    title: "Số Còn Thiếu",
    color: 0xf59e0b,
    posX: 0,
    hue: 0.15,
    emoji: "❓",
    description: "Tìm số bị thiếu trong dãy số đầu tiên",
    difficulty: "⭐⭐ Trung Bình",
    gameType: GAME_TYPES.MISSING,
  },
  {
    title: "Sắp Xếp Dãy Số",
    color: 0x6366f1,
    posX: 25,
    hue: 0.7,
    emoji: "📊",
    description: "Sắp xếp các số theo quy luật tăng dần",
    difficulty: "⭐⭐⭐ Khó",
    gameType: GAME_TYPES.SORT,
  },
]

export default function GameMenu() {
  const router = useRouter()
  useEffect(() => {
    const container = document.getElementById("menu-canvas-container")
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    container.appendChild(renderer.domElement)
    camera.position.z = 50

    const spheres: THREE.Group[] = []
    const particles: THREE.Mesh[] = []

    GAMES.forEach((game, idx) => {
      const group = new THREE.Group()

      const geometry = new THREE.IcosahedronGeometry(2.5, 4)
      const material = new THREE.MeshStandardMaterial({
        color: game.color,
        metalness: 0.9,
        roughness: 0.05,
        emissive: game.color,
        emissiveIntensity: 1.0,
        envMapIntensity: 1.5,
      })
      const sphere = new THREE.Mesh(geometry, material)
      sphere.castShadow = true
      group.add(sphere)

      for (let i = 0; i < 4; i++) {
        const glowGeometry = new THREE.IcosahedronGeometry(2.5 + i * 0.25, 3)
        const glowMaterial = new THREE.MeshStandardMaterial({
          color: game.color,
          emissive: game.color,
          emissiveIntensity: 0.6,
          metalness: 0.5,
          roughness: 0.3,
          transparent: true,
          opacity: (0.4 - i * 0.08),
          side: THREE.BackSide,
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        group.add(glow)
      }

      group.position.x = game.posX
      group.position.y = 0
      group.userData = { originalY: 0, speed: 0.001, index: idx }
      scene.add(group)
      spheres.push(group)

      const particleCount = 12
      for (let i = 0; i < particleCount; i++) {
        const pGeometry = new THREE.SphereGeometry(0.28, 24, 24)
        const pMaterial = new THREE.MeshStandardMaterial({
          color: game.color,
          metalness: 0.9,
          roughness: 0.05,
          emissive: game.color,
          emissiveIntensity: 1.0,
          envMapIntensity: 1.5,
          transparent: true,
          opacity: 0.95,
        })
        const particle = new THREE.Mesh(pGeometry, pMaterial)
        particle.castShadow = true
        const angle = (i / particleCount) * Math.PI * 2
        particle.userData = {
          parentIndex: idx,
          angle: angle,
          distance: 5.5,
          speed: 0.025,
          index: i,
        }
        scene.add(particle)
        particles.push(particle)
      }
    })

    const light1 = new THREE.PointLight(0x00d9ff, 2, 100)
    light1.position.set(40, 40, 40)
    scene.add(light1)

    const light2 = new THREE.PointLight(0xff006e, 2, 100)
    light2.position.set(-40, -40, 40)
    scene.add(light2)

    const light3 = new THREE.PointLight(0xfdb813, 1.5, 80)
    light3.position.set(0, 50, 0)
    scene.add(light3)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

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

      spheres.forEach((sphere) => {
        sphere.rotation.x += 0.003
        sphere.rotation.y += 0.005
        sphere.rotation.z += 0.002

        sphere.position.y = sphere.userData.originalY + Math.sin(time * 0.8 + sphere.userData.index) * 1.8

        const scale = 1 + Math.sin(time * 1.5 + sphere.userData.index * 1.5) * 0.2
        sphere.scale.set(scale, scale, scale)

        sphere.children.forEach((child, i) => {
          if (i > 0) {
            child.rotation.x += 0.001 * (i + 1)
            child.rotation.y += 0.002 * (i + 1)
          }
        })
      })

      particles.forEach((particle) => {
        if (particle.userData.parentIndex !== undefined) {
          const parentSphere = spheres[particle.userData.parentIndex]
          particle.userData.angle += particle.userData.speed

          particle.position.x = parentSphere.position.x + Math.cos(particle.userData.angle) * particle.userData.distance
          particle.position.y = parentSphere.position.y + Math.sin(particle.userData.angle * 0.6) * particle.userData.distance
          particle.position.z = Math.sin(particle.userData.angle * 1.3) * particle.userData.distance * 0.6

          particle.rotation.x += 0.04
          particle.rotation.y += 0.04
          particle.rotation.z += 0.02

          const pulse = Math.sin(time * 2.5 + particle.userData.parentIndex + particle.userData.index * 0.1) * 0.5 + 0.5
          if (particle.material instanceof THREE.MeshStandardMaterial) {
            particle.material.emissiveIntensity = pulse * 1.0 + 0.3
          }

          const particleScale = Math.sin(time * 3 + particle.userData.index) * 0.3 + 0.7
          particle.scale.set(particleScale, particleScale, particleScale)
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener("resize", handleResize)

      spheres.forEach((sphere) => {
        sphere.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
        scene.remove(sphere)
      })

      particles.forEach((particle) => {
        particle.geometry.dispose()
        if (Array.isArray(particle.material)) {
          particle.material.forEach((material: THREE.Material) => material.dispose())
        } else {
          particle.material.dispose()
        }
        scene.remove(particle)
      })

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden">
      <div id="menu-canvas-container" className="fixed inset-0 -z-10" />
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-indigo-950/50 via-violet-950/30 to-purple-950 -z-10" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-8 lg:pb-10">
        <header className="text-center mb-6 sm:mb-8 lg:mb-10 slide-down relative z-20">
          <div className="relative inline-block mb-4 sm:mb-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-2 sm:mb-3 leading-[1.1] gradient-text drop-shadow-2xl">
            Hệ Mặt Trời
          </h1>
            <div className="absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 text-xl sm:text-2xl md:text-2xl animate-bounce-gentle">✨</div>
            <div className="absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 text-lg sm:text-xl md:text-xl animate-bounce-gentle" style={{ animationDelay: "0.5s" }}>⭐</div>
        </div>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-purple-200 drop-shadow-xl">
            Trò Chơi Toán Học
          </h2>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-100 font-medium max-w-xl mx-auto leading-relaxed px-3">
            Khám Phá Quy Luật Dãy Số Cùng Các Hành Tinh
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {GAMES.map((game, idx) => {
            const gameRoutes: Record<Exclude<GameType, "menu">, string> = {
              [GAME_TYPES.NEXT]: "/next-number",
              [GAME_TYPES.MISSING]: "/missing-number",
              [GAME_TYPES.SORT]: "/sort-sequence",
            }
            const guideRoutes: Record<Exclude<GameType, "menu">, string> = {
              [GAME_TYPES.NEXT]: "/next-number/guide",
              [GAME_TYPES.MISSING]: "/missing-number/guide",
              [GAME_TYPES.SORT]: "/sort-sequence/guide",
            }
            
            return (
            <div
              key={game.gameType}
              className="group relative h-[320px] sm:h-[340px] md:h-[330px] lg:h-[350px] transition-all duration-500 hover:scale-[1.02] card-hover cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
              onClick={() => router.push(guideRoutes[game.gameType])}
          >
              <div
                className="absolute inset-0 rounded-2xl sm:rounded-xl shadow-2xl group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:-translate-y-2"
                style={{
                  background: `linear-gradient(135deg, ${
                    game.gameType === GAME_TYPES.NEXT
                      ? "rgb(139, 92, 246) 0%, rgb(168, 85, 247) 50%, rgb(124, 58, 237) 100%"
                      : game.gameType === GAME_TYPES.MISSING
                        ? "rgb(236, 72, 153) 0%, rgb(244, 63, 94) 50%, rgb(251, 113, 133) 100%"
                        : "rgb(99, 102, 241) 0%, rgb(129, 140, 248) 50%, rgb(147, 51, 234) 100%"
                  })`,
                  backgroundSize: "200% 200%",
                  animation: "gradient-shift 5s ease infinite",
                }}
              />

              <div className="absolute inset-0 glass-strong rounded-2xl sm:rounded-xl group-hover:bg-white/20 transition-all duration-500" />

              <div className="absolute inset-0 rounded-2xl sm:rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200" />
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-5 md:p-6 lg:p-7 rounded-2xl sm:rounded-xl">
                <div
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 sm:mb-4 md:mb-5 bounce-gentle filter drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  {game.emoji}
              </div>

                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-black text-white mb-2 sm:mb-3 md:mb-4 text-balance drop-shadow-2xl text-center leading-tight px-2">
                  {game.title}
              </h3>

                <p className="text-xs sm:text-sm md:text-base text-white/90 text-center mb-3 sm:mb-4 md:mb-5 leading-relaxed px-2 sm:px-3 font-medium flex-grow flex items-center">
                  {game.description}
                </p>

                <div className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-2.5 bg-white/35 rounded-full text-xs sm:text-sm font-bold text-white backdrop-blur-lg border-2 border-white/50 shadow-2xl group-hover:bg-white/45 group-hover:scale-105 group-hover:shadow-white/20 transition-all duration-300">
                  {game.difficulty}
                </div>
              </div>
            </div>
          )})}
        </section>

        <footer className="text-center slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="glass-light px-4 sm:px-5 md:px-6 py-3 sm:py-3.5 rounded-lg sm:rounded-xl border border-white/15 inline-block backdrop-blur-xl">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-100 font-semibold drop-shadow-lg">
              Click vào card để xem hướng dẫn và bắt đầu chơi! 🚀
            </p>
              </div>
        </footer>
        </div>
    </div>
  )
}
