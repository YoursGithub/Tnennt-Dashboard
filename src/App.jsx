import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import Login from './pages/Login_page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Dashboard />
  )
}

export default App
