import { useState } from "react";
import { MessageInput } from "./ui/message-input";
import { ChatForm } from "./ui/chat";

export function UserInput({ onSubmit, isGenerating }: {
  onSubmit: (prompt: string) => void,
  isGenerating: boolean
}) {
  const [userPrompt, setUserPrompt] = useState("");

  const handleSubmit = async (event) => {
    event?.preventDefault?.()
    onSubmit(userPrompt)
    setUserPrompt("")
  }

  return (
    <ChatForm
      isPending={false}
      handleSubmit={handleSubmit}
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
