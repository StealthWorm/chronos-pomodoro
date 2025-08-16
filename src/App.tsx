import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './styles/theme.css'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
