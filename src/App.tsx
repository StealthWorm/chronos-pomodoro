import { router } from './routers/MainRouter'
import { RouterProvider } from 'react-router'
import { TaskContextProvider } from './contexts/TaskContext/TaskContextProvider'
import { Message } from './components/Message'
import './styles/theme.css'
import './styles/global.css'

function App() {
  return (
    <TaskContextProvider>
      <Message>
        <RouterProvider router={router} />
      </Message>
    </TaskContextProvider>
  )
}

export default App
