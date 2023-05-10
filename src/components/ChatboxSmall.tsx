import { johnnyAge } from "andrewdaotran/utils/johnnyInfo";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import MessageBox from "./MessageBox";

export const ChatboxSmall = () => {
  const [message, setMessage] = useState<string>("");

  const textareaRef = useRef(null);
  const textRowCount = textareaRef ? message.split("\n").length : 0;
  const rows = textRowCount + 1;
  // const rows = textRowCount < 6 ? textRowCount : 6;

  const typeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <main className="mx-16 min-h-screen w-full flex-col rounded-lg border border-black">
      {/* Top */}
      <div className="grid flex-none justify-items-center">
        <h1 className="font-semibold">Johnny, {johnnyAge()}</h1>
        <h2 className="text-sm text-gray-400">Orange County</h2>
      </div>
      {/* Chat Area */}
      <div className=" flex-2 mb-2  flex flex-col-reverse gap-2 overflow-auto scroll-smooth border-t border-gray-200 px-2">
        <MessageBox />
      </div>
      {/* Message Box */}
      <textarea
        className="h-full w-full flex-auto resize-none rounded-xl border bg-gray-100 px-2 py-1 focus:outline-none"
        ref={textareaRef}
        value={message}
        onChange={typeMessage}
        rows={rows}
        placeholder="Message"
      />
    </main>
  );
};

export default ChatboxSmall;
