import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#18181B] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produk" element={<Products />} />
          <Route path="/tentang" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App