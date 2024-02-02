import {
  ChangeEvent,
  FormEvent,
  RefObject,
  createContext,
  useState,
} from "react";
import { ChildrenNodeType } from "typings";

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

  const submitMessage = (
    e: FormEvent,
    textareaRef: RefObject<HTMLSpanElement>
  ) => {
    e.preventDefault();
    if (textareaRef.current !== null) {
      textareaRef.current!.textContent = "";
      return;
    }
    setAllMessages([
      ...allMessages,
      {
        message: userMessage!,
        user: "user",
        timeStamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  // Code to receive messages from python code

  const typeUserMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setUserMessage(e.currentTarget.textContent);
  };

  console.log(userMessage);

  const [allMessages, setAllMessages] = useState([
    {
      message: "",
      user: "",
      timeStamp: "",
    },
  ]);
  return (
    <ChatboxContext.Provider
      value={{ submitMessage, allMessages, typeUserMessage }}
    >
      {children}
    </ChatboxContext.Provider>
  );
};

export default ChatboxContext;
