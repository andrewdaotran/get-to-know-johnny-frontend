import { johnnyAge } from "andrewdaotran/utils/johnnyInfo";
import { useState, ChangeEvent, useRef, FormEvent } from "react";

import {
  PaperAirplaneIcon,
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";

import MessageBox from "./MessageBox";

export const ChatboxSmall = () => {
  const [message, setMessage] = useState<string | null>("");

  const textareaRef = useRef<HTMLSpanElement>(null);

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (textareaRef.current !== null) {
      console.log(textareaRef.current.textContent);
      textareaRef.current.textContent = "";
    }
  };

  const typeMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setMessage(e.currentTarget.textContent);
  };

  // Only works inline?
  // const submitOnEnter = (e) => {
  //   if (e.key === "Enter") {
  //     submitMessage(e);
  //   }
  // };

  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <main className="flex h-[100vh-5rem] w-full grow flex-col rounded-lg  bg-white">
          {/* Top */}
          <div className="grid grow-0 justify-items-center bg-gray-50 py-4">
            <h1 className="font-semibold">Johnny, {johnnyAge()}</h1>
            <h2 className="text-sm text-gray-400">Orange County</h2>
          </div>
          {/* Top End */}

          {/* Chat Area */}
          <div className=" mb-2 flex  grow flex-col-reverse gap-2 overflow-auto scroll-smooth border-t border-gray-200 px-2">
            <MessageBox />
          </div>
          {/* Chat Area End */}

          {/* Message Box */}
          <form
            onSubmit={submitMessage}
            className="flex grow-0 gap-2 px-2 pb-4 pt-2"
          >
            <span
              className="block h-fit max-h-40 w-[100%] flex-auto resize-none  overflow-auto scroll-smooth rounded-xl bg-gray-100 p-2 empty:before:text-gray-400 empty:before:content-['Message'] focus:outline-none"
              ref={textareaRef}
              onInput={typeMessage}
              placeholder="Message"
              contentEditable
              suppressContentEditableWarning
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  submitMessage(e);
                }
              }}
            />

            <button type="submit" className=" px-2">
              <PaperAirplaneIcon className="h-6 w-6" />
            </button>
          </form>
          {/* Message Box End */}
        </main>
        {/* Menu Bottom */}
        <div className="grid h-20 w-full grid-cols-3 justify-items-center bg-gray-100">
          <button className="">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </button>
          <button className="">
            <PhotoIcon className="h-6 w-6" />
          </button>
          <button className="">
            <DocumentTextIcon className="h-6 w-6" />
          </button>
        </div>
        {/* Menu Bottom End*/}
      </div>
    </>
  );
};

export default ChatboxSmall;
