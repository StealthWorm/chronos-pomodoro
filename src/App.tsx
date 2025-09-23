import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import './styles/theme.css'
import './styles/global.css'
import { TasksContextProvider } from './contexts/TasksContext'

function App() {
  return (
    <BrowserRouter>
      <TasksContextProvider>
        <Router />
      </TasksContextProvider>
    </BrowserRouter>
  )
}

export default App
