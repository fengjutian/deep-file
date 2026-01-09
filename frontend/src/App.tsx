import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Workbench from './pages/workbench'
import  WorkflowVersion from './pages/workflow-version'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='app-ctx'>
        <WorkflowVersion />
        <div className='workbench-ctx'>
          <Workbench />
        </div>
      </div>
    </>
  )
}

export default App
