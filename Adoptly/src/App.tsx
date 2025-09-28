import './App.css'
import { OutputCarousel } from './components/OutputCarousel';
import { UserInput } from './components/UserInput';
import { getPetGemini } from './lib/petfinder';
import { getPet } from './lib/petfinder/get-pet';
import { useState } from 'react';
function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [carouselData, setCarouselData] = useState<any[]>([]);

  const handleUserInput = async (prompt: string) => {
    setIsGenerating(true);
    try {
      console.log("Prompt:", prompt);
      const geminiResult = await getPetGemini(prompt);
      const args = geminiResult?.fn?.args;
      console.log(args)
      const petRes = await getPet(args);
      setCarouselData(petRes);
      console.log(carouselData);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <UserInput onSubmit={handleUserInput} isGenerating={isGenerating} />
      {carouselData.length > 0 ? <OutputCarousel animals={carouselData} /> : <div></div>}
    </div >
  );
}

export default App
