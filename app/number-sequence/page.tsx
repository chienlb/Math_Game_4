"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import NumberSequence from "@/components/number-sequence"
import GameGuideBot from "@/components/game-guide-bot"

export default function NumberSequencePage() {
  const router = useRouter()
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-4">
        <div className="max-w-2xl mx-auto">
          <NumberSequence onScoreChange={setScore} onQuestionChange={setCurrentQuestion} />
          <GameGuideBot gameType="number-sequence" currentQuestion={currentQuestion} totalQuestions={6} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-100 to-orange-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6 animate-bounce">📊</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Điền Số Tiếp Theo
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Nhìn kỹ vào dãy số, hiểu được quy luật của nó, và điền đúng số tiếp theo. Sử dụng gợi ý nếu cần và học hỏi
            từ mỗi câu trả lời.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">6 Câu Hỏi</h3>
              <p className="text-gray-600">Thực hành nhập liệu và tính toán nhanh</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Gợi Ý Thông Minh</h3>
              <p className="text-gray-600">Nhận trợ giúp khi bạn cần thiết</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🔢</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Nhiều Quy Luật</h3>
              <p className="text-gray-600">Cộng, nhân, Fibonacci và nhiều hơn nữa</p>
            </div>
          </div>

          <button
            onClick={() => setGameStarted(true)}
            className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-block"
          >
            🎮 Bắt Đầu Chơi
          </button>
        </div>
      </div>
    </div>
  )
}
