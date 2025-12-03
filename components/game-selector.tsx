"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface Game {
  id: string
  name: string
  description: string
  gradient: string
  emoji: string
  route: string
}

interface GameSelectorProps {
  games: Game[]
  onSelectGame: (gameId: string) => void
}

export default function GameSelector({ games, onSelectGame }: GameSelectorProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100 p-4 flex flex-col items-center justify-center relative overflow-hidden perspective-1000">
      <motion.div className="absolute inset-0 pointer-events-none" style={{ perspective: "1200px" }}>
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"
          style={{ x: "-50%", y: "-50%" }}
          animate={{
            x: ["-50%", "-40%", "-50%"],
            y: ["-50%", "-40%", "-50%"],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute right-0 top-1/2 w-80 h-80 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-3xl"
          animate={{
            x: ["0%", "-10%", "0%"],
            y: ["-50%", "-40%", "-50%"],
            rotateX: [0, -180, -360],
            rotateY: [0, -180, -360],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
            animate={{
              y: [0, -10, 0],
              rotateX: [0, 2, 0],
              rotateY: [0, -2, 0],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            style={{ perspective: "1000px" }}
          >
            Vui Học Toán
          </motion.h1>
          <motion.p
            className="text-2xl font-bold text-purple-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Khám phá quy luật số cùng các game thú vị!
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-12"
          style={{ perspective: "1200px" }}
        >
          {games.map((game, index) => (
            <motion.div key={game.id} variants={itemVariants} className="h-full" style={{ perspective: "1000px" }}>
              <Link href={game.route}>
                <motion.button
                  onClick={() => onSelectGame(game.id)}
                  whileHover={{
                    scale: 1.08,
                    y: -15,
                    rotateX: 5,
                    rotateY: -5,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`bg-gradient-to-br ${game.gradient} rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all text-white cursor-pointer relative overflow-hidden group w-full h-full depth-card-lg`}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-3xl"
                    animate={{
                      backgroundPosition: ["200% 200%", "0% 0%"],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    style={{ pointerEvents: "none" }}
                  />

                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <motion.div
                      className="text-6xl mb-4 inline-block"
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                        y: [0, -5, 0],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.2 }}
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "500px",
                      }}
                    >
                      {game.emoji}
                    </motion.div>
                    <h2 className="text-3xl font-black mb-4 text-balance">{game.name}</h2>
                    <p className="text-base leading-relaxed font-semibold">{game.description}</p>

                    <motion.div
                      className="mt-8 inline-block bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 font-black text-lg hover:bg-white/50 transition-all shadow-lg"
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                      }}
                      style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)",
                      }}
                    >
                      Chơi Ngay →
                    </motion.div>
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center text-white font-bold text-lg bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-md rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-shadow depth-card"
          style={{
            boxShadow: "0 8px 32px rgba(147, 112, 219, 0.3), 0 0 20px rgba(236, 72, 153, 0.2)",
          }}
        >
          💡 Mẹo: Hãy chơi lần lượt các game để học hỏi và đạt điểm cao!
        </motion.div>
      </motion.div>
    </div>
  )
}
