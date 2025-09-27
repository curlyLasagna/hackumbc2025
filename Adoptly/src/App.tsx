import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpeechRecorder from './components/SpeechRecorder'
import PetGallery from "./components/PetGallery";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpeechRecorder />} />
        <Route path="/gallery" element={<PetGallery />} />
      </Routes>
    </Router>
  )
}

export default App
