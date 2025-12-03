"use client"

import GameSelector from "@/components/game-selector"

export default function Home() {
  const games = [
    {
      id: "pattern",
      name: "Tìm Quy Luật",
      description: "Tìm quy luật của dãy số và hoàn thành nó",
      gradient: "from-blue-400 to-blue-600",
      emoji: "🔢",
      route: "/pattern-guesser",
    },
    {
      id: "sequence",
      name: "Điền Số Tiếp Theo",
      description: "Nhìn dãy số và điền số tiếp theo",
      gradient: "from-purple-400 to-purple-600",
      emoji: "📊",
      route: "/number-sequence",
    },
    {
      id: "oddone",
      name: "Tìm Số Lạc",
      description: "Tìm số không thuộc quy luật trong dãy",
      gradient: "from-pink-400 to-orange-600",
      emoji: "🎯",
      route: "/odd-one-out",
    },
  ]

  return <GameSelector games={games} onSelectGame={() => {}} />
}
