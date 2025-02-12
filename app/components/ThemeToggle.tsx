"use client"

import { useEffect, useState } from "react"
import type React from "react" // Added import for React

const themes = {
  system: { icon: "bi-circle-half", label: "تلقائي" },
  dark: { icon: "bi-moon-stars-fill", label: "داكن" },
  light: { icon: "bi-sun-fill", label: "فاتح" },
}

const getSystemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")

const ThemeToggle = () => {
  const [theme, setTheme] = useState("system")
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  useEffect(() => {
    const updateTheme = (preference: string) => {
      const appliedTheme = preference === "system" ? getSystemTheme() : preference
      document.documentElement.setAttribute("data-bs-theme", appliedTheme)
    }

    updateTheme(theme)
    localStorage.setItem("theme", theme)

    const systemThemeListener = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        updateTheme("system")
      }
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    mediaQuery.addEventListener("change", systemThemeListener)

    return () => mediaQuery.removeEventListener("change", systemThemeListener)
  }, [theme])

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMenuOpen(!menuOpen)
  }

  const selectTheme = (selectedTheme: string) => {
    setTheme(selectedTheme)
    setMenuOpen(false)
  }

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    if (menuOpen) {
      document.addEventListener("click", closeMenu)
    }
    return () => document.removeEventListener("click", closeMenu)
  }, [menuOpen])

  return (
    <div className="position-relative">
      <button className="theme-toggle btn" aria-label="تغيير المظهر" onClick={toggleMenu}>
        <i className={`bi ${themes[theme as keyof typeof themes].icon}`}></i>
      </button>
      {menuOpen && (
        <div className="theme-menu position-absolute top-100 mt-2 end-0">
          {Object.entries(themes).map(([value, { icon, label }]) => (
            <button key={value} className="theme-menu-item" onClick={() => selectTheme(value)}>
              <i className={`bi ${icon}`}></i> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ThemeToggle

