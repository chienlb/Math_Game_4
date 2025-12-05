"use client"

import GameMenu from "@/components/game-menu"
import SolarSystemBackground from "@/components/solar-system-background"

export default function Home() {
  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10 w-full h-screen overflow-hidden">
        <GameMenu />
      </div>
    </>
  )
}
