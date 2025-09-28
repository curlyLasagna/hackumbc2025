import './App.css'
import { OutputCarousel, type Animal } from './components/OutputCarousel';
import { UserInput } from './components/UserInput';
import { getPetGemini } from './lib/petfinder';
import { getPet } from './lib/petfinder/get-pet';
import { useState } from 'react';
function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [carouselData, setCarouselData] = useState<Animal[]>([]);

  const handleUserInput = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const geminiResult = await getPetGemini(prompt);
      const args = geminiResult?.fn?.args || [];
      console.log("Prompt", geminiResult);
      const petRes = await getPet(args);
      setCarouselData(petRes);
      console.log("Animals:", carouselData)
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <UserInput onSubmit={handleUserInput} isGenerating={isGenerating} />
    </div>
  );
}

export default App
