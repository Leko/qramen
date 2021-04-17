import React from 'react'
import { Brand } from './components/Brand'
import { Footer } from './components/Footer'
import { Scanner } from './components/Scanner'

import './App.css'
import { useScanHistory } from './hooks/scanHistory'

function App() {
  const { history } = useScanHistory()

  return (
    <div className="App">
      <Brand />
      <main className="main">
        <Scanner />
      </main>
      <Footer />
    </div>
  )
}

export default App
