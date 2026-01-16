"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 600,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || isAnimating) return
    setIsAnimating(true)

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    // Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
      const newTheme = !isDark
      setIsDark(newTheme)
      document.documentElement.classList.toggle("dark")
      localStorage.setItem("theme", newTheme ? "dark" : "light")
      setIsAnimating(false)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    })

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })

    transition.finished.then(() => {
      setIsAnimating(false)
    })

  }, [isDark, duration, isAnimating])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      disabled={isAnimating}
      className={cn(className, isAnimating && "pointer-events-none")}
      {...props}
    >
      <div className="relative w-5 h-5">
        <Sun 
          size={20} 
          className={cn(
            "absolute inset-0 transition-all duration-500",
            isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100 text-orange-500"
          )} 
        />
        <Moon 
          size={20} 
          className={cn(
            "absolute inset-0 transition-all duration-500",
            isDark ? "rotate-0 scale-100 opacity-100 text-blue-400" : "-rotate-90 scale-0 opacity-0"
          )} 
        />
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}