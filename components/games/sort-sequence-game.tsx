"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, RotateCcw, BookOpen } from "lucide-react"
import * as THREE from "three"
import { createEnhancedLights, createGlowingSphere, createParticleSystem } from "@/lib/three-helpers"
import { UI_TEXT, GAME_CONFIG } from "@/lib/constants"
import { fetchOddOneOutQuestions, type OddOneOutQuestion as Question } from "@/lib/api-service"

interface SortSequenceGameProps {
  onBack: () => void
  guidePath?: string
}

export default function SortSequenceGame({ onBack, guidePath = "/sort-sequence/guide" }: SortSequenceGameProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [clickedNumber, setClickedNumber] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Fetch questions from API
  useEffect(() => {
    async function loadQuestions() {
      setLoading(true)
      try {
        const fetchedQuestions = await fetchOddOneOutQuestions()
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions)
        } else {
          console.error('No questions received from API')
          // Fallback questions are already returned by fetchOddOneOutQuestions
          setQuestions([
            {
              numbers: [8, 2, 6, 4],
              correct: [2, 4, 6, 8],
              description: 'Sắp xếp theo thứ tự tăng dần',
            },
            {
              numbers: [12, 3, 9, 6],
              correct: [3, 6, 9, 12],
              description: 'Sắp xếp theo thứ tự tăng dần',
            },
            {
              numbers: [3, 5, 1, 2],
              correct: [1, 2, 3, 5],
              description: 'Sắp xếp theo thứ tự tăng dần',
            },
          ])
        }
      } catch (error) {
        console.error('Failed to load questions:', error)
        // Set fallback questions on error
        setQuestions([
          {
            numbers: [8, 2, 6, 4],
            correct: [2, 4, 6, 8],
            description: 'Sắp xếp theo thứ tự tăng dần',
          },
          {
            numbers: [12, 3, 9, 6],
            correct: [3, 6, 9, 12],
            description: 'Sắp xếp theo thứ tự tăng dần',
          },
          {
            numbers: [3, 5, 1, 2],
            correct: [1, 2, 3, 5],
            description: 'Sắp xếp theo thứ tự tăng dần',
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
    if (!question || !question.numbers) return

    const container = canvasRef.current
    const currentSelected = selected
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(
      GAME_CONFIG.THREE.BACKGROUND_COLOR,
      GAME_CONFIG.THREE.FOG_NEAR + 20,
      GAME_CONFIG.THREE.FOG_FAR,
    )

    const camera = new THREE.PerspectiveCamera(
      GAME_CONFIG.THREE.FOV,
      container.clientWidth / container.clientHeight,
      GAME_CONFIG.THREE.NEAR,
      GAME_CONFIG.THREE.FAR,
    )
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })

    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setClearColor(GAME_CONFIG.THREE.BACKGROUND_COLOR, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(renderer.domElement)

    camera.position.z = 35

    const { particles: bgParticles, update: updateParticles } = createParticleSystem(250, 0xa855f7, {
      size: 0.08,
      spread: 50,
      speed: 0.4,
    })
    scene.add(bgParticles)

    const largeParticleCount = 35
    const largeParticleGroups: THREE.Group[] = []

    for (let i = 0; i < largeParticleCount; i++) {
      const hue = 0.75 + Math.random() * 0.15
      const color = new THREE.Color().setHSL(hue, 0.95, 0.7)
      const glowingParticle = createGlowingSphere(0.4, color, {
        segments: 32,
        glowLayers: 4,
        glowIntensity: 0.9,
      })

      glowingParticle.position.x = (Math.random() - 0.5) * 40
      glowingParticle.position.y = (Math.random() - 0.5) * 40
      glowingParticle.position.z = (Math.random() - 0.5) * 30

      const userData: any = {
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.02,
        hue: hue,
        index: i,
      }
      Object.assign(glowingParticle.userData, userData)

      scene.add(glowingParticle)
      largeParticleGroups.push(glowingParticle)
    }

    createEnhancedLights(scene, { intensity: 3.5, distance: 200 })

    const accentLight1 = new THREE.PointLight(0xa855f7, 3, 120)
    accentLight1.position.set(25, 25, 25)
    scene.add(accentLight1)

    const accentLight2 = new THREE.PointLight(0xec4899, 2.5, 120)
    accentLight2.position.set(-25, -25, 25)
    scene.add(accentLight2)

    // Create option spheres for 3D interaction with text labels
    const optionGroups: THREE.Group[] = []
    
    question.numbers.forEach((num, idx) => {
      const optionGroup = new THREE.Group()
      const hue = 0.75 + (idx / question.numbers.length) * 0.15
      const color = new THREE.Color().setHSL(hue, 0.98, 0.75)
      
      const optionSphere = createGlowingSphere(1.1, color, {
        segments: 48,
        glowLayers: 4,
        glowIntensity: 0.95,
      })
      
      // Add text label
      const canvas = document.createElement("canvas")
      canvas.width = 256
      canvas.height = 256
      const ctx = canvas.getContext("2d")!
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 100px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(num.toString(), 128, 128)
      ctx.strokeStyle = "#a855f7"
      ctx.lineWidth = 6
      ctx.strokeText(num.toString(), 128, 128)
      
      const texture = new THREE.CanvasTexture(canvas)
      texture.needsUpdate = true
      
      const labelGeometry = new THREE.PlaneGeometry(1.2, 1.2)
      const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide,
      })
      const label = new THREE.Mesh(labelGeometry, labelMaterial)
      label.position.z = 1.3
      label.lookAt(camera.position)
      
      const angle = (idx / question.numbers.length) * Math.PI * 2
      optionGroup.position.x = Math.cos(angle) * 7
      optionGroup.position.y = -7 + Math.sin(angle) * 2
      optionGroup.position.z = -3
      
      optionGroup.userData = {
        number: num,
        index: idx,
        targetY: optionGroup.position.y,
        targetZ: optionGroup.position.z,
        isSelected: false,
        label: label,
        hovered: false,
      }
      
      optionGroup.add(optionSphere)
      optionGroup.add(label)
      scene.add(optionGroup)
      optionGroups.push(optionGroup)
    })

    // Raycaster for 3D interaction with hover effects
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredOption: THREE.Group | null = null
    
    let rafId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return
      
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(optionGroups, true)
        
        if (intersects.length > 0 && !answered) {
          const clickedObject = intersects[0].object
          const optionGroup = clickedObject.parent as THREE.Group
          if (optionGroup && optionGroup.userData.number !== undefined) {
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
        rafId = null
      })
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
        if (optionGroup && optionGroup.userData.number !== undefined) {
          const num = optionGroup.userData.number
          const newSelected = [...currentSelected]
          const existingIndex = newSelected.indexOf(num)

          if (existingIndex > -1) {
            newSelected.splice(existingIndex, 1)
          } else {
            newSelected.push(num)
          }

          setSelected(newSelected)
          optionGroup.userData.isSelected = newSelected.includes(num)

          const currentQ = questions[currentQuestion]
          if (currentQ && currentQ.numbers && newSelected.length === currentQ.numbers.length) {
            const isCorrect = JSON.stringify(newSelected) === JSON.stringify(currentQ.correct)
            setAnswered(true)

            if (isCorrect) {
              setScore((prev) => prev + 1)
            }
          }
        }
      }
    }
    
    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("click", handleClick)

    let animationId: number
    let lastTime = 0
    const targetFPS = 60
    const frameInterval = 1000 / targetFPS
    
    const animate = (currentTime: number) => {
      animationId = requestAnimationFrame(animate)

      const deltaTime = currentTime - lastTime
      if (deltaTime < frameInterval) return
      
      lastTime = currentTime - (deltaTime % frameInterval)
      const time = currentTime * 0.001

      updateParticles(time)

      largeParticleGroups.forEach((group) => {
        if (!group || !group.userData) return

        const userData = group.userData as any

        group.position.x += userData.vx
        group.position.y += userData.vy
        group.position.z += userData.vz

        if (Math.abs(group.position.x) > 25) userData.vx *= -1
        if (Math.abs(group.position.y) > 25) userData.vy *= -1
        if (Math.abs(group.position.z) > 20) userData.vz *= -1

        group.rotation.x += 0.015
        group.rotation.y += 0.015
        group.rotation.z += 0.01

        const hue = (time * 0.15 + userData.index * 0.02) % 0.15 + 0.75
        const color = new THREE.Color().setHSL(hue, 0.95, 0.7)
        
        group.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            if (child.material instanceof THREE.MeshStandardMaterial) {
              child.material.color.copy(color)
              child.material.emissive.copy(color).multiplyScalar(0.8)
            } else if (child.material instanceof THREE.MeshBasicMaterial) {
              child.material.color.copy(color)
            }
          }
        })

        const scale = Math.sin(time * 2.5 + userData.index * 0.15) * 0.4 + 1
        group.scale.set(scale, scale, scale)
      })

      // Animate option spheres with enhanced effects
      optionGroups.forEach((optionGroup) => {
        optionGroup.rotation.x += 0.012
        optionGroup.rotation.y += 0.018
        optionGroup.rotation.z += 0.005
        
        const floatY = Math.sin(time * 1.5 + optionGroup.userData.index) * 1.2
        optionGroup.position.y = optionGroup.userData.targetY + floatY
        
        const isSelected = currentSelected.includes(optionGroup.userData.number)
        const isClicked = clickedNumber === optionGroup.userData.number
        optionGroup.userData.isSelected = isSelected
        
        let pulse = Math.sin(time * 2 + optionGroup.userData.index) * 0.15 + 1
        let targetZ = optionGroup.userData.targetZ
        
        // Hover effect
        if (optionGroup.userData.hovered && !answered && !isSelected && !isClicked) {
          pulse = Math.sin(time * 4) * 0.2 + 1.3
          targetZ = optionGroup.userData.targetZ + 2
        }
        
        // Clicked effect (selected to place)
        if (isClicked && !answered) {
          pulse = Math.sin(time * 4) * 0.25 + 1.4
          targetZ = optionGroup.userData.targetZ + 3
        }
        
        // Selected effect (already placed)
        if (isSelected && !isClicked) {
          pulse = Math.sin(time * 3) * 0.2 + 1.25
          targetZ = optionGroup.userData.targetZ + 1.5
        }
        
        optionGroup.position.z = THREE.MathUtils.lerp(optionGroup.position.z, targetZ, 0.1)
        optionGroup.scale.set(pulse, pulse, pulse)
        
        // Update label to always face camera
        if (optionGroup.userData.label) {
          optionGroup.userData.label.lookAt(camera.position)
        }
      })

      renderer.render(scene, camera)
    }

    animate(0)

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
        group.traverse((child: THREE.Object3D) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            if (Array.isArray(child.material)) {
              child.material.forEach((material: THREE.Material) => material.dispose())
            } else {
              child.material.dispose()
            }
          }
        })
        scene.remove(group)
      })

      largeParticleGroups.forEach((group) => {
        if (group) {
          group.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose()
              if (Array.isArray(child.material)) {
                child.material.forEach((material: THREE.Material) => material.dispose())
              } else {
                child.material.dispose()
              }
            }
          })
          scene.remove(group)
        }
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
      }, [currentQuestion, selected, answered, score, loading, questions])

  const handleSelectNumber = (num: number) => {
    if (answered) return
    
    // Toggle selection - if already clicked, deselect; otherwise select
    if (clickedNumber === num) {
      setClickedNumber(null)
    } else {
      setClickedNumber(num)
    }
  }

  const handlePlaceNumber = (position: number) => {
    if (answered || clickedNumber === null) return
    const question = questions[currentQuestion]
    if (!question || !question.numbers) return

    const newSelected = [...selected]

    // Remove number if already placed
    const existingIndex = newSelected.indexOf(clickedNumber)
    if (existingIndex > -1) {
      newSelected.splice(existingIndex, 1)
    }
    
    // Insert at the clicked position
    newSelected.splice(position, 0, clickedNumber)
    
    // Limit to available positions
    if (newSelected.length > question.numbers.length) {
      newSelected.pop()
    }

    setSelected(newSelected)
    setClickedNumber(null)

    if (newSelected.length === question.numbers.length) {
      const isCorrect = JSON.stringify(newSelected) === JSON.stringify(question.correct)
      setAnswered(true)

      if (isCorrect) {
        setScore((prev) => prev + 1)
      }
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setAnswered(false)
      setSelected([])
      setClickedNumber(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelected([])
    setClickedNumber(null)
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
  if (!question || !question.numbers || !Array.isArray(question.numbers)) {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Không tìm thấy câu hỏi</div>
      </div>
    )
  }

  const isGameComplete = currentQuestion === questions.length - 1 && answered
  const unselected = question.numbers.filter((n) => !selected.includes(n))
  const displaySequence = selected.length > 0 ? selected : []

  return (
    <div className="relative w-full h-full flex flex-col">
      <div ref={canvasRef} className="absolute inset-0 -z-10" />

      <header className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 sm:gap-3 z-30">
        <button
          onClick={onBack}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label={UI_TEXT.COMMON.BACK}
        >
          <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{UI_TEXT.COMMON.BACK}</span>
        </button>
        <a
          href={guidePath}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-400 hover:to-violet-400 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label="Quay về trang hướng dẫn"
        >
          <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Hướng Dẫn</span>
        </a>
        <button
          onClick={handleRestart}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label={UI_TEXT.COMMON.RESTART}
        >
          <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{UI_TEXT.COMMON.RESTART}</span>
        </button>
      </header>

      <div className="absolute top-4 right-4 z-30">
        <div className="glass-strong px-3 sm:px-4 py-2 rounded-xl border border-purple-400/40 shadow-lg bg-gradient-to-r from-purple-900/30 to-violet-900/30">
          <div className="text-lg sm:text-xl font-black text-purple-300 flex items-center gap-2">
            <span>⭐</span>
            <span>
              {UI_TEXT.COMMON.SCORE}: <span className="text-purple-200">{score}</span>/
              <span className="text-purple-400">{questions.length}</span>
            </span>
      </div>
        </div>
      </div>

      <main className="absolute inset-0 flex items-center justify-center px-4 py-20 z-20 overflow-y-auto">
        <div className="glass-strong p-6 sm:p-8 rounded-3xl max-w-6xl w-full border-2 border-purple-400/60 shadow-2xl relative overflow-hidden bg-gradient-to-br from-purple-950/30 via-violet-950/25 to-purple-950/30 my-8 backdrop-blur-xl">

          <section className="mb-8 relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <p className="text-sm text-purple-200 font-bold px-4 py-2 bg-purple-500/30 rounded-full border border-purple-400/50">
              Câu {currentQuestion + 1}/{questions.length}
            </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-purple-300 mb-3">
              {question.description}
            </h2>
            <p className="text-sm sm:text-base text-purple-100 mb-4 sm:mb-6 font-medium text-center">
              {clickedNumber === null
                ? "Click vào số để chọn, sau đó click vào vị trí để đặt số đó"
                : `Đã chọn số ${clickedNumber}. Click vào vị trí để đặt số này`}
            </p>

            <div className="glass p-4 sm:p-6 rounded-2xl mb-4 sm:mb-5 border border-purple-500/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 opacity-50" />
              <p className="text-sm sm:text-base text-purple-100 mb-3 sm:mb-4 font-bold text-center">
                {UI_TEXT.SORT_SEQUENCE.SELECT_NUMBERS}
              </p>
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
                {unselected.map((num) => (
                  <button
                    key={num}
                    onClick={() => handleSelectNumber(num)}
                    disabled={answered}
                    className={`number-badge w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl bg-gradient-to-br from-purple-500 to-violet-500 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 ${
                      clickedNumber === num ? "ring-4 ring-purple-300 scale-110 shadow-purple-300/80" : ""
                    }`}
                    aria-label={`Chọn số ${num}`}
                  >
                    <span>{num}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass p-4 sm:p-6 rounded-2xl border border-green-500/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 opacity-50" />
              <p className="text-sm sm:text-base text-purple-100 mb-3 sm:mb-4 font-bold text-center">
                {UI_TEXT.SORT_SEQUENCE.SORTED_SEQUENCE}
              </p>
              <div className="flex gap-3 sm:gap-4 flex-wrap justify-center min-h-20 sm:min-h-24 items-center">
                {Array.from({ length: question.numbers.length }).map((_, idx) => (
                  <button
                    key={`position-${idx}`}
                    onClick={() => handlePlaceNumber(idx)}
                    disabled={answered || clickedNumber === null}
                    className={`transition-all duration-200 ${
                      clickedNumber !== null && !answered ? "cursor-pointer hover:scale-105" : "cursor-default"
                    }`}
                  >
                    {displaySequence[idx] !== undefined ? (
                      <div className="number-badge w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                        <span>{displaySequence[idx]}</span>
                      </div>
                    ) : (
                      <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center border-2 border-dashed transition-all ${
                        clickedNumber !== null && !answered
                          ? "border-purple-400 bg-purple-900/30 hover:bg-purple-900/50 hover:border-purple-300"
                          : "border-purple-600/30 bg-purple-950/20"
                      }`}>
                        <span className="text-purple-400 text-lg sm:text-xl font-bold">?</span>
                    </div>
                )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {answered && (
            <section className="text-center fade-in relative z-10">
              {JSON.stringify(selected) === JSON.stringify(question.correct) ? (
                <div className="mb-6 sm:mb-8">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🚀</div>
                  <p className="text-2xl sm:text-3xl font-black text-green-400 mb-2 sm:mb-3">
                    {UI_TEXT.SORT_SEQUENCE.CORRECT}
                  </p>
                  <p className="text-base sm:text-lg text-purple-100 font-medium">{UI_TEXT.SORT_SEQUENCE.CORRECT_DESC}</p>
                </div>
              ) : (
                <div className="mb-6 sm:mb-8">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">💪</div>
                  <p className="text-2xl sm:text-3xl font-black text-orange-400 mb-2 sm:mb-3">
                    {UI_TEXT.SORT_SEQUENCE.INCORRECT}
                  </p>
                  <p className="text-base sm:text-lg text-purple-100 font-medium">
                    {UI_TEXT.SORT_SEQUENCE.CORRECT_ANSWER}{" "}
                    <span className="font-black text-green-400 text-lg sm:text-xl">{question.correct.join(", ")}</span>
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
                <p className="text-xl sm:text-2xl text-purple-100 mb-2 font-bold">
                  {UI_TEXT.SORT_SEQUENCE.COMPLETE}
                </p>
                <p className="text-2xl sm:text-3xl text-purple-300 font-black mb-3 sm:mb-4">
                  {score} {UI_TEXT.SORT_SEQUENCE.POINTS}
                </p>
              </div>
              <button
                onClick={handleRestart}
                className="btn-modern px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 hover:from-purple-500 hover:via-violet-500 hover:to-purple-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl"
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
