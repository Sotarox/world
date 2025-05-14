import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Country from './pages/Country'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Country/>
    </>
  )
}

export default App
