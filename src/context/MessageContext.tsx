import { createContext, useState } from "react";
import { ChildrenNodeType } from "typings";

type Message = {
  user: string;
  answer: string;
  createdAt: string;
};

type MessageContextType = {
  messages: Message[];
  sendMessage: (message: Message) => void;
};

const MessageContext = createContext<MessageContextType | null>(null);

export const MessageProvider = ({ children }: ChildrenNodeType) => {
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
