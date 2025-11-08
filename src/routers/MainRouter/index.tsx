import { DefaultLayout } from '../../layouts/DefaultLayout'
import { Home } from '../../pages/Home'
import { History } from '../../pages/History'
import { Settings } from '../../pages/Settings'
import { About } from '../../pages/About'
import { NotFound } from '../../pages/NotFound'
import { createBrowserRouter } from 'react-router'
import { useLocation } from 'react-router'
import { useEffect } from 'react'

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}


function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <DefaultLayout />
    </>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'history', element: <History /> },
      { path: 'settings', element: <Settings /> },
      { path: 'about', element: <About /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])