"use client"

import { useEffect } from "react"

export default function VisitorCounter() {
  useEffect(() => {
    fetch("/api/visitor/increment").catch((err) => {
      console.error("Visitor count failed:", err)
    })
  }, [])

  return null
}
