"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

export default function NextNumberGuidePage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen">
      {/* Fixed background that covers entire viewport - vibrant gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900 via-violet-800 via-indigo-900 to-purple-800">
        {/* Enhanced gradient overlays for visibility */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.4),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.3),transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-violet-600/10 pointer-events-none"></div>
      </div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <main className="relative z-10 w-full min-h-full px-3 py-6 sm:px-4 sm:py-8 pb-32">
          <div className="glass-strong p-5 sm:p-6 rounded-xl max-w-3xl w-full mx-auto border-2 border-purple-400/60 shadow-2xl relative bg-gradient-to-br from-purple-950/50 via-violet-950/40 to-purple-950/50 backdrop-blur-xl mb-8">
            <header className="mb-5 flex items-center justify-between">
              <button
                onClick={() => router.push("/")}
                className="btn-modern flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
              >
                <ArrowLeft size={16} />
                <span>Về Trang Chủ</span>
              </button>
            </header>

            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl mb-3 animate-bounce-gentle">🔢</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 mb-3 drop-shadow-2xl">
                  Hướng Dẫn: Tìm Số Tiếp Theo
                </h1>
                <p className="text-purple-200 text-base sm:text-lg font-semibold">
                  Tìm quy luật và chọn số tiếp theo trong dãy số
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-purple-300 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">📋</span> Cách Chơi
                </h2>
                <div className="glass p-4 sm:p-5 rounded-xl border-2 border-purple-500/40 space-y-3 bg-gradient-to-br from-purple-950/20 to-violet-950/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/50 to-violet-500/50 flex items-center justify-center font-black text-white text-base shadow-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-purple-100 mb-1.5 text-base">Quan sát dãy số</h3>
                      <p className="text-purple-200/90 text-sm leading-relaxed">
                        Xem kỹ dãy số được hiển thị và tìm quy luật giữa các số.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/50 to-violet-500/50 flex items-center justify-center font-black text-white text-base shadow-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-purple-100 mb-1.5 text-base">Tìm quy luật</h3>
                      <p className="text-purple-200/90 text-sm leading-relaxed">
                        Phân tích sự khác biệt giữa các số liên tiếp để tìm quy luật (cộng, trừ, nhân, chia, hoặc các quy luật phức tạp hơn).
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/50 to-violet-500/50 flex items-center justify-center font-black text-white text-base shadow-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-purple-100 mb-1.5 text-base">Chọn số tiếp theo</h3>
                      <p className="text-purple-200/90 text-sm leading-relaxed">
                        Click vào số đúng trong các lựa chọn để hoàn thành dãy số.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-purple-300 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">💡</span> Ví Dụ
                </h2>
                <div className="glass p-4 sm:p-5 rounded-xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-950/20 to-violet-950/20">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/30">
                      <p className="text-purple-200/90 mb-1.5 text-sm">Dãy số: <span className="font-black text-purple-300 text-base">2, 4, 6, 8, ?</span></p>
                      <p className="text-purple-200/90 mb-1.5 text-sm">Quy luật: Mỗi số tăng thêm 2</p>
                      <p className="text-violet-400 font-black text-base mt-1.5">→ Số tiếp theo: <span className="text-lg">10</span></p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-900/30 to-violet-900/30 border border-purple-500/30">
                      <p className="text-purple-200/90 mb-1.5 text-sm">Dãy số: <span className="font-black text-purple-300 text-base">1, 4, 9, 16, ?</span></p>
                      <p className="text-purple-200/90 mb-1.5 text-sm">Quy luật: Bình phương của số tự nhiên (1², 2², 3², 4²...)</p>
                      <p className="text-violet-400 font-black text-base mt-1.5">→ Số tiếp theo: <span className="text-lg">25</span></p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-purple-300 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">🎯</span> Mẹo Chơi
                </h2>
                <div className="glass p-4 sm:p-5 rounded-xl border-2 border-purple-500/40 bg-gradient-to-br from-purple-950/20 to-violet-950/20">
                  <ul className="space-y-2.5 text-purple-200/90">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Kiểm tra các phép toán cơ bản trước (cộng, trừ, nhân, chia)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Xem xét sự khác biệt giữa các số liên tiếp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Thử các quy luật phức tạp hơn như bình phương, lũy thừa, hoặc Fibonacci</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Luyện tập nhiều để nhận biết quy luật nhanh hơn</span>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="flex justify-center pt-5 pb-6">
                <Link
                  href="/next-number"
                  className="btn-modern flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500 text-white font-black rounded-lg text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-500/60"
                >
                  <Play size={20} />
                  <span>Bắt Đầu Chơi</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

