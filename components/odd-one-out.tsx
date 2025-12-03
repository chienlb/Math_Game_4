"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const oddOneOutQuestions = [
  { numbers: [2, 4, 6, 7, 8, 10], oddIndex: 3, explanation: "7 là số lẻ, những số khác đều là số chẵn" },
  {
    numbers: [5, 10, 15, 20, 23, 25],
    oddIndex: 4,
    explanation: "23 không chia hết cho 5, những số khác đều chia hết cho 5",
  },
  { numbers: [1, 2, 4, 8, 15, 16], oddIndex: 4, explanation: "15 không phải là lũy thừa của 2, những số khác đều là" },
  {
    numbers: [3, 6, 9, 12, 14, 15],
    oddIndex: 4,
    explanation: "14 không chia hết cho 3, những số khác đều chia hết cho 3",
  },
  {
    numbers: [2, 3, 5, 7, 8, 11],
    oddIndex: 3,
    explanation: "8 không phải số nguyên tố, những số khác đều là số nguyên tố",
  },
  {
    numbers: [10, 20, 30, 35, 40, 50],
    oddIndex: 3,
    explanation: "35 không chia hết cho 10, những số khác đều chia hết cho 10",
  },
]

interface OddOneOutProps {
  onScoreChange?: (score: number) => void
  onQuestionChange?: (question: number) => void
}

export default function OddOneOut({ onScoreChange, onQuestionChange }: OddOneOutProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)

  const current = oddOneOutQuestions[currentIndex]
  const progress = ((currentIndex + 1) / oddOneOutQuestions.length) * 100

  const handleSelect = (index: number) => {
    if (!isChecked) setSelectedIndex(index)
  }

  const handleCheck = () => {
    if (selectedIndex !== null) {
      const correct = selectedIndex === current.oddIndex
      setIsCorrect(correct)
      setIsChecked(true)

      if (correct) {
        setScore((prev) => {
          const newScore = prev + 10
          onScoreChange?.(newScore)
          return newScore
        })
      }
    }
  }

  const handleNext = () => {
    if (currentIndex < oddOneOutQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedIndex(null)
      setIsChecked(false)
      setIsCorrect(null)
      onQuestionChange?.(currentIndex + 2)
    }
  }

  return (
    <div
      className="bg-gradient-to-br from-white via-orange-50 to-pink-100 rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto relative overflow-hidden depth-card-lg perspective-1000"
      style={{ perspective: "1200px" }}
    >
      <motion.div className="mb-8 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-orange-700">Tiến độ</h3>
          <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            {currentIndex + 1}/{oddOneOutQuestions.length}
          </span>
        </div>
        <div className="w-full bg-orange-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-orange-400 via-pink-400 to-pink-500 h-full rounded-full shadow-lg"
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
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600"
        >
          🎯 Tìm Số Lạc
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-full font-black text-2xl shadow-lg animate-glow-pulse"
        >
          {score} ⭐
        </motion.div>
      </div>

      <div className="mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 font-black text-lg text-orange-700 bg-gradient-to-r from-orange-100 to-pink-100 p-4 rounded-2xl shadow-md"
        >
          Hãy tìm số không thuộc quy luật:
        </motion.div>

        <div className="grid grid-cols-3 gap-4 mb-8" style={{ perspective: "1200px" }}>
          {current.numbers.map((num, idx) => (
            <motion.button
              key={idx}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => setHoveredButton(idx)}
              onMouseLeave={() => setHoveredButton(null)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.08, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.15, rotateX: -8, rotateY: 8, rotateZ: -2 }}
              whileTap={{ scale: 0.88 }}
              className={`aspect-square rounded-2xl font-black text-3xl transition-all number-3d ${
                selectedIndex === idx
                  ? isCorrect === null
                    ? "bg-gradient-to-br from-yellow-300 to-yellow-400 text-white shadow-2xl scale-110 animate-pulse animate-deep-glow"
                    : isCorrect
                      ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-2xl animate-scale-up animate-deep-glow"
                      : "bg-gradient-to-br from-red-400 to-pink-500 text-white shadow-2xl animate-scale-up"
                  : isChecked && idx === current.oddIndex
                    ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-2xl animate-scale-up animate-deep-glow"
                    : "bg-gradient-to-br from-gray-50 to-orange-50 text-gray-700 hover:from-orange-100 hover:to-pink-100 shadow-lg hover:shadow-2xl hover:shadow-orange-200/50"
              }`}
              disabled={isChecked}
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {num}
            </motion.button>
          ))}
        </div>

        {selectedIndex !== null && !isChecked && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleCheck}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-black py-4 rounded-2xl hover:shadow-xl transition-shadow text-xl mb-6 animate-glow-pulse"
          >
            Kiểm Tra ✓
          </motion.button>
        )}
      </div>

      {isChecked && (
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
            {isCorrect ? "🎉 Chính xác!" : "❌ Không đúng!"}
          </motion.div>
        </motion.div>
      )}

      {isChecked && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-3xl p-6 mb-6 font-bold text-blue-700 text-lg relative z-10 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl flex-shrink-0">💡</span>
            <span>{current.explanation}</span>
          </div>
        </motion.div>
      )}

      {isChecked && currentIndex < oddOneOutQuestions.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white font-black py-4 rounded-2xl hover:shadow-xl transition-shadow text-xl relative z-10 animate-glow-pulse"
        >
          Câu Tiếp Theo →
        </motion.button>
      )}

      {currentIndex === oddOneOutQuestions.length - 1 && isChecked && (
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
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600">
            {score} / {oddOneOutQuestions.length * 10} ⭐
          </div>
        </motion.div>
      )}
    </div>
  )
}
