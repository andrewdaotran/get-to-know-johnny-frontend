import { johnnyAge } from "andrewdaotran/utils/johnnyInfo";
import { useState, ChangeEvent, useRef, useEffect } from "react";

function ChatboxSmall() {
  const [message, setMessage] = useState<string>("");

  const textareaRef = useRef(null);
  const textRowCount = textareaRef ? message.split("\n").length : 0;
  const rows = textRowCount < 6 ? textRowCount : 6;

  const typeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <main className=" h-full w-full border border-black ">
      <div className="grid justify-items-center">
        <h1 className="">Johnny, {johnnyAge()}</h1>
        <h2>Orange County</h2>
      </div>
      <form>
        <textarea
          className="h-max w-full resize-none rounded-xl border bg-gray-100 px-2 focus:outline-none"
          ref={textareaRef}
          value={message}
          onChange={typeMessage}
          rows={rows}
        />
      </form>
    </main>
  );
}

export default ChatboxSmall;
