import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Open from './components/autherisation/Open/Open'
import Register from './components/autherisation/Register/Register'
import SmsCode from './components/autherisation/SmsCode/SmsCode'
import Contacts from './components/autherisation/Contacts/Contacts'
import Finish from './components/autherisation/Finish/Finish'
import Main from './components/main/Main'

function App() {
  return (
    <Router>
      <Routes>
        {/* Маршруты аутентификации */}
        <Route path="/" element={<Open />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sms-code" element={<SmsCode />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/finish" element={<Finish />} />
        
        {/* Маршруты основного приложения */}
        <Route path="/main/*" element={<Main />} />
      </Routes>
    </Router>
  )
}

export default App
