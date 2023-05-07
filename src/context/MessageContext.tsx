import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type Messages = {
  user: string;
  answer: string;
};

interface MessageContextInterface {
  messages: Messages[];
  setMessages: Dispatch<SetStateAction<Messages[]>>;
}

const defaultState = {
  messages: [{ user: "", answer: "" }],
  setMessages: (messages: Messages[]) => {},
} as MessageContextInterface;

const MessageContext = createContext<MessageContextInterface>(defaultState);

type MessageProviderProps = {
  children: ReactNode;
};

export const MessageProvider = async ({ children }: MessageProviderProps) => {
  const [messages, setMessages] = useState<Messages[]>([
    {
      user: "",
      answer: "",
    },
  ]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
