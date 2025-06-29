"use client";

import { useChat } from '@ai-sdk/react'; // Update import to support RSC and handle streamed UI components
import { Messages } from "./messages";
import { MultimodalInput } from "./multimodal-input";
import { ChatHeader } from "./chat-header";
import { Message } from "ai";
import { saveMessages } from "../actions";

interface ChatProps {
  id: string;
  initialMessages?: Message[];
}

export function Chat({ id, initialMessages = [] }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, data } = useChat({
    initialMessages,
    api: '/api/chat',
    onFinish: async (message) => {
      // Save the completed assistant message
      if (message.role === 'assistant') {
        await saveMessages([message], id);
      }
    },
    onError: async (error) => {
      console.error("Error fetching response:", error);
      // You could add an error message to the chat here if you want
    },
  });

  // Custom submit handler to save user messages
  const customHandleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
         
    // Save user message before submitting
    if (input.trim()) {
      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user" as const,
        content: input.trim(),
      };
           
      // Save user message to database
      await saveMessages([userMessage], id);
    }
         
    // Call the original handleSubmit
    handleSubmit(e);
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-background">
      <ChatHeader chatId={id} />
      <div className="flex-1 overflow-auto">
        <Messages
          isLoading={isLoading}
          messages={messages}
        />
      </div>
      <div className="sticky bottom-0 bg-gradient-to-t from-background to-transparent">
        <div className="mx-auto max-w-3xl px-4 pb-4">
          <MultimodalInput
            value={input}
            onChange={handleInputChange}
            handleSubmit={customHandleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
