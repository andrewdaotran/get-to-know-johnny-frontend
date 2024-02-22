import { all } from "axios";
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  createContext,
  useState,
} from "react";
import { ChildrenNodeType } from "typings";

interface ChatMessage {
  message: string;
  user: string;
  timeStamp: string;
}

export type ChatboxContextType = {
  submitMessage: (
    e: FormEvent,
    textareaRef: RefObject<HTMLSpanElement>
  ) => void;
  allMessages: { message: string; user: string; timeStamp: string }[];
  typeUserMessage: (e: ChangeEvent<HTMLSpanElement>) => void;
};

const ChatboxContext = createContext<ChatboxContextType | null>(null);

export const ChatboxProvider = ({ children }: ChildrenNodeType) => {
  const [userMessage, setUserMessage] = useState<string | null>("");
  // Code to send messages to python code
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);

  const submitMessage = (
    e: FormEvent,
    textareaRef: RefObject<HTMLSpanElement>
  ) => {
    e.preventDefault();
    // if (textareaRef.current !== null) {
    //   textareaRef.current!.textContent = "";
    //   return;
    // }
    if (userMessage?.replaceAll(" ", "").length === 0) return;

    setAllMessages((allMessages) => [
      ...allMessages,
      {
        message: userMessage!,
        user: "user",
        timeStamp: new Date().toLocaleTimeString(),
      },
    ]);
    setUserMessage("");
    textareaRef.current!.textContent = "";

    // logic to send message to python code and receive response

    setTimeout(() => {
      setAllMessages((allMessages) => [
        ...allMessages,
        {
          message: "Hello, I am Johnny!",
          user: "johnny",
          timeStamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 2000);
  };

  // Code to receive messages from python code

  const typeUserMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setUserMessage(e.currentTarget.textContent);
  };

  console.log(userMessage, allMessages);
  return (
    <ChatboxContext.Provider
      value={{ submitMessage, allMessages, typeUserMessage }}
    >
      {children}
    </ChatboxContext.Provider>
  );
};

export default ChatboxContext;
