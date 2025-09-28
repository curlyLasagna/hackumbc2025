import { useState } from "react";
import { MessageInput } from "./ui/message-input";
import { ChatForm } from "./ui/chat";
import { getPetGemini } from "@/lib/petfinder";

export function UserInput() {
  const [userPrompt, setUserPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <ChatForm
      isPending={false}
      handleSubmit={async (event) => {
        event?.preventDefault?.()
        setIsGenerating(true)
        try {
          let parts = await getPetGemini(userPrompt);
          console.log(parts);
          setUserPrompt("")
        } finally {
          setIsGenerating(false);
        }
      }}
    >
      {() => (
        <MessageInput
          placeholder="What kind of pet are you looking for?"
          value={userPrompt}
          onChange={e => setUserPrompt(e.target.value)}
          allowAttachments={false}
          isGenerating={isGenerating}
        ></MessageInput>
      )}
    </ChatForm>
  )
}
