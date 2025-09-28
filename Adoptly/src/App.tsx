import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PetGallery from "./components/PetGallery";
import { OutputCarousel } from './components/OutputCarousel';
import { UserInput } from './components/UserInput';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserInput />} />
        <Route path="/gallery" element={<PetGallery />} />
        <Route path="/carr" element={<OutputCarousel />} />
      </Routes>
    </Router>
  )
}

export default App
