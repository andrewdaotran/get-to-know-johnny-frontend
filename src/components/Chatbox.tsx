import { johnnyNameAndAge } from "andrewdaotran/utils/johnnyInfo";
import { useState, ChangeEvent, useRef, FormEvent } from "react";

import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

import MessageBox from "./MessageBox";

export const Chatbox = () => {
  const [message, setMessage] = useState<string | null>("");

  const textareaRef = useRef<HTMLSpanElement>(null);

  const submitMessage = (e: FormEvent) => {
    e.preventDefault();
    if (textareaRef.current !== null) {
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
      <main className=" flex w-full grow flex-col overflow-auto rounded-lg bg-white">
        {/* Top */}
        <div className="grid grow-0 justify-items-center bg-gray-50 py-4">
          <h1 className="font-semibold">{johnnyNameAndAge}</h1>
          <h2 className="text-sm text-gray-400">Orange County</h2>
        </div>
        {/* Top End */}

        {/* Chat Area */}
        <div className=" mb-2 flex grow flex-col-reverse gap-2 overflow-auto scroll-smooth border-t border-gray-200 px-2 pb-2">
          <MessageBox />
        </div>
        {/* Chat Area End */}

        {/* Message Box */}
        <form onSubmit={submitMessage} className="flex grow-0 gap-2 px-2 pb-4">
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
            <PaperAirplaneIcon className="h-6 w-6 transition-colors hover:text-main" />
          </button>
        </form>
        {/* Message Box End */}
      </main>
    </>
  );
};

export default Chatbox;
