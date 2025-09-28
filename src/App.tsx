import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './styles/theme.css'
import './styles/global.css'
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'

function App() {
  return (
    <BrowserRouter>
      <TaskContextProvider>
        <Router />
      </TaskContextProvider>
    </BrowserRouter>
  )
}

export default App
