import { johnnyNameAndAge } from "andrewdaotran/utils/johnnyInfo";
import {
  useState,
  ChangeEvent,
  useRef,
  FormEvent,
  useEffect,
  useContext,
} from "react";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import MessageBox from "./ChatboxComponents/MessageBox";

import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import ChatboxContext, {
  ChatboxContextType,
} from "andrewdaotran/context/ChatboxContext";
import { all } from "axios";
import EmptyChatModal from "./ChatboxComponents/EmptyChatModal";

export const Chatbox = () => {
  const textareaRef = useRef<HTMLSpanElement>(null);

  const { allMessages, typeUserMessage, submitMessage } = useContext(
    ChatboxContext
  ) as ChatboxContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  // console.log(allMessages);

  return (
    <>
      <main
        className={`   flex w-full max-w-4xl grow flex-col overflow-auto rounded-lg bg-white duration-700 ease-in-out md:h-[50.5rem] 2xl:fixed 2xl:h-full 2xl:w-1/2`}
        style={
          screenWidth === "desktop" ? { height: "calc(100vh - 5rem)" } : {}
        }
        id="chat"
      >
        {/* Top */}
        <div
          className={`grid grow-0 justify-items-center bg-gray-50 py-4 lg:bg-inherit `}
        >
          <h1 className="font-semibold">{johnnyNameAndAge}</h1>
          <h2 className="text-sm text-grayText">Orange County</h2>
        </div>
        {/* Top End */}

        {/* Chat Area */}
        <div className=" mb-2 flex grow flex-col justify-end  overflow-auto scroll-smooth border-t border-gray-200 px-2 pb-2 pt-2">
          {allMessages.length === 0 && <EmptyChatModal />}
          {allMessages.map((message, index, array) => {
            return (
              <MessageBox
                key={index}
                message={message.message}
                isLastMessage={message.user !== array[index + 1]?.user}
                timeStamp={message.timeStamp}
                user={message.user}
              />
            );
          })}
        </div>
        {/* Chat Area End */}

        {/* Message Box */}
        <form
          onSubmit={(e) => submitMessage(e, textareaRef)}
          className="flex grow-0 gap-2 px-2 pb-4"
        >
          <span
            className="block h-fit max-h-40 w-[100%] flex-auto resize-none  overflow-auto scroll-smooth rounded-xl bg-gray-100 p-2 empty:before:text-gray-400 empty:before:content-['Message'] focus:outline-none"
            ref={textareaRef}
            onInput={typeUserMessage}
            placeholder="Message"
            contentEditable
            suppressContentEditableWarning
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                submitMessage(e, textareaRef);
              }
            }}
          />

          <button type="submit" className=" px-2">
            <PaperAirplaneIcon className="h-6 w-6 transition-colors hover:text-appOrange" />
          </button>
        </form>
        {/* Message Box End */}
      </main>
    </>
  );
};

export default Chatbox;
