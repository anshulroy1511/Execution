"use client";
import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import Chatbotform from "./components/Chatbotform";
import ChatMessage from "./components/Chatmessage";
import { companyInfo } from "./compantinfo";
import { ChevronDown, MessageSquare, X } from "lucide-react";

interface ChatMessageType {
  hideInChat?: boolean;
  role: "model" | "user";
  text: string;
  isError?: boolean;
}

const ChatBot: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo,
    },
  ]);
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Function to update chat history
  const updateHistory = (text: string, isError: boolean = false) => {
    setChatHistory((prev) => [
      ...prev.filter((msg) => msg.text !== "Thinking ..."),
      { role: "model", text, isError },
    ]);
  };

  const generateBotResponse = async (history: ChatMessageType[]) => {
    // Format chat history for API requests
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: formattedHistory }),
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL as string,
        requestOptions
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || "Something went wrong");
      }
      // Clean and update chatHistory with bot response
      const apiResponse = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponse);
    } catch (error) {
      updateHistory((error as Error).message, true);
    }
  };

  useEffect(() => {
    // Auto-scroll whenever chat history updates
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button onClick={() => setShowChatbot(!showChatbot)} id="chatbot-toggler">
        <span className="material-symbols-rounded">
            <MessageSquare size={24} strokeWidth={2} className="icon" />
        </span>
        <span className="material-symbols-rounded">
            <X size={24} strokeWidth={2} className="icon" />
        </span>
      </button>
      <div className="chatbot-popup">
        {/* Chatbot Header */}
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button
            className="material-symbols-rounded flex justify-center items-center"
            onClick={() => setShowChatbot(!showChatbot)}
          >
            <ChevronDown size={24} strokeWidth={2} />
          </button>
        </div>
        {/* Chatbot Body */}
        <div ref={chatBodyRef} className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there! 👋 <br /> How can I help you today? 🚀
            </p>
          </div>

          {/* Render the chatHistory dynamically */}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        {/* Chatbot Footer */}
        <div className="chat-footer">
          <Chatbotform
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
