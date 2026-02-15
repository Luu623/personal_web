'use client'

import { useState, useEffect, useCallback } from 'react'

const names = ['Xiangyu Lu', '卢翔宇']
const TYPING_SPEED = 100 // ms per character
const DELETING_SPEED = 50 // ms per character
const PAUSE_DURATION = 2000 // pause after typing complete

export default function TypewriterName() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentName = names[currentIndex]
  const nextIndex = (currentIndex + 1) % names.length

  const tick = useCallback(() => {
    if (isPaused) {
      setIsPaused(false)
      setIsDeleting(true)
      return
    }

    if (isDeleting) {
      // Deleting characters
      if (displayText.length === 0) {
        setIsDeleting(false)
        setCurrentIndex(nextIndex)
      } else {
        setDisplayText(displayText.slice(0, -1))
      }
    } else {
      // Typing characters
      if (displayText.length === currentName.length) {
        setIsPaused(true)
      } else {
        setDisplayText(currentName.slice(0, displayText.length + 1))
      }
    }
  }, [displayText, isDeleting, isPaused, currentName, nextIndex])

  useEffect(() => {
    const speed = isPaused ? PAUSE_DURATION : isDeleting ? DELETING_SPEED : TYPING_SPEED
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, isPaused, isDeleting])

  return (
    <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
      Hi, I'm {displayText}
      <span className="animate-blink ml-0.5 inline-block h-8 w-[3px] bg-current align-middle sm:h-9" />
    </h1>
  )
}
