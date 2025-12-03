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
              hover:shadow-orange-200
              hover:scale-105
              backdrop-blur
              relative
              before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-orange-200 before:to-pink-100 before:opacity-0 group-hover:before:opacity-40 before:transition-opacity before:duration-300
              overflow-hidden
            "
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-pink-300 text-white shadow-md ring-2 ring-white mr-2 transition group-hover:-translate-x-1">
              {/* Left arrow icon (heroicons) */}
              <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.75 19.75L8.25 12l7.5-7.75" />
              </svg>
            </span>
            <span className="tracking-tight text-lg">Quay lại</span>
          </button>
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
