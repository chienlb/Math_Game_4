"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

export default function MissingNumberGuidePage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen">
      {/* Fixed background that covers entire viewport - vibrant gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-pink-900 via-rose-800 via-fuchsia-900 to-pink-800">
        {/* Enhanced gradient overlays for visibility */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.4),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(244,63,94,0.4),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.3),transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 via-transparent to-rose-600/10 pointer-events-none"></div>
      </div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <main className="relative z-10 w-full min-h-full px-3 py-6 sm:px-4 sm:py-8 pb-32">
          <div className="glass-strong p-5 sm:p-6 rounded-xl max-w-3xl w-full mx-auto border-2 border-pink-400/60 shadow-2xl relative bg-gradient-to-br from-pink-950/50 via-rose-950/40 to-fuchsia-950/50 backdrop-blur-xl mb-8">
            <header className="mb-5 flex items-center justify-between">
              <button
                onClick={() => router.push("/")}
                className="btn-modern flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
              >
                <ArrowLeft size={16} />
                <span>Về Trang Chủ</span>
              </button>
            </header>

            <div className="space-y-5">
              <div className="text-center mb-6">
                <div className="text-4xl sm:text-5xl mb-3 animate-bounce-gentle">❓</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-fuchsia-300 mb-3 drop-shadow-2xl">
                  Hướng Dẫn: Số Còn Thiếu
                </h1>
                <p className="text-pink-200 text-base sm:text-lg font-semibold">
                  Tìm số bị thiếu trong dãy số đầu tiên
                </p>
              </div>

              <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-pink-300 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">📋</span> Cách Chơi
                </h2>
                <div className="glass p-4 sm:p-5 rounded-xl border-2 border-pink-500/40 space-y-3 bg-gradient-to-br from-pink-950/20 to-rose-950/20">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/50 to-rose-500/50 flex items-center justify-center font-black text-white text-base shadow-lg">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-pink-100 mb-1.5 text-base">Quan sát dãy số</h3>
                      <p className="text-pink-200/90 text-sm leading-relaxed">
                        Xem kỹ dãy số được hiển thị, có một vị trí được đánh dấu bằng <span className="font-black text-pink-300 text-base">?</span>.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/50 to-rose-500/50 flex items-center justify-center font-black text-white text-base shadow-lg">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-pink-100 mb-1.5 text-base">Tìm quy luật</h3>
                      <p className="text-pink-200/90 text-sm leading-relaxed">
                        Phân tích các số xung quanh vị trí thiếu để tìm quy luật của dãy số.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500/50 to-rose-500/50 flex items-center justify-center font-black text-white text-base shadow-lg">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-pink-100 mb-1.5 text-base">Chọn số điền vào</h3>
                      <p className="text-pink-200/90 text-sm leading-relaxed">
                        Click vào vị trí <span className="font-black text-pink-300 text-base">?</span> để mở cửa sổ lựa chọn, sau đó chọn số đúng để điền vào.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-pink-300 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">💡</span> Ví Dụ
                </h2>
                <div className="glass p-4 sm:p-5 rounded-xl border-2 border-pink-500/40 bg-gradient-to-br from-pink-950/20 to-rose-950/20">
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30">
                      <p className="text-pink-200/90 mb-1.5 text-sm">Dãy số: <span className="font-black text-pink-300 text-base">5, 10, ?, 20, 25</span></p>
                      <p className="text-pink-200/90 mb-1.5 text-sm">Quy luật: Mỗi số tăng thêm 5</p>
                      <p className="text-rose-400 font-black text-base mt-1.5">→ Số còn thiếu: <span className="text-lg">15</span></p>
                    </div>
                    <div className="p-3 rounded-lg bg-gradient-to-r from-pink-900/30 to-rose-900/30 border border-pink-500/30">
                      <p className="text-pink-200/90 mb-1.5 text-sm">Dãy số: <span className="font-black text-pink-300 text-base">2, 4, ?, 16, 32</span></p>
                      <p className="text-pink-200/90 mb-1.5 text-sm">Quy luật: Mỗi số gấp đôi số trước (2, 4, 8, 16, 32...)</p>
                      <p className="text-rose-400 font-black text-base mt-1.5">→ Số còn thiếu: <span className="text-lg">8</span></p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-pink-300 flex items-center gap-2 drop-shadow-lg">
                  <span className="text-xl">🎯</span> Mẹo Chơi
                </h2>
                <div className="glass p-4 sm:p-5 rounded-xl border-2 border-pink-500/40 bg-gradient-to-br from-pink-950/20 to-rose-950/20">
                  <ul className="space-y-2.5 text-pink-200/90">
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Xem xét cả số trước và sau vị trí thiếu để tìm quy luật</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Kiểm tra các phép toán cơ bản giữa các số liên tiếp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Thử tính toán từ cả hai phía (trái và phải) của vị trí thiếu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-pink-400 text-base font-black mt-0.5">•</span>
                      <span className="text-sm leading-relaxed">Đảm bảo số bạn chọn phù hợp với toàn bộ dãy số</span>
                    </li>
                  </ul>
                </div>
              </section>

              <div className="flex justify-center pt-5 pb-12">
                <Link
                  href="/missing-number"
                  className="btn-modern flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-500 hover:via-rose-500 hover:to-fuchsia-500 text-white font-black rounded-lg text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-pink-500/60"
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

