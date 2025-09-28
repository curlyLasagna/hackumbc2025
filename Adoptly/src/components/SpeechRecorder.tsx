import React from 'react';
import { useState, useEffect} from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import './SpeechRecorder.css';
import { FaMicrophone, FaPlus } from 'react-icons/fa';

function SpeechRecorder() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [text, setText] = useState('')
  useEffect(() => {
      setText(transcript);
    }, [transcript]);
  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const handleSave = () => {
    localStorage.setItem('lastTranscript', text);

  };

  const toggleListening = () => {
   
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="recorder-container">
      <h1>Describe Your Ideal Pet</h1>

      <div className="input-bar">
        <span className="icon-left"><FaPlus /></span>
        <input
          type="text"
          placeholder="Tap the mic and share the pet you’re ready to welcome home"
          value={text}
          onChange={(e) => setText(e.target.value)} 
        />
        <button onClick={toggleListening} className="mic-btn">
          <FaMicrophone />
        </button>
      </div>

      <div className="button-group">
        <button onClick={()=>{resetTranscript(); setText('');}}>Reset</button>
        <button onClick={handleSave} >Save</button>
      </div>
    </div>
  );
}

export default SpeechRecorder;
