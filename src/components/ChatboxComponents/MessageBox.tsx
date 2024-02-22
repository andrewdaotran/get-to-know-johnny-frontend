import { time } from "andrewdaotran/utils";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

type Props = {
  message: string;
  isLastMessage: boolean;
  timeStamp: string;
  user: string;
};

// Needs state to change the rounded shape of messages if messages by the same person are sent in chunks

// When sending User's messages to chatbox api, wait a bit in case user sends multiple messages and concat messages to send the api one message

// When a message gets sent from either side, need to run the time() function individually to get a unique time

const MessageBox = ({ message, isLastMessage, timeStamp, user }: Props) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<boolean>(false);

  const messageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (isHovering) {
      setTimeout(() => {
        setDisplayTime(true);
      }, 2000);
    }
  }, [isHovering]);

  return (
    <>
      <div
        className={` h-fit w-fit max-w-[75%]  rounded-3xl  px-4 py-2 text-left text-sm  ${
          user === "user"
            ? "self-end rounded-ee-none bg-appOrange text-white"
            : user === "johnny"
            ? "rounded-bl-none bg-gray-200 text-grayText"
            : ""
        }`}
      >
        <h2>{message}</h2>
      </div>

      {/* timestammp? */}
      <div
        ref={messageRef}
        className="relative w-fit"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setDisplayTime(false);
          setIsHovering(false);
        }}
      >
        <p
          className={`absolute left-3 top-3 ${
            displayTime
              ? `block top-${mousePos.y} left-${mousePos.x}`
              : "hidden"
          }  `}
        >
          {mousePos.x}
        </p>
      </div>
      {/* timestammp? end */}
    </>
  );
};

export default MessageBox;
