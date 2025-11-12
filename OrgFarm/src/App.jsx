import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import WhyOrganic from './pages/WhyOrganic'
import Innovations from './pages/Innovations'
import Fertilizers from './pages/fertilizers'
import Auth from './pages/Auth'
import { AuthProvider } from './context/AuthContext'
import AdminDashboard from "./pages/adminDashboard.jsx";


function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/why-organic" element={<WhyOrganic />} />
          <Route path="/innovations" element={<Innovations />} />
          <Route path="/fetilizers-and-manures" element={<Fertilizers/>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
