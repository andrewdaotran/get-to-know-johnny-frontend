import { ReactNode, createContext, useState } from "react";

type MessageProviderProps = {
  children: ReactNode;
};

type Message = {
  user: string;
  answer: string;
};

type MessageContextType = {
  messages: Message[];
  sendMessage: (message: Message) => void;
};

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({ children }: MessageProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
