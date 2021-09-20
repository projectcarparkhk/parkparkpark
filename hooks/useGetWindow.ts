import { useState, useEffect } from 'react'

export function useGetWindow() {
  const [windowObj, setWindowObj] = useState<Window & typeof globalThis>()
  useEffect(() => {
    if (typeof window !== undefined) {
      setWindowObj(window)
    }
  }, [])

  return windowObj
}
