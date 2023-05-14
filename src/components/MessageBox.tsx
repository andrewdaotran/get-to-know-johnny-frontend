import { time } from "andrewdaotran/utils";
import { MouseEventHandler, useEffect, useRef, useState } from "react";

type Props = {
  isJohnny: boolean;
};

// Needs state to change the rounded shape of messages if messages by the same person are sent in chunks

// When sending User's messages to chatbox api, wait a bit in case user sends multiple messages and concat messages to send the api one message

// When a message gets sent from either side, need to run the time() function individually to get a unique time

const MessageBox = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [displayTime, setDisplayTime] = useState<boolean>(false);

  // const messageRef = useRef(null);

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
      {/* User Box */}
      {/* <div
        // ref={messageRef}
        className="relative w-fit border border-red-500"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setDisplayTime(false);
          setIsHovering(false);
        }}
      > */}
      <div className=" h-fit w-fit max-w-[75%] self-end rounded-3xl rounded-ee-none bg-orange-500 px-4 py-2 text-left text-sm text-white">
        <h2>Lorem</h2>
      </div>
      {/* <p
          className={`absolute left-3 top-3 ${
            displayTime
              ? `block top-${mousePos.y} left-${mousePos.x}`
              : "hidden"
          }  `}
        >
          {mousePos.x}
        </p> */}
      {/* </div> */}
      {/* User Box End */}

      {/* Johnny Box */}
      <div className=" h-fit w-fit max-w-[75%] rounded-3xl rounded-bl-none bg-gray-200 px-4 py-2 text-left  text-sm text-gray-500">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
          nesciunt asperiores excepturi amet quasi?
        </h2>
      </div>
      <div className=" h-fit w-fit max-w-[75%] rounded-3xl rounded-bl-none bg-gray-200 px-4 py-2 text-left  text-sm text-gray-500">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
          nesciunt asperiores excepturi amet quasi?
        </h2>
      </div>
      <div className=" h-fit w-fit max-w-[75%] rounded-3xl rounded-bl-none bg-gray-200 px-4 py-2 text-left  text-sm text-gray-500">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
          nesciunt asperiores excepturi amet quasi?
        </h2>
      </div>
      <div className=" h-fit w-fit max-w-[75%] rounded-3xl rounded-bl-none bg-gray-200 px-4 py-2 text-left  text-sm text-gray-500">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
          nesciunt asperiores excepturi amet quasi?
        </h2>
      </div>
      <div className=" h-fit w-fit max-w-[75%] rounded-3xl rounded-bl-none bg-gray-200 px-4 py-2 text-left  text-sm text-gray-500">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
          nesciunt asperiores excepturi amet quasi?
        </h2>
      </div>
      <div className=" h-fit w-fit max-w-[75%] rounded-3xl rounded-bl-none bg-gray-200 px-4 py-2 text-left  text-sm text-gray-500">
        <h2>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe rerum
          nesciunt asperiores excepturi amet quasi?
        </h2>
      </div>
    </>
  );
};

export default MessageBox;
