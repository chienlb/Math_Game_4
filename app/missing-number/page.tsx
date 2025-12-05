"use client"

import { useRouter } from "next/navigation"
import MissingNumberGame from "@/components/games/missing-number-game"
import SolarSystemBackground from "@/components/solar-system-background"

export default function MissingNumberPage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10 w-full h-screen overflow-hidden">
        <MissingNumberGame onBack={handleBack} guidePath="/missing-number/guide" />
      </div>
    </>
  )
}

