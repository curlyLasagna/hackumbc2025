import "./App.css";
import { OutputCarousel } from "./components/OutputCarousel";
import { UserInput } from "./components/UserInput";
import { getPetGemini } from "./lib/petfinder";
import { getPet } from "./lib/petfinder/get-pet";
import { useCallback, useState } from "react";
import type { Animal } from "./types/Animal";

const backgroundImg =
  "https://images.squarespace-cdn.com/content/v1/5e950775bee93b4c91e3d327/5752df7c-0739-4192-abb1-8a18da95a64d/Website+Background.png";


function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [carouselData, setCarouselData] = useState<Animal[]>([]);

  const handleUserInput = async (prompt: string) => {
    setIsGenerating(true);
    try {
      const geminiResult = await getPetGemini(prompt);
      const args = geminiResult?.fn?.args;
      if (args) {
        const petRes = (await getPet(args)) as Animal[];
        setCarouselData(() => [...petRes]);
      }
    } catch (err) {
      console.log(err);
    }

    setIsGenerating(false);
  };

  return (
    <div>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "right bottom",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#e2cf79",
        }}
      />

      <UserInput onSubmit={handleUserInput} isGenerating={isGenerating} />
      <OutputCarousel animals={carouselData} />
    </div>
  );
}

export default App;
