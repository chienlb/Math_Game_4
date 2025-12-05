import { useEffect, useRef, RefObject } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(containerRef: RefObject<HTMLElement | HTMLDivElement | null>) {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [containerRef])

  return mouseRef
}

