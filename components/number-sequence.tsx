"use client"

import { useState } from "react"
import { motion } from "framer-motion"

const sequences = [
  { numbers: [2, 4, 6, 8], nextNumber: 10, hint: "Mỗi số hơn số trước 2" },
  { numbers: [5, 10, 15, 20], nextNumber: 25, hint: "Mỗi số hơn số trước 5" },
  { numbers: [1, 2, 4, 8], nextNumber: 16, hint: "Mỗi số gấp đôi số trước" },
  { numbers: [10, 8, 6, 4], nextNumber: 2, hint: "Mỗi số giảm 2 so với số trước" },
  { numbers: [1, 1, 2, 3, 5, 8], nextNumber: 13, hint: "Mỗi số là tổng của hai số trước" },
  { numbers: [100, 50, 25], nextNumber: 12, hint: "Mỗi số là một nửa số trước" },
]

interface NumberSequenceProps {
  onScoreChange?: (score: number) => void
  onQuestionChange?: (question: number) => void
}

export default function NumberSequence({ onScoreChange, onQuestionChange }: NumberSequenceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isChecked, setIsChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [focusedInput, setFocusedInput] = useState(false)

  const current = sequences[currentIndex]
  const progress = ((currentIndex + 1) / sequences.length) * 100

  const handleCheck = () => {
    const userAnswer = Number.parseInt(inputValue, 10)
    const correct = userAnswer === current.nextNumber
    setIsCorrect(correct)
    setIsChecked(true)

    if (correct) {
      const points = showHint ? 5 : 10
      setScore((prev) => {
        const newScore = prev + points
        onScoreChange?.(newScore)
        return newScore
      })
    }
  }

  const handleNext = () => {
    if (currentIndex < sequences.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      onQuestionChange?.(currentIndex + 2)
      setInputValue("")
      setIsChecked(false)
      setIsCorrect(null)
      setShowHint(false)
    }
  }

  return (
    <div
      className="bg-gradient-to-br from-white via-purple-50 to-pink-100 rounded-3xl shadow-2xl p-8 max-w-2xl mx-auto relative overflow-hidden depth-card-lg perspective-1000"
      style={{ perspective: "1200px" }}
    >
      <motion.div className="mb-8 relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-bold text-purple-700">Tiến độ</h3>
          <span className="text-xs font-bold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {currentIndex + 1}/{sequences.length}
          </span>
        </div>
        <div className="w-full bg-purple-200 rounded-full h-4 overflow-hidden shadow-inner">
          <motion.div
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-pink-500 h-full rounded-full shadow-lg"
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
          className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
        >
          📊 Điền Số
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-black text-2xl shadow-lg animate-glow-pulse"
        >
          {score} ⭐
        </motion.div>
      </div>

      <div className="mb-8 relative z-10">
        <div
          className="flex justify-center items-center gap-2 mb-8 bg-gradient-to-br from-purple-50 via-white to-pink-50 p-8 rounded-3xl shadow-lg"
          style={{ perspective: "1000px" }}
        >
          {current.numbers.map((num, idx) => (
            <motion.div
              key={idx}
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.2, rotateZ: -10, rotateX: 5 }}
              className="relative cursor-pointer"
            >
              <div
                className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl animate-glow-pulse number-3d"
                style={{ animationDelay: `${idx * 0.2}s`, transformStyle: "preserve-3d" }}
              >
                {num}
              </div>
              {idx < current.numbers.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -right-7 top-1/2 transform -translate-y-1/2 text-2xl font-black text-purple-400"
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black text-purple-400 mx-2"
          >
            →
          </motion.div>
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: current.numbers.length * 0.1, type: "spring", stiffness: 120 }}
            className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl animate-pulse number-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            ?
          </motion.div>
        </div>

        <motion.div className="mb-6">
          <label className="block text-sm font-bold text-purple-700 mb-3">Nhập số tiếp theo:</label>
          <motion.input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isChecked && handleCheck()}
            onFocus={() => setFocusedInput(true)}
            onBlur={() => setFocusedInput(false)}
            disabled={isChecked}
            placeholder="?"
            initial={{ scale: 0.9 }}
            animate={{ scale: focusedInput ? 1.05 : 1 }}
            className="w-full px-6 py-5 text-3xl font-black rounded-2xl focus:outline-none focus:shadow-2xl bg-purple-50 text-center text-purple-700 disabled:opacity-50 transition-all shadow-lg"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          />
        </motion.div>

        <div className="flex gap-3 mb-6">
          <motion.button
            onClick={handleCheck}
            disabled={isChecked || !inputValue}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-4 rounded-2xl hover:shadow-xl transition-shadow text-lg disabled:opacity-50 animate-glow-pulse"
          >
            Kiểm Tra ✓
          </motion.button>
          <motion.button
            onClick={() => setShowHint(true)}
            disabled={isChecked || showHint}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-black rounded-2xl hover:shadow-xl transition-shadow text-lg disabled:opacity-50"
          >
            💡 Gợi Ý
          </motion.button>
        </div>

        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-5 mb-6 font-black text-yellow-700 text-center text-lg shadow-lg"
          >
            💡 {current.hint}
          </motion.div>
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
            {isCorrect
              ? `🎉 Chính xác! Số tiếp theo là ${current.nextNumber}`
              : `❌ Không đúng! Đáp án là ${current.nextNumber}`}
          </motion.div>
        </motion.div>
      )}

      {isChecked && currentIndex < sequences.length - 1 && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-4 rounded-2xl hover:shadow-xl transition-shadow text-xl relative z-10 animate-glow-pulse"
        >
          Câu Tiếp Theo →
        </motion.button>
      )}

      {currentIndex === sequences.length - 1 && isChecked && (
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
          <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            {score} / {sequences.length * 10} ⭐
          </div>
        </motion.div>
      )}
    </div>
  )
}
