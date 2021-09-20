import { useState, useEffect } from 'react'

export function useScrollPosition(): [number, boolean] {
  const [scrolling, setScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop)
      setScrolling(e.target.documentElement.scrollTop > scrollTop)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [scrollTop])

  return [scrollTop, scrolling]
}
