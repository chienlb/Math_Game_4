"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const patterns = [
  {
    sequence: [2, 4, 6, 8],
    options: [10, 12, 9, 11],
    answer: 0,
    rule: "Cộng thêm 2",
  },
  {
    sequence: [1, 1, 2, 3, 5],
    options: [8, 7, 6, 9],
    answer: 0,
    rule: "Dãy Fibonacci",
  },
  {
    sequence: [5, 10, 15, 20],
    options: [25, 30, 22, 24],
    answer: 0,
    rule: "Cộng thêm 5",
  },
  {
    sequence: [1, 4, 9, 16],
    options: [25, 24, 20, 28],
    answer: 0,
    rule: "Bình phương các số",
  },
  {
    sequence: [100, 50, 25],
    options: [12, 13, 14, 15],
    answer: 1,
    rule: "Chia cho 2",
  },
]

interface PatternGuesserProps {
  onScoreChange?: (score: number) => void
  onQuestionChange?: (question: number) => void
}

export default function PatternGuesser({ onScoreChange, onQuestionChange }: PatternGuesserProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<number | null>(null)

  const current = patterns[currentIndex]
  const progress = ((currentIndex + 1) / patterns.length) * 100

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    const correct = index === current.answer
    setIsCorrect(correct)
    setShowFeedback(true)

    if (correct) {
      setScore((prev) => {
        const newScore = prev + 10
        onScoreChange?.(newScore)
        return newScore
      })
    }
  }

  const handleNext = () => {
    if (currentIndex < patterns.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      onQuestionChange?.(currentIndex + 2)
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShowFeedback(false)
    }
  }

  return (
    <div
      className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto relative overflow-hidden depth-card-lg perspective-1000 transition-transform duration-500 hover:shadow-2xl"
      style={{ perspective: "1200px" }}
    >
      <motion.div className="mb-8 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-blue-700">Tiến độ</h3>
          <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {currentIndex + 1}/{patterns.length}
          </span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-cyan-500 h-full rounded-full shadow-lg"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      <div className="flex justify-between items-center mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600"
        >
          🔢 Tìm Quy Luật
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-black text-2xl shadow-lg animate-glow-pulse"
        >
          {score} ⭐
        </motion.div>
      </div>

      <div className="mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-bold text-blue-700 mb-6 bg-gradient-to-r from-blue-100 to-cyan-100 p-4 rounded-2xl shadow-md"
        >
          Quy luật: <span className="text-blue-600 text-xl font-black">{current.rule}</span>
        </motion.div>

        <div
          className="flex justify-around items-center mb-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-8 rounded-3xl shadow-lg"
          style={{ perspective: "1000px" }}
        >
          {current.sequence.map((num, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.15, rotateZ: 10 }}
              className="w-20 h-20 bg-gradient-to-br from-blue-400 via-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl animate-glow-pulse number-3d cursor-pointer"
              style={{ animationDelay: `${idx * 0.2}s`, transformStyle: "preserve-3d" }}
            >
              {num}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-black text-blue-400 mx-2"
          >
            →
          </motion.div>
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: current.sequence.length * 0.1, type: "spring", stiffness: 100 }}
            className="w-20 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl animate-pulse number-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            ?
          </motion.div>
        </div>

        <motion.div className="text-center mb-6 font-bold text-lg text-blue-700">Số tiếp theo là?</motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {current.options.map((option, idx) => (
            <motion.button
              key={idx}
              onClick={() => !showFeedback && handleAnswer(idx)}
              onMouseEnter={() => setHoveredOption(idx)}
              onMouseLeave={() => setHoveredOption(null)}
              whileHover={{ scale: 1.08, rotateX: -5, rotateY: 5 }}
              whileTap={{ scale: 0.92 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`py-5 px-6 rounded-2xl font-black text-2xl transition-all ${
                selectedAnswer === idx
                  ? isCorrect
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-2xl scale-105 animate-deep-glow"
                    : "bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-2xl scale-105"
                  : "bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50"
              }`}
              disabled={showFeedback}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {showFeedback && (
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className={`p-6 rounded-3xl mb-6 font-black text-center text-xl relative z-10 ${
            isCorrect
              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 shadow-lg"
              : "bg-gradient-to-r from-red-100 to-pink-100 text-red-700 shadow-lg"
          }`}
        >
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
            {isCorrect ? "🎉 Tuyệt vời! Đúng rồi!" : `❌ Sai rồi! Đáp án là ${current.options[current.answer]}`}
          </motion.div>
        </motion.div>
      )}

      {showFeedback && currentIndex < patterns.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black py-4 rounded-2xl hover:shadow-xl transition-shadow text-xl relative z-10 animate-glow-pulse"
        >
          Câu Tiếp Theo →
        </motion.button>
      )}

      {currentIndex === patterns.length - 1 && showFeedback && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
            className="text-4xl font-black text-gray-700 mb-4"
          >
            Hoàn Thành! 🎊
          </motion.div>
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
            {score} / {patterns.length * 10} ⭐
          </div>
        </motion.div>
      )}
    </div>
  )
}
