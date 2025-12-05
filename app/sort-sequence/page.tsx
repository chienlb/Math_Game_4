"use client"

import { useRouter } from "next/navigation"
import SortSequenceGame from "@/components/games/sort-sequence-game"
import SolarSystemBackground from "@/components/solar-system-background"

export default function SortSequencePage() {
  const router = useRouter()

  const handleBack = () => {
    router.push("/")
  }

  return (
    <>
      <SolarSystemBackground />
      <div className="relative z-10 w-full h-screen overflow-hidden">
        <SortSequenceGame onBack={handleBack} guidePath="/sort-sequence/guide" />
      </div>
    </>
  )
}

