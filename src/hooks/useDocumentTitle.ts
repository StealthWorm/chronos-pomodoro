import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const routeTitles: Record<string, string> = {
  '/': 'Home - Chronos Pomodoro',
  '/history': 'History - Chronos Pomodoro',
  '/settings': 'Settings - Chronos Pomodoro'
}

export function useDocumentTitle() {
  const location = useLocation()

  useEffect(() => {
    const title = routeTitles[location.pathname] || 'Chronos Pomodoro'
    document.title = title
  }, [location.pathname])

  return { location }
}
