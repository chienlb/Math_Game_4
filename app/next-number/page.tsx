"use client"

import { useRouter } from "next/navigation"
import NextNumberGame from "@/components/games/next-number-game"
import SolarSystemBackground from "@/components/solar-system-background"

export default function NextNumberPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10 w-full h-screen overflow-hidden">
        <NextNumberGame onBack={handleBack} guidePath="/next-number/guide" />
      </div>
    </>
  )
}

