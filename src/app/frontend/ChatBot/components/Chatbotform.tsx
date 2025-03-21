"use client"
import { ArrowUp } from "lucide-react";
import React, { useRef } from "react";

type ChatbotFormProps = {
  chatHistory: { role: "user" | "model"; text: string }[];
  setChatHistory: React.Dispatch<React.SetStateAction<{ role: "user" | "model"; text: string }[]>>;
  generateBotResponse: (history: { role: "user" | "model"; text: string }[]) => void;
};

const Chatbotform: React.FC<ChatbotFormProps> = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current) return;
    
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;

    inputRef.current.value = "";
    
    // Update chat history with user's message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    
    // Thinking placeholder
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking ..." },
      ]);
      
      // Call the function to generate the response
      generateBotResponse([...chatHistory, { role: "user", text: `Using the details provided above, please address this query: ${userMessage}` }]);
    }, 600);
  };

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        required
        className="message-input"
      />
      <button className="material-symbols-rounded">
        <span className="flex items-center justify-center">
          <ArrowUp/>
        </span>
      </button>
    </form>
  );
};

export default Chatbotform;
