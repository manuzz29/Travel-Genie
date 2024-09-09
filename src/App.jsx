import { useState } from 'react'
import Header from './components/custom/Header'
import Hero from './components/custom/Hero'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Hero/>
    </>
  )
}

export default App
