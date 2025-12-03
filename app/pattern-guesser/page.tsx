"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import PatternGuesser from "@/components/pattern-guesser"
import GameGuideBot from "@/components/game-guide-bot"

export default function PatternGuesserPage() {
  const router = useRouter()
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
        <div className="max-w-2xl mx-auto">
          <PatternGuesser onScoreChange={setScore} onQuestionChange={setCurrentQuestion} />
          <GameGuideBot gameType="pattern-guesser" currentQuestion={currentQuestion} totalQuestions={5} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-purple-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6 animate-bounce">🔢</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Tìm Quy Luật
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Khám phá các quy luật ẩn trong dãy số! Quan sát kỹ lưỡng, tìm ra quy luật và trả lời đúng câu hỏi. Mỗi quy
            luật khác nhau đều là một thử thách thú vị.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">5 Câu Hỏi</h3>
              <p className="text-gray-600">Từ dễ đến khó, kiểm tra kỹ năng của bạn</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🧠</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Rèn Luyện Logic</h3>
              <p className="text-gray-600">Phát triển kỹ năng suy luận toán học</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Kiếm Điểm</h3>
              <p className="text-gray-600">Thách thức bạn bè với điểm số cao nhất</p>
            </div>
          </div>

          <button
            onClick={() => setGameStarted(true)}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-block"
          >
            🎮 Bắt Đầu Chơi
          </button>
        </div>
      </div>
    </div>
  )
}
