"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, RotateCcw, BookOpen } from "lucide-react"
import * as THREE from "three"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { createEnhancedLights, createBoxMesh, createParticleSystem } from "@/lib/three-helpers"
import { UI_TEXT, GAME_CONFIG } from "@/lib/constants"
import { fetchPatternGuesserQuestions, type PatternGuesserQuestion as Question } from "@/lib/api-service"

interface MissingNumberGameProps {
  onBack: () => void
  guidePath?: string
}

export default function MissingNumberGame({ onBack, guidePath = "/missing-number/guide" }: MissingNumberGameProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showOptionPopup, setShowOptionPopup] = useState(false)
  const [clickedNullIndex, setClickedNullIndex] = useState<number | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const mouseRef = useMousePosition(canvasRef)
  const nullGroupsRef = useRef<THREE.Group[]>([])

  // Fetch questions from API
  useEffect(() => {
    async function loadQuestions() {
      setLoading(true)
      try {
        const fetchedQuestions = await fetchPatternGuesserQuestions()
        if (fetchedQuestions && fetchedQuestions.length > 0) {
          setQuestions(fetchedQuestions)
        } else {
          console.error('No questions received from API')
          // Fallback questions are already returned by fetchPatternGuesserQuestions
          setQuestions([
            {
              sequence: [2, 4, null, 8],
              options: [5, 6, 7, 8],
              correct: 6,
            },
            {
              sequence: [1, null, 5, 7],
              options: [2, 3, 4, 5],
              correct: 3,
            },
            {
              sequence: [10, 20, null, 40],
              options: [25, 30, 35, 40],
              correct: 30,
            },
          ])
        }
      } catch (error) {
        console.error('Failed to load questions:', error)
        // Set fallback questions on error
        setQuestions([
          {
            sequence: [2, 4, null, 8],
            options: [5, 6, 7, 8],
            correct: 6,
          },
          {
            sequence: [1, null, 5, 7],
            options: [2, 3, 4, 5],
            correct: 3,
          },
          {
            sequence: [10, 20, null, 40],
            options: [25, 30, 35, 40],
            correct: 30,
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
    container.appendChild(renderer.domElement)

    const groups: THREE.Group[] = []

    question.sequence.forEach((num, idx) => {
      const group = new THREE.Group()
      const isNull = num === null

      const hue = 0.05 + (idx / Math.max(question.sequence.length, 1)) * 0.1
      const color = new THREE.Color().setHSL(hue, 0.9, 0.55)

      const cube = createBoxMesh(1.5, color, {
        metalness: isNull ? 0.9 : 0.6,
        roughness: isNull ? 0.05 : 0.3,
        emissiveIntensity: isNull ? 1.0 : 0.5,
      })

      if (isNull && cube.material instanceof THREE.MeshStandardMaterial) {
        cube.material.emissive = new THREE.Color(0xff6b35).multiplyScalar(0.9)
      }

      group.add(cube)

      if (isNull) {
        for (let i = 0; i < 4; i++) {
          const edgeGeometry = new THREE.BoxGeometry(1.5 + i * 0.12, 1.5 + i * 0.12, 1.5 + i * 0.12)
          const edgeMaterial = new THREE.MeshStandardMaterial({
            color: 0xff6b35,
            emissive: 0xff6b35,
            emissiveIntensity: 0.8,
            metalness: 0.7,
            roughness: 0.2,
            transparent: true,
            opacity: (0.6 - i * 0.12),
            wireframe: true,
          })
          const edge = new THREE.Mesh(edgeGeometry, edgeMaterial)
          group.add(edge)
        }

        const glowGeometry = new THREE.BoxGeometry(2.2, 2.2, 2.2)
        const glowMaterial = new THREE.MeshStandardMaterial({
          color: 0xff6b35,
          emissive: 0xff6b35,
          emissiveIntensity: 0.5,
          metalness: 0.3,
          roughness: 0.4,
          transparent: true,
          opacity: 0.25,
          side: THREE.BackSide,
        })
        const glow = new THREE.Mesh(glowGeometry, glowMaterial)
        group.add(glow)
      }

      const angle = (idx / question.sequence.length) * Math.PI * 2
      group.position.x = Math.cos(angle) * 10
      group.position.y = Math.sin(angle) * 10
      group.userData = {
        targetX: group.position.x,
        targetY: group.position.y,
        number: num,
        index: idx,
        isNull: isNull,
      }

      scene.add(group)
      groups.push(group)
    })

    const { particles: bgParticles, update: updateParticles } = createParticleSystem(180, 0xff6b35, {
      size: 0.07,
      spread: 60,
      speed: 0.35,
    })
    scene.add(bgParticles)

    createEnhancedLights(scene, { intensity: 3.5, distance: 200 })

    const accentLight1 = new THREE.PointLight(0xff6b35, 3, 150)
    accentLight1.position.set(30, 30, 30)
    scene.add(accentLight1)

    const accentLight2 = new THREE.PointLight(0xff4757, 2.5, 150)
    accentLight2.position.set(-30, -30, 30)
    scene.add(accentLight2)

    // Store null groups for raycaster
    nullGroupsRef.current = groups.filter(g => g.userData.isNull)
    
    // Raycaster for clicking on null position in sequence
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredNull: THREE.Group | null = null
    
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      if (answered || rafId !== null) return
      
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
        
        raycaster.setFromCamera(mouse, camera)
        const intersects = raycaster.intersectObjects(nullGroupsRef.current, true)
        
        if (intersects.length > 0) {
          const clickedObject = intersects[0].object
          const nullGroup = clickedObject.parent as THREE.Group
          if (nullGroup && nullGroup.userData.isNull) {
            if (hoveredNull !== nullGroup) {
              if (hoveredNull) hoveredNull.userData.hovered = false
              hoveredNull = nullGroup
              nullGroup.userData.hovered = true
            }
          }
        } else {
          if (hoveredNull) {
            hoveredNull.userData.hovered = false
            hoveredNull = null
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
      const nullGroups = groups.filter(g => g.userData.isNull)
      const intersects = raycaster.intersectObjects(nullGroups, true)
      
      if (intersects.length > 0) {
        const clickedObject = intersects[0].object
        const nullGroup = clickedObject.parent as THREE.Group
        if (nullGroup && nullGroup.userData.isNull) {
          const nullIndex = groups.findIndex(g => g === nullGroup)
          setClickedNullIndex(nullIndex)
          setShowOptionPopup(true)
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

      groups.forEach((group) => {
        if (group.userData.number !== undefined || group.userData.number === null) {
          group.rotation.x += GAME_CONFIG.ANIMATION.ROTATION_SPEED * 1.2
          group.rotation.y += GAME_CONFIG.ANIMATION.ROTATION_SPEED * 1.4

          const floatY = Math.sin(time + group.userData.index) * GAME_CONFIG.ANIMATION.FLOAT_AMPLITUDE * 1.3
          group.position.y = group.userData.targetY + floatY

          const mouseInfluence = (mouseRef.current.x * 5 - group.position.x * 0.02) * GAME_CONFIG.ANIMATION.MOUSE_INFLUENCE
          group.position.x += mouseInfluence

          if (group.userData.isNull) {
            const pulse = Math.sin(time * 2.5) * 0.3 + 0.7
            group.scale.set(pulse, pulse, pulse)
            
            group.children.forEach((child: THREE.Object3D) => {
              if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial && child.material.wireframe) {
                child.rotation.x += 0.02
                child.rotation.y += 0.02
          }
            })
          }
        }
      })

      // Enhanced hover effect for null position
      groups.forEach((group) => {
        if (group.userData.isNull && group.userData.hovered) {
          const pulse = Math.sin(time * 3) * 0.2 + 1.2
          group.scale.set(pulse, pulse, pulse)
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
      setShowOptionPopup(false)
      setClickedNullIndex(null)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScore(0)
    setAnswered(false)
    setSelectedAnswer(null)
    setShowOptionPopup(false)
    setClickedNullIndex(null)
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
  const nullIndex = question.sequence.findIndex((n) => n === null)

  return (
    <div className="relative w-full h-full flex flex-col">
      <div ref={canvasRef} className="absolute inset-0 -z-10" />

      <header className="absolute top-3 sm:top-4 left-3 sm:left-4 flex gap-2 sm:gap-3 z-30">
        <button
          onClick={onBack}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label={UI_TEXT.COMMON.BACK}
        >
          <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{UI_TEXT.COMMON.BACK}</span>
        </button>
        <a
          href={guidePath}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label="Quay về trang hướng dẫn"
        >
          <BookOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">Hướng Dẫn</span>
        </a>
        <button
          onClick={handleRestart}
          className="btn-modern flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-xl text-sm sm:text-base font-semibold shadow-lg"
          aria-label={UI_TEXT.COMMON.RESTART}
        >
          <RotateCcw size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="hidden sm:inline">{UI_TEXT.COMMON.RESTART}</span>
        </button>
      </header>

      <div className="absolute top-4 right-4 z-30">
        <div className="glass-strong px-3 sm:px-4 py-2 rounded-xl border border-orange-400/40 shadow-lg bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <div className="text-lg sm:text-xl font-black text-orange-300 flex items-center gap-2">
            <span>⭐</span>
            <span>
              {UI_TEXT.COMMON.SCORE}: <span className="text-orange-200">{score}</span>/
              <span className="text-orange-400">{questions.length}</span>
            </span>
      </div>
        </div>
      </div>

      <main className="absolute inset-0 flex items-center justify-center px-4 py-20 z-20 overflow-y-auto">
        <div className="glass-strong p-6 sm:p-8 rounded-3xl max-w-5xl w-full border-2 border-orange-400/60 shadow-2xl relative overflow-hidden bg-gradient-to-br from-orange-950/30 via-red-950/25 to-orange-950/30 my-8 backdrop-blur-xl">

          <section className="mb-8 relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <p className="text-sm text-orange-200 font-bold px-4 py-2 bg-orange-500/30 rounded-full border border-orange-400/50">
              Câu {currentQuestion + 1}/{questions.length}
            </p>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-red-300 to-orange-300 mb-6 sm:mb-8">
              {UI_TEXT.MISSING_NUMBER.TITLE}
            </h2>
            <p className="text-sm sm:text-base text-orange-100 mb-4 sm:mb-6 font-medium text-center">
              Click vào vị trí <span className="text-orange-300 font-bold">?</span> để chọn số điền vào
            </p>

            <div className="flex gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 flex-wrap">
              {question.sequence.map((num, idx) => (
                <div 
                  key={`${num}-${idx}`}
                >
                  {num !== null ? (
                    <div className="number-badge w-14 h-14 sm:w-16 sm:h-16 text-xl sm:text-2xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg border-orange-400/50">
                      <span>{num}</span>
                    </div>
                  ) : (
                    <div 
                      className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black border-2 border-dashed shadow-lg transition-all duration-200 cursor-pointer ${
                        clickedNullIndex === idx 
                          ? "border-orange-400 scale-110 shadow-orange-500/50 bg-orange-900/30" 
                          : selectedAnswer !== null && idx === nullIndex
                            ? selectedAnswer === question.correct
                              ? "border-green-400 bg-green-900/30"
                              : "border-red-400 bg-red-900/30"
                            : "border-orange-400 hover:border-orange-300 hover:scale-105"
                      }`}
                      onClick={() => {
                        if (!answered && num === null) {
                          setClickedNullIndex(idx)
                          setShowOptionPopup(true)
                        }
                      }}
                    >
                      <span className={
                        selectedAnswer !== null && idx === nullIndex
                          ? selectedAnswer === question.correct
                            ? "text-green-400"
                            : "text-red-400"
                          : "text-orange-400"
                      }>
                        {selectedAnswer !== null && idx === nullIndex ? selectedAnswer : "?"}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {showOptionPopup && !answered && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="glass-strong p-6 sm:p-8 rounded-3xl max-w-md w-full border-2 border-orange-500/50 shadow-xl bg-gradient-to-br from-orange-950/30 to-red-950/30 relative z-50">
                <div>
                  <h3 className="text-2xl font-black text-orange-200 mb-6 text-center">
                    Chọn số để điền vào vị trí trống
                  </h3>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {question.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          handleAnswer(option)
                          setShowOptionPopup(false)
                          setClickedNullIndex(null)
                        }}
                        className="answer-btn py-5 sm:py-6 px-6 sm:px-8 text-xl sm:text-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 transition-all duration-200 rounded-xl shadow-lg"
                      >
                        <span>{option}</span>
                      </button>
                    ))}
          </div>
                  <button
                    onClick={() => {
                      setShowOptionPopup(false)
                      setClickedNullIndex(null)
                    }}
                    className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white font-semibold rounded-xl transition-all"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          )}

          {!answered && !showOptionPopup && (
            <section className="space-y-6 relative z-10">
              <div className="text-center mb-6">
                <p className="text-base text-orange-200 mb-3 font-semibold">
                  Click vào vị trí trống để chọn số
                </p>
              </div>
            </section>
          )}

          {answered && (
            <section className="text-center fade-in relative z-10">
              {selectedAnswer === question.correct ? (
                <div className="mb-6 sm:mb-8">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🌟</div>
                  <p className="text-2xl sm:text-3xl font-black text-green-400 mb-2 sm:mb-3">
                    {UI_TEXT.MISSING_NUMBER.CORRECT}
                  </p>
                  <p className="text-base sm:text-lg text-orange-100 font-medium">{UI_TEXT.MISSING_NUMBER.CORRECT_DESC}</p>
                </div>
              ) : (
                <div className="mb-6 sm:mb-8">
                  <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🤔</div>
                  <p className="text-2xl sm:text-3xl font-black text-orange-400 mb-2 sm:mb-3">
                    {UI_TEXT.MISSING_NUMBER.INCORRECT}
                  </p>
                  <p className="text-base sm:text-lg text-orange-100 font-medium">
                    {UI_TEXT.MISSING_NUMBER.CORRECT_ANSWER}{" "}
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
                <p className="text-xl sm:text-2xl text-orange-100 mb-2 font-bold">
                  {UI_TEXT.MISSING_NUMBER.COMPLETE}
                </p>
                <p className="text-2xl sm:text-3xl text-orange-300 font-black mb-3 sm:mb-4">
                  {score} {UI_TEXT.MISSING_NUMBER.POINTS}
                </p>
              </div>
              <button
                onClick={handleRestart}
                className="btn-modern px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 hover:from-orange-500 hover:via-red-500 hover:to-orange-500 text-white font-black rounded-2xl text-base sm:text-lg shadow-xl"
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
