"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Play } from "lucide-react"
import Link from "next/link"

export default function SortSequenceGuidePage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen">
      {/* Fixed background that covers entire viewport - vibrant gradient */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-purple-900 via-indigo-800 via-violet-900 to-purple-800">
        {/* Enhanced gradient overlays for visibility */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(139,92,246,0.4),transparent_45%),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.4),transparent_50%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.3),transparent_60%)] pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-indigo-600/10 pointer-events-none"></div>
      </div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <main className="relative z-10 w-full min-h-full px-3 py-6 sm:px-4 sm:py-10 pb-32">
          <div className="glass-strong p-5 sm:p-6 rounded-2xl max-w-3xl w-full mx-auto border border-purple-400/50 shadow-2xl relative bg-gradient-to-br from-purple-950/70 via-indigo-950/60 to-purple-950/70 backdrop-blur-2xl mb-8">
          <header className="mb-6 flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="btn-modern flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500 text-white rounded-lg font-semibold shadow-lg transition-all duration-200 hover:scale-105 text-xs sm:text-sm"
            >
              <ArrowLeft size={16} />
              <span>Về Trang Chủ</span>
            </button>
          </header>

          <div className="space-y-6">
            <div className="text-center mb-4">
              <div className="text-4xl sm:text-5xl mb-3 animate-bounce-gentle">📊</div>
              <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-300 to-indigo-300 mb-2 drop-shadow-2xl">
                Hướng Dẫn: Sắp Xếp Dãy Số
              </h1>
              <p className="text-purple-200 text-sm sm:text-lg font-semibold">
                Sắp xếp các số theo quy luật tăng dần
              </p>
            </div>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-purple-200 flex items-center gap-2 drop-shadow-lg">
                <span className="text-xl">📋</span> Cách Chơi
              </h2>
              <div className="glass p-4 sm:p-5 rounded-xl border border-purple-500/40 space-y-3 bg-gradient-to-br from-purple-950/60 via-indigo-950/50 to-purple-950/60 shadow-xl">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/80 to-violet-500/80 flex items-center justify-center font-black text-white text-base shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-purple-100 mb-1.5 text-base">Xem các số cần sắp xếp</h3>
                    <p className="text-purple-50/90 text-sm leading-relaxed">
                      Ở phần trên, bạn sẽ thấy các số cần được sắp xếp theo quy luật.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/80 to-violet-500/80 flex items-center justify-center font-black text-white text-base shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-purple-100 mb-1.5 text-base">Chọn số</h3>
                    <p className="text-purple-50/90 text-sm leading-relaxed">
                      Click vào một số để chọn nó. Số được chọn sẽ được đánh dấu.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/80 to-violet-500/80 flex items-center justify-center font-black text-white text-base shadow-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-purple-100 mb-1.5 text-base">Đặt số vào vị trí</h3>
                    <p className="text-purple-50/90 text-sm leading-relaxed">
                      Sau khi chọn số, click vào một vị trí trống trong dãy số ở phần dưới để đặt số đó vào.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/80 to-violet-500/80 flex items-center justify-center font-black text-white text-base shadow-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-purple-100 mb-1.5 text-base">Hoàn thành dãy số</h3>
                    <p className="text-purple-50/90 text-sm leading-relaxed">
                      Lặp lại quá trình cho đến khi tất cả các số được sắp xếp đúng theo quy luật tăng dần.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-purple-200 flex items-center gap-2 drop-shadow-lg">
                <span className="text-xl">💡</span> Ví Dụ
              </h2>
              <div className="glass p-4 sm:p-5 rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-950/60 via-indigo-950/50 to-purple-950/60 shadow-xl">
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30">
                    <p className="text-purple-50/90 mb-1.5 text-sm">
                      Các số cần sắp xếp: <span className="font-black text-purple-200 text-base">7, 3, 9, 1, 5</span>
                    </p>
                    <p className="text-purple-50/90 mb-1.5 text-sm">Quy luật: Sắp xếp theo thứ tự tăng dần</p>
                    <p className="text-violet-300 font-black text-base mt-1.5">
                      → Dãy số đúng: <span className="text-lg">1, 3, 5, 7, 9</span>
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30">
                    <p className="text-purple-50/90 mb-1.5 text-sm">
                      Các số cần sắp xếp: <span className="font-black text-purple-200 text-base">12, 8, 15, 3, 20</span>
                    </p>
                    <p className="text-purple-50/90 mb-1.5 text-sm">Quy luật: Sắp xếp theo thứ tự tăng dần</p>
                    <p className="text-violet-300 font-black text-base mt-1.5">
                      → Dãy số đúng: <span className="text-lg">3, 8, 12, 15, 20</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-purple-200 flex items-center gap-2 drop-shadow-lg">
                <span className="text-xl">🎯</span> Mẹo Chơi
              </h2>
              <div className="glass p-4 sm:p-5 rounded-xl border border-purple-500/40 bg-gradient-to-br from-purple-950/60 via-indigo-950/50 to-purple-950/60 shadow-xl">
                <ul className="space-y-2.5 text-purple-50/90">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-300 text-base font-black mt-0.5">•</span>
                    <span className="text-sm leading-relaxed">Tìm số nhỏ nhất trước và đặt nó vào vị trí đầu tiên</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-300 text-base font-black mt-0.5">•</span>
                    <span className="text-sm leading-relaxed">Sau đó tìm số nhỏ nhất tiếp theo và đặt vào vị trí tiếp theo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-300 text-base font-black mt-0.5">•</span>
                    <span className="text-sm leading-relaxed">Lặp lại quá trình cho đến khi hoàn thành</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-300 text-base font-black mt-0.5">•</span>
                    <span className="text-sm leading-relaxed">Kiểm tra lại dãy số sau khi hoàn thành để đảm bảo đúng</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="flex justify-center pt-5 pb-12">
              <Link
                href="/sort-sequence"
                className="btn-modern flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500 text-white font-black rounded-lg text-base shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-purple-400/60"
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

