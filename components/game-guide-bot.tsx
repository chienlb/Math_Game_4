"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface GameGuideBotProps {
  gameType: "pattern-guesser" | "number-sequence" | "odd-one-out"
  currentQuestion?: number
  totalQuestions?: number
}

export default function GameGuideBot({ gameType, currentQuestion = 1, totalQuestions = 6 }: GameGuideBotProps) {
  const [isOpen, setIsOpen] = useState(false)

  const guides = {
    "pattern-guesser": {
      title: "Tìm Quy Luật",
      messages: [
        "Xin chào! Tôi là trợ lý học tập của bạn 👋",
        "Trong trò chơi này, bạn cần tìm ra quy luật ẩn trong dãy số.",
        "Quan sát kỹ lưỡng: các số tăng hay giảm? Có nhân hay chia? Là dãy Fibonacci?",
        "Gợi ý: Luôn nhìn vào sự khác biệt giữa các số liên tiếp!",
        "Hãy chọn đáp án đúng từ 4 lựa chọn. Bạn có thể làm được! 🌟",
      ],
    },
    "number-sequence": {
      title: "Điền Số Tiếp Theo",
      messages: [
        "Chào bạn! Tôi sẽ hỗ trợ bạn trong trò chơi này 👋",
        "Mục tiêu: Nhìn vào dãy số và nhập đúng số tiếp theo.",
        "Các quy luật thường gặp: Cộng, trừ, nhân, chia, hoặc dãy Fibonacci.",
        'Gợi ý: Nếu không chắc, hãy nhấn nút "Gợi Ý" để nhận trợ giúp 💡',
        "Gợi ý thêm: Số ít hơn (5 điểm), nhưng không gợi ý (10 điểm) được nhiều hơn!",
      ],
    },
    "odd-one-out": {
      title: "Tìm Số Lạc",
      messages: [
        "Xin chào tới trò chơi Tìm Số Lạc! 👋",
        "Bạn sẽ thấy 6 số. 5 số tuân theo một quy luật, 1 số khác.",
        "Nhiệm vụ: Tìm số không theo quy luật đó.",
        "Gợi ý: Kiểm tra xem các số có chẵn/lẻ, chia hết, hay là lũy thừa không?",
        "Hãy suy nghĩ kỹ càng và chọn số lạc. Bạn sẽ thành công! ⭐",
      ],
    },
  }

  const guide = guides[gameType]

  return (
    <>
      {/* Guide Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full shadow-2xl flex items-center justify-center text-3xl hover:shadow-3xl transition-shadow z-40 animate-glow-pulse"
        title="Hỏi trợ lý"
      >
        🤖
      </motion.button>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
            />

            {/* Chat Box */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl overflow-hidden z-50 max-h-96 flex flex-col"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black">{guide.title}</h3>
                  <button onClick={() => setIsOpen(false)} className="text-2xl hover:scale-125 transition-transform">
                    ×
                  </button>
                </div>
                <p className="text-sm opacity-90">
                  Câu {currentQuestion}/{totalQuestions}
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {guide.messages.map((message, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="text-2xl flex-shrink-0">🤖</span>
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 shadow-sm">
                      <p className="text-gray-800 font-medium text-sm leading-relaxed">{message}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer Button */}
              <div className="border-t p-4">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-shadow"
                >
                  Bắt Đầu Chơi!
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
