import ChatboxContext, {
  ChatboxContextType,
} from "andrewdaotran/context/ChatboxContext";
import { time } from "andrewdaotran/utils";
import {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  message?: string;
  isLastMessage?: boolean;
  timeStamp?: string;
  user: string;
};

// Needs state to change the rounded shape of messages if messages by the same person are sent in chunks

// When sending User's messages to chatbox api, wait a bit in case user sends multiple messages and concat messages to send the api one message

// When a message gets sent from either side, need to run the time() function individually to get a unique time

const MessageBox = ({ message, isLastMessage, timeStamp, user }: Props) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<boolean>(false);

  const { isJohnnyTyping } = useContext(ChatboxContext) as ChatboxContextType;

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
            : "rounded-bl-none bg-gray-200"
        }`}
      >
        {user !== "typing" && <h2>{message}</h2>}

        {/* Typing Animaiton */}
        {isJohnnyTyping && user === "typing" && (
          <div className="flex gap-1">
            {[0, 0.4, 0.8].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`h-3 w-3 animate-loadingFade rounded-full bg-gray-500 `}
                  style={{ animationDelay: `${item}s` }}
                ></div>
              );
            })}
          </div>
        )}
        {/* Typing Animaiton End */}
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
