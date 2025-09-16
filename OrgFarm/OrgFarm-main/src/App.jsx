import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import WhyOrganic from './pages/WhyOrganic'
import Innovations from './pages/Innovations'
import Fertilizers from './pages/fertilizers'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/why-organic" element={<WhyOrganic />} />
        <Route path="/innovations" element={<Innovations />} />
        <Route path="/fetilizers-and-manures" element={<Fertilizers/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
