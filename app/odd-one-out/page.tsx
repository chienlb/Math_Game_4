"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import OddOneOut from "@/components/odd-one-out"
import GameGuideBot from "@/components/game-guide-bot"

export default function OddOneOutPage() {
  const router = useRouter()
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(1)

  if (gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-100 to-yellow-100 p-4">
        <div className="max-w-2xl mx-auto">
          <OddOneOut onScoreChange={setScore} onQuestionChange={setCurrentQuestion} />
          <GameGuideBot gameType="odd-one-out" currentQuestion={currentQuestion} totalQuestions={6} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-100 to-yellow-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6 animate-bounce">🎯</div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-4">
            Tìm Số Lạc
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Nhìn vào 6 số và tìm ra cái không thuộc quy luật! Đó là số nào? Sử dụng logic toán học để tìm ra nó ngay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Tìm Ngoại Lệ</h3>
              <p className="text-gray-600">Luyện tập kỹ năng nhận diện và phân tích</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">🧩</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Thử Thách Logic</h3>
              <p className="text-gray-600">Kiểm tra khả năng lý luận phê phán</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg text-gray-800 mb-2">Nhanh Nhẹn</h3>
              <p className="text-gray-600">Phản xạ nhanh và chính xác là chìa khóa</p>
            </div>
          </div>

          <button
            onClick={() => setGameStarted(true)}
            className="px-10 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 inline-block"
          >
            🎮 Bắt Đầu Chơi
          </button>
        </div>
      </div>
    </div>
  )
}
