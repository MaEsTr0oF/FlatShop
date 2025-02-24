import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Open from './components/autherisation/Open/Open'
import Register from './components/autherisation/Register/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Open />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
