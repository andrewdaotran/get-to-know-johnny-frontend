import { johnnyAge } from "andrewdaotran/utils/johnnyInfo";
import { useState, ChangeEvent, useRef, FormEvent } from "react";
import MessageBox from "./MessageBox";

export const ChatboxSmall = () => {
  const [message, setMessage] = useState<string | null>("");

  const textareaRef = useRef(null);

  const typeMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setMessage(e.currentTarget.textContent);
  };

  return (
    <main className="mx-16 min-h-screen w-full flex-col rounded-lg border border-black">
      {/* Top */}
      <div className="grid flex-none justify-items-center">
        <h1 className="font-semibold">Johnny, {johnnyAge()}</h1>
        <h2 className="text-sm text-gray-400">Orange County</h2>
      </div>
      {/* Top End */}

      {/* Chat Area */}
      <div className=" flex-2 mb-2 flex h-full flex-col-reverse gap-2 overflow-auto scroll-smooth border-t border-gray-200 px-2">
        <MessageBox />
      </div>
      {/* Chat Area End */}

      {/* Message Box */}
      <p className="mx-2">
        <span
          className="block h-fit w-[100%] flex-auto resize-none rounded-xl border bg-gray-100 p-2 empty:before:text-gray-400 empty:before:content-['Message'] focus:outline-none"
          ref={textareaRef}
          onInput={typeMessage}
          placeholder="Message"
          contentEditable
        />
      </p>
      {/* Message Box End */}
    </main>
  );
};

export default ChatboxSmall;
