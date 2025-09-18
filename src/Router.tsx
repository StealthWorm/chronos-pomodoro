import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { History } from './pages/History'
import { Settings } from './pages/Settings'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="404" element={<NotFound />} />
      </Route>
    </Routes>
  )
}