"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, RotateCcw, BookOpen } from "lucide-react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { createEnhancedLights, createGlowingSphere, createParticleSystem } from "@/lib/three-helpers"
import { UI_TEXT, GAME_CONFIG } from "@/lib/constants"
import { fetchNumberSequenceQuestions, type NumberSequenceQuestion as Question } from "@/lib/api-service"

interface NextNumberGameProps {
  onBack: () => void
  guidePath?: string
}

export default function NextNumberGame({ onBack, guidePath = "/next-number/guide" }: NextNumberGameProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [draggedNumber, setDraggedNumber] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const mouseRef = useMousePosition(canvasRef)

  // Fetch questions from API
  useEffect(() => {
    async function loadQuestions() {
      setLoading(true)
      try {
        const fetchedQuestions = await fetchNumberSequenceQuestions()
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions)
        } else {
          console.error('No questions received from API')
          // Fallback questions are already returned by fetchNumberSequenceQuestions
          setQuestions([
            {
              sequence: [2, 4, 6, 8],
              options: [9, 10, 11, 12],
              correct: 10,
            },
            {
              sequence: [3, 6, 9, 12],
              options: [14, 15, 16, 17],
              correct: 15,
            },
            {
              sequence: [1, 1, 2, 3, 5],
              options: [7, 8, 9, 10],
              correct: 8,
            },
            {
              sequence: [1, 2, 3, 4, 5],
              options: [6, 7, 8, 9],
              correct: 8,
            },
          ])
        }
      } catch (error) {
        console.error('Failed to load questions:', error)
        // Set fallback questions on error
        setQuestions([
          {
            sequence: [2, 4, 6, 8],
            options: [9, 10, 11, 12],
            correct: 10,
          },
          {
            sequence: [3, 6, 9, 12],
            options: [14, 15, 16, 17],
            correct: 15,
          },
          {
            sequence: [1, 1, 2, 3, 5],
            options: [7, 8, 9, 10],
            correct: 8,
          },
          {
            sequence: [1, 2, 3, 4, 5],
            options: [6, 7, 8, 9],
            correct: 8,
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    loadQuestions()
  }, [])

  useEffect(() => {
    if (loading || questions.length === 0) return
    if (!canvasRef.current) return

    const question = questions[currentQuestion]
    if (!question || !question.sequence) return

    const container = canvasRef.current
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(
      GAME_CONFIG.THREE.BACKGROUND_COLOR,
      GAME_CONFIG.THREE.FOG_NEAR,
      GAME_CONFIG.THREE.FOG_FAR,
    )

    const camera = new THREE.PerspectiveCamera(
      GAME_CONFIG.THREE.FOV,
      container.clientWidth / container.clientHeight,
      GAME_CONFIG.THREE.NEAR,
      GAME_CONFIG.THREE.FAR,
    )
    camera.position.z = 30

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(GAME_CONFIG.THREE.BACKGROUND_COLOR, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.shadowMap.autoUpdate = true
    container.appendChild(renderer.domElement)

    const groups: THREE.Group[] = []

    question.sequence.forEach((num, idx) => {
      const group = new THREE.Group()

      const hue = 0.4 + (idx / question.sequence.length) * 0.15
      const color = new THREE.Color().setHSL(hue, 0.95, 0.65)
      const glowingSphere = createGlowingSphere(1.2, color, {
        segments: 64,
        glowLayers: 5,
        glowIntensity: 1.0,
      })
      group.add(glowingSphere)

      const torusRadius = 1.8
      const torusThickness = 0.15

      for (let i = 0; i < 4; i++) {
        const torusGeom = new THREE.TorusGeometry(torusRadius + i * 0.1, torusThickness - i * 0.02, 48, 120)
        const torusMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(hue, 0.98, 0.7 + i * 0.08),
          emissive: new THREE.Color().setHSL(hue, 0.98, 0.5 + i * 0.05),
          emissiveIntensity: 0.8,
          metalness: 0.7,
          roughness: 0.2,
        transparent: true,
          opacity: (0.75 - i * 0.1) * 0.98,
          side: THREE.DoubleSide,
      })
      const torus = new THREE.Mesh(torusGeom, torusMat)
      group.add(torus)
        if (i === 0) {
          group.userData.torusRing = torus
        }
      }

      const particleCount = 16
      for (let i = 0; i < particleCount; i++) {
        const particleGeom = new THREE.SphereGeometry(0.12, 20, 20)
        const particleMat = new THREE.MeshStandardMaterial({
          color: new THREE.Color().setHSL(hue + (i / particleCount) * 0.2, 1, 0.75),
          emissive: new THREE.Color().setHSL(hue + (i / particleCount) * 0.2, 1, 0.6),
          emissiveIntensity: 1.2,
          metalness: 0.8,
          roughness: 0.1,
          transparent: true,
          opacity: 0.95,
        })
        const particle = new THREE.Mesh(particleGeom, particleMat)
        const angle = (i / particleCount) * Math.PI * 2
        particle.userData = {
          angle: angle,
          distance: 2.8,
          speed: 0.04,
          index: i,
        }
        group.add(particle)
      }

      const angle = (idx / question.sequence.length) * Math.PI * 2
      group.position.x = Math.cos(angle) * 12
      group.position.y = Math.sin(angle) * 12
      group.userData = {
        targetX: group.position.x,
        targetY: group.position.y,
        number: num,
        index: idx,
        torusRing: group.userData.torusRing,
      }

      scene.add(group)
      groups.push(group)
    })

    const { particles: bgParticles, update: updateParticles } = createParticleSystem(200, 0x10b981, {
      size: 0.06,
      spread: 60,
      speed: 0.4,
    })
    scene.add(bgParticles)

    createEnhancedLights(scene, { intensity: 3.5, distance: 200 })

    const accentLight1 = new THREE.PointLight(0x10b981, 3, 150)
    accentLight1.position.set(30, 30, 30)
    scene.add(accentLight1)

    const accentLight2 = new THREE.PointLight(0x14b8a6, 2.5, 150)
    accentLight2.position.set(-30, -30, 30)
    scene.add(accentLight2)

    // Create option spheres for 3D interaction with text labels
    const optionGroups: THREE.Group[] = []
    const optionSpheres: THREE.Mesh[] = []
    
    question.options.forEach((option, idx) => {
      const optionGroup = new THREE.Group()
      const hue = 0.4 + (idx / question.options.length) * 0.15
      const color = new THREE.Color().setHSL(hue, 0.98, 0.7)
      
      const optionSphere = createGlowingSphere(1.3, color, {
        segments: 64,
        glowLayers: 5,
        glowIntensity: 1.0,
      })
      
      // Add text label using canvas texture
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 120px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(option.toString(), 128, 128)
      ctx.strokeStyle = "#00d9ff"
      ctx.lineWidth = 8
      ctx.strokeText(option.toString(), 128, 128)
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      
      const labelGeometry = new THREE.PlaneGeometry(1.5, 1.5)
      const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
      const label = new THREE.Mesh(labelGeometry, labelMaterial)
      label.position.z = 1.5
      label.lookAt(camera.position)
      
      const angle = (idx / question.options.length) * Math.PI * 2
      optionGroup.position.x = Math.cos(angle) * 9
      optionGroup.position.y = -7 + Math.sin(angle) * 2.5
      optionGroup.position.z = -3
      
      optionGroup.userData = {
        option: option,
        index: idx,
        targetY: optionGroup.position.y,
        targetZ: optionGroup.position.z,
        label: label,
        hovered: false,
      }
      
      optionGroup.add(optionSphere)
      optionGroup.add(label)
      scene.add(optionGroup)
      optionGroups.push(optionGroup)
      optionSpheres.push(optionSphere.children[0] as THREE.Mesh)
    })

    // Raycaster for 3D interaction with hover effects
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredOption: THREE.Group | null = null
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(optionGroups, true)
      
      if (intersects.length > 0 && !answered) {
        const clickedObject = intersects[0].object
        const optionGroup = clickedObject.parent as THREE.Group
        if (optionGroup && optionGroup.userData.option !== undefined) {
          if (hoveredOption !== optionGroup) {
            if (hoveredOption) hoveredOption.userData.hovered = false
            hoveredOption = optionGroup
            optionGroup.userData.hovered = true
          }
        }
      } else {
        if (hoveredOption) {
          hoveredOption.userData.hovered = false
          hoveredOption = null
        }
      }
    }
    
    const handleClick = (e: MouseEvent) => {
      if (answered) return
      
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(optionGroups, true)
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object
        const optionGroup = clickedObject.parent as THREE.Group
        if (optionGroup && optionGroup.userData.option !== undefined) {
          handleAnswer(optionGroup.userData.option)
        }
      }
    }
    
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("click", handleClick)

    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const time = Date.now() * 0.001

      updateParticles(time)

      groups.forEach((group) => {
        if (group.userData.number !== undefined) {
          group.rotation.x += GAME_CONFIG.ANIMATION.ROTATION_SPEED * 1.8
          group.rotation.y += GAME_CONFIG.ANIMATION.ROTATION_SPEED * 2.2
          group.rotation.z += GAME_CONFIG.ANIMATION.ROTATION_SPEED * 0.6

          const floatY = Math.sin(time + group.userData.index) * GAME_CONFIG.ANIMATION.FLOAT_AMPLITUDE * 1.2
          const floatZ = Math.sin(time * 0.5 + group.userData.index) * 5
          group.position.y = group.userData.targetY + floatY
          group.position.z = floatZ

          const mouseInfluence = (mouseRef.current.x * 6 - group.position.x * 0.03) * GAME_CONFIG.ANIMATION.MOUSE_INFLUENCE
          group.position.x += mouseInfluence

          if (group.userData.torusRing) {
            const pulsing = Math.sin(time * GAME_CONFIG.ANIMATION.PULSE_SPEED * 1.2 + group.userData.index) * 0.5 + 0.5
            group.userData.torusRing.scale.set(
              1 + pulsing * 0.5,
              1 + pulsing * 0.5,
              1 + pulsing * 0.5,
            )
            group.userData.torusRing.material.opacity = pulsing * 0.95 + 0.05
            group.userData.torusRing.rotation.z += 0.015
          }

          group.children.forEach((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh && child.userData.angle !== undefined) {
              child.userData.angle += child.userData.speed
              const angle = child.userData.angle
              const distance = child.userData.distance

              child.position.x = Math.cos(angle) * distance
              child.position.y = Math.sin(angle * 0.7) * distance
              child.position.z = Math.sin(angle * 1.3) * distance * 0.6

              child.rotation.x += 0.06
              child.rotation.y += 0.06

              const particlePulse = Math.sin(time * 3.5 + child.userData.index) * 0.3 + 0.7
              child.scale.set(particlePulse, particlePulse, particlePulse)

              const colorPulse = Math.sin(time * 2.5 + child.userData.index) * 0.5 + 0.5
              child.material.opacity = colorPulse * 0.95 + 0.05
            }
          })

          const spherePulse = Math.sin(time * 1.8 + group.userData.index) * 0.12 + 1
          group.scale.set(spherePulse, spherePulse, spherePulse)
        }
      })

      // Animate option spheres with enhanced effects
      optionGroups.forEach((optionGroup) => {
        optionGroup.rotation.x += 0.012
        optionGroup.rotation.y += 0.018
        optionGroup.rotation.z += 0.005
        
        const floatY = Math.sin(time * 1.5 + optionGroup.userData.index) * 1.2
        optionGroup.position.y = optionGroup.userData.targetY + floatY
        
        const floatZ = Math.sin(time * 0.8 + optionGroup.userData.index) * 1.5
        optionGroup.position.z = optionGroup.userData.targetZ + floatZ
        
        let pulse = Math.sin(time * 2 + optionGroup.userData.index) * 0.15 + 1
        
        // Hover effect
        if (optionGroup.userData.hovered && !answered) {
          pulse = Math.sin(time * 4) * 0.2 + 1.3
          optionGroup.position.z = optionGroup.userData.targetZ + 2
        }
        
        // Selected effect
        if (selectedAnswer === optionGroup.userData.option) {
          pulse = Math.sin(time * 3) * 0.25 + 1.4
          optionGroup.position.z = optionGroup.userData.targetZ + 3
        }
        
        optionGroup.scale.set(pulse, pulse, pulse)
        
        // Update label to always face camera
        if (optionGroup.userData.label) {
          optionGroup.userData.label.lookAt(camera.position)
        }
      })

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight
        camera.updateProjectionMatrix()
        renderer.setSize(container.clientWidth, container.clientHeight)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("click", handleClick)
      cancelAnimationFrame(animationId)

      optionGroups.forEach((group) => {
        group.traverse((object: THREE.Object3D) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
        scene.remove(group)
      })

      groups.forEach((group) => {
        group.traverse((object: THREE.Object3D) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose()
            if (Array.isArray(object.material)) {
              object.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              object.material.dispose()
            }
          }
        })
        scene.remove(group)
      })

      bgParticles.geometry.dispose()
      if (Array.isArray(bgParticles.material)) {
        bgParticles.material.forEach((material: THREE.Material) => material.dispose())
      } else {
        bgParticles.material.dispose()
      }
      scene.remove(bgParticles)

      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
      }, [currentQuestion, selectedAnswer, answered, score, loading, questions])

  const handleDragStart = (option: number) => {
    if (answered) return
    setDraggedNumber(option)
  }

  const handleDragEnd = () => {
    const currentQ = questions[currentQuestion]
    if (draggedNumber !== null && currentQ && currentQ.sequence && dragOverIndex === currentQ.sequence.length) {
      handleAnswer(draggedNumber)
    }
    setDraggedNumber(null)
    setDragOverIndex(null)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (!answered && draggedNumber !== null) {
      setDragOverIndex(index)
    }
  }

  const handleAnswer = (option: number) => {
    if (answered) return
    const question = questions[currentQuestion]
    if (!question) return

    setSelectedAnswer(option)
    setAnswered(true)

    if (option === question.correct) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setAnswered(false)
      setSelectedAnswer(null)
      setDraggedNumber(null)
      setDragOverIndex(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setDraggedNumber(null)
    setDragOverIndex(null)
  }

  // Early return if loading or no questions
  if (loading || questions.length === 0) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Đang tải...</div>
      </div>
    )
  }

  // Ensure currentQuestion is within bounds
  if (currentQuestion < 0 || currentQuestion >= questions.length) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Câu hỏi không hợp lệ</div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  
  // Early return if question doesn't exist or is invalid
  if (!question || !question.sequence || !Array.isArray(question.sequence)) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Không tìm thấy câu hỏi</div>
      </div>
    )
  }

  const isGameComplete = currentQuestion === questions.length - 1 && answered

  return (
    <div className="relative w-full h-full flex flex-col">
      <div ref={canvasRef} className="absolute inset-0 -z-10" />

      <header className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 sm:gap-3 z-30">
        <button
          onClick={onBack}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label={UI_TEXT.COMMON.BACK}
        >
          <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{UI_TEXT.COMMON.BACK}</span>
        </button>
        <a
          href={guidePath}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label="Quay về trang hướng dẫn"
        >
          <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Hướng Dẫn</span>
        </a>
        <button
          onClick={handleRestart}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label={UI_TEXT.COMMON.RESTART}
        >
          <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{UI_TEXT.COMMON.RESTART}</span>
        </button>
      </header>

      <div className="absolute top-4 right-4 z-30">
        <div className="glass-strong px-3 sm:px-4 py-2 rounded-xl border border-emerald-400/40 shadow-lg bg-gradient-to-r from-emerald-900/30 to-teal-900/30">
          <div className="text-lg sm:text-xl font-black text-emerald-300 flex items-center gap-2">
            <span>⭐</span>
            <span>
              {UI_TEXT.COMMON.SCORE}: <span className="text-emerald-200">{score}</span>/
              <span className="text-emerald-400">{questions.length}</span>
            </span>
      </div>
        </div>
      </div>

      <main className="absolute inset-0 flex items-center justify-center px-4 py-20 z-20 overflow-y-auto">
        <div className="glass-strong p-6 sm:p-8 rounded-3xl max-w-5xl w-full border-2 border-emerald-400/60 shadow-2xl relative overflow-hidden bg-gradient-to-br from-emerald-950/30 via-teal-950/25 to-emerald-950/30 my-8 backdrop-blur-xl">

          <section className="mb-8 relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <p className="text-sm text-emerald-200 font-bold px-4 py-2 bg-emerald-500/30 rounded-full border border-emerald-400/50">
              Câu {currentQuestion + 1}/{questions.length}
            </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-emerald-300 mb-6 sm:mb-8">
              {UI_TEXT.NEXT_NUMBER.TITLE}
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 mb-4 sm:mb-6 font-medium text-center">
              Kéo số từ bên dưới vào vị trí <span className="text-emerald-300 font-bold">?</span> để hoàn thành dãy số
            </p>

            <div className="flex gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 flex-wrap">
              {question.sequence.map((num, idx) => (
                <div 
                  key={`${num}-${idx}`}
                >
                  <div className="number-badge w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-cyan-600 shadow-lg border-cyan-400/50">
                    <span>{num}</span>
                  </div>
                </div>
              ))}
              <div 
                className={`text-4xl sm:text-5xl font-black transition-all duration-200 ${
                  dragOverIndex === question.sequence.length 
                    ? "text-cyan-300 scale-110" 
                    : selectedAnswer !== null
                      ? selectedAnswer === question.correct
                        ? "text-green-400 scale-105"
                        : "text-red-400 scale-105"
                      : "text-cyan-400"
                }`}
                onDragOver={(e) => handleDragOver(e, question.sequence.length)}
                onDrop={handleDragEnd}
              >
                {selectedAnswer !== null ? selectedAnswer : "?"}
              </div>
            </div>
          </section>

          {!answered ? (
            <section className="space-y-6 relative z-10">
              <div className="text-center mb-6">
                <p className="text-base text-cyan-200 mb-3 font-semibold">
                  Kéo số vào vị trí trống
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {question.options.map((option) => (
                  <div
                    key={option}
                    draggable={!answered}
                    onDragStart={() => handleDragStart(option)}
                    onDragEnd={handleDragEnd}
                    className={`answer-btn py-4 sm:py-5 px-4 sm:px-6 text-lg sm:text-xl font-black relative overflow-hidden cursor-grab active:cursor-grabbing transition-all duration-200 ${
                      draggedNumber === option ? "opacity-50 scale-95" : ""
                    }`}
                    style={{ 
                      background: draggedNumber === option 
                        ? "linear-gradient(135deg, rgb(6, 182, 212), rgb(37, 99, 235))"
                        : "linear-gradient(135deg, rgb(6, 182, 212), rgb(37, 99, 235), rgb(6, 182, 212))"
                    }}
                  >
                    <span className="relative z-10">{option}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <section className="text-center fade-in relative z-10">
              {selectedAnswer === question.correct ? (
                <div className="mb-6 sm:mb-8">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🎉</div>
                  <p className="text-2xl sm:text-3xl font-black text-green-400 mb-2 sm:mb-3">
                    {UI_TEXT.NEXT_NUMBER.CORRECT}
                  </p>
                  <p className="text-base sm:text-lg text-cyan-100 font-medium">{UI_TEXT.NEXT_NUMBER.CORRECT_DESC}</p>
                </div>
              ) : (
                <div className="mb-6 sm:mb-8">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">😊</div>
                  <p className="text-2xl sm:text-3xl font-black text-orange-400 mb-2 sm:mb-3">
                    {UI_TEXT.NEXT_NUMBER.INCORRECT}
                  </p>
                  <p className="text-base sm:text-lg text-cyan-100 font-medium">
                    {UI_TEXT.NEXT_NUMBER.CORRECT_ANSWER}{" "}
                    <span className="font-black text-green-400 text-xl sm:text-2xl">{question.correct}</span>
                  </p>
                </div>
              )}

              {!isGameComplete && (
                <button
                  onClick={handleNext}
                  className="btn-modern mt-6 sm:mt-8 px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-500 hover:via-emerald-500 hover:to-green-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl"
                >
                  {UI_TEXT.COMMON.NEXT_QUESTION}
                </button>
              )}
            </section>
          )}

          {isGameComplete && (
            <section className="text-center mt-6 sm:mt-8 fade-in relative z-10">
              <div className="mb-4 sm:mb-6">
                <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏆</div>
                <p className="text-xl sm:text-2xl text-cyan-100 mb-2 font-bold">
                  {UI_TEXT.NEXT_NUMBER.COMPLETE}
                </p>
                <p className="text-2xl sm:text-3xl text-cyan-300 font-black mb-3 sm:mb-4">
                  {score} {UI_TEXT.NEXT_NUMBER.POINTS}
                </p>
              </div>
              <button
                onClick={handleRestart}
                className="btn-modern px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-cyan-600 hover:from-cyan-500 hover:via-blue-500 hover:to-cyan-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl"
              >
                {UI_TEXT.COMMON.PLAY_AGAIN}
              </button>
            </section>
          )}
        </div>
      </main>
    </div>
  )
}
