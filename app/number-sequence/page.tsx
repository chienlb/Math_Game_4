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
          {/* Nút quay lại game */}
          <button
            onClick={() => setGameStarted(false)}
            className="
              group
              mb-8 px-7 py-3
              bg-white bg-opacity-80 hover:bg-opacity-100
              rounded-full
              font-bold 
              text-base 
              text-gray-800
              flex items-center gap-3
              shadow-2xl border-none
              transition-all duration-200 
              hover:text-pink-600
              hover:shadow-pink-200
              hover:scale-105
              backdrop-blur
              relative
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-purple-200 before:to-pink-100 before:opacity-0 group-hover:before:opacity-40 before:transition-opacity before:duration-300
              overflow-hidden
            "
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-pink-300 to-orange-300 text-white shadow-md ring-2 ring-white mr-2 transition group-hover:-translate-x-1">
              {/* Left arrow icon (heroicons) */}
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 19.75L8.25 12l7.5-7.75" />
              </svg>
            </span>
            <span className="tracking-tight text-lg">Quay lại</span>
          </button>
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
