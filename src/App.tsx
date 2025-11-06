import { BrowserRouter } from 'react-router-dom'
import Router from './Router'
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'
import { Message } from './components/Message'
import './styles/theme.css'
import './styles/global.css'

function App() {
  return (
    <BrowserRouter>
      <TaskContextProvider>
        <Message>
          <Router />
        </Message>
      </TaskContextProvider>
    </BrowserRouter>
  )
}

export default App
