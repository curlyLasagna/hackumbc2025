import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SpeechRecorder from './components/SpeechRecorder'
import PetGallery from "./components/PetGallery";
import { OutputCarousel } from './components/OutputCarousel';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SpeechRecorder />} />
        <Route path="/gallery" element={<PetGallery />} />
        <Route path="/carr" element= {<OutputCarousel/>}/>
      </Routes>
    </Router>
  )
}

export default App
