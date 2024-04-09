import { all } from "axios";
import {
  ChangeEvent,
  FormEvent,
  RefObject,
  createContext,
  useEffect,
  useState,
} from "react";
import { ChildrenNodeType } from "typings";
import { useInterval } from "usehooks-ts";

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
  isJohnnyTyping: boolean;
  johnnyResponseCount: number;
  resetJohnnyResponseCount: () => void;
  updateIfTextFieldFocused: (value: boolean) => void;
};

const ChatboxContext = createContext<ChatboxContextType | null>(null);

export const ChatboxProvider = ({ children }: ChildrenNodeType) => {
  const [userMessage, setUserMessage] = useState<string | null>("");
  // Code to send messages to python code
  const [allMessages, setAllMessages] = useState<ChatMessage[]>([]);
  const [isJohnnyTyping, setIsJohnnyTyping] = useState<boolean>(false);
  // const [isUserInactive, setIsUserInactive] = useState<boolean>(true);

  const [hasSentInactiveMessage, setHasSentInactiveMessage] =
    useState<boolean>(false);
  const [johnnyResponseCount, setJohnnyResponseCount] = useState<number>(0);
  const [isTextFieldFocused, setIsTextFieldFocused] = useState<boolean>(false);
  // let inactiveBool = false;
  let textFieldFocused = false;

  const johnnyMessaging = (isInactiveMessage: boolean) => {
    const johnnyTypeDelay = Math.ceil(Math.random() * 2000 + 1000);

    // change to amountOfDelay * johnnyResponse.length
    const johnnyResponseDelay =
      johnnyTypeDelay + Math.ceil(Math.random() * 2000 + 2000);

    // logic to send message to python code and receive response
    // if user is inactive, send a message to python code for johnny's inactivity message

    setTimeout(() => {
      setIsJohnnyTyping(true);
    }, johnnyTypeDelay);

    // Normal message
    if (!isInactiveMessage) {
      setTimeout(() => {
        setAllMessages((allMessages) => [
          ...allMessages,
          {
            message: "Hello, I am Johnny!", // change to response from python code
            user: "johnny",
            timeStamp: new Date().toLocaleTimeString(),
          },
        ]);
        setIsJohnnyTyping(false);
        if (!isTextFieldFocused || !textFieldFocused)
          setJohnnyResponseCount((prev) => prev + 1);
      }, johnnyResponseDelay);
    }

    // Inactive message
    // if (isInactiveMessage) {
    //   setTimeout(() => {
    //     setAllMessages((allMessages) => [
    //       ...allMessages,
    //       {
    //         message: "Hello, I am inactive", // change to response from python code
    //         user: "johnny",
    //         timeStamp: new Date().toLocaleTimeString(),
    //       },
    //     ]);
    //     setIsJohnnyTyping(false);
    //     setHasSentInactiveMessage((prev) => !prev);
    //     inactiveBool = true;
    //     if (!isTextFieldFocused || !textFieldFocused) {
    //       setJohnnyResponseCount((prev) => prev + 1);
    //     }
    //   }, johnnyResponseDelay);
    // }

    console.log("textfield", isTextFieldFocused);
  };

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

    let hour = new Date().getHours();
    const prepand = hour >= 12 ? "PM" : "AM";
    hour = hour >= 12 ? hour - 12 : hour;
    hour = hour === 0 ? 12 : hour;
    const minutes = new Date().getMinutes();
    const timeStamp = `${hour}:${minutes} ${prepand}`;

    setAllMessages((allMessages) => [
      ...allMessages,
      {
        message: userMessage!,
        user: "user",
        timeStamp,
      },
    ]);
    setUserMessage("");
    textareaRef.current!.textContent = "";
    setJohnnyResponseCount(0);
    johnnyMessaging(false);
  };

  // Check to see if user is inactive

  // const checkForUserInactivity = () => {
  //   const expireTime = localStorage.getItem("expireTime");

  //   if (Number(expireTime) < Date.now()) {
  //     // setIsUserInactive(true);
  //     if (hasSentInactiveMessage === false) {
  //       console.log("IM HERE");
  //       johnnyMessaging(true);
  //     }
  //   }
  // };

  // const updateExpireTime = () => {
  //   // const expireTime = Date.now() + 180000; // 3 min of inactivity
  //   const expireTime = Date.now() + 5000;

  //   localStorage.setItem("expireTime", expireTime.toString());
  // };
  // useEffect to set interval to check for user inactivity

  // useEffect(

  // useEffect to update expire time when user sends a message
  // useEffect(() => {
  //   updateExpireTime();
  // }, [allMessages]);

  // Check to see if user is inactive end

  // Code to receive messages from python code

  const typeUserMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setUserMessage(e.currentTarget.textContent);
    resetJohnnyResponseCount();
  };

  const resetJohnnyResponseCount = () => {
    setJohnnyResponseCount(0);
  };

  const updateIfTextFieldFocused = (value: boolean) => {
    setIsTextFieldFocused(value);
    textFieldFocused = value;
    console.log("value", value);
  };

  return (
    <ChatboxContext.Provider
      value={{
        submitMessage,
        allMessages,
        typeUserMessage,
        isJohnnyTyping,
        johnnyResponseCount,
        resetJohnnyResponseCount,
        updateIfTextFieldFocused,
      }}
    >
      {children}
    </ChatboxContext.Provider>
  );
};

export default ChatboxContext;
