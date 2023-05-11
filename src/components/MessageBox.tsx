type Props = {
  isJohnny: boolean;
};

// Needs state to change the rounded shape of messages if messages by the same person are sent in chunks

// When sending User's messages to chatbox api, wait a bit in case user sends multiple messages and concat messages to send the api one message

const MessageBox = () => {
  return (
    <>
      {/* User Box */}
      <div className=" h-fit w-fit max-w-[75%] self-end rounded-3xl rounded-ee-none bg-orange-500 px-4 py-2 text-left text-sm text-white">
        <h2>Lorem</h2>
      </div>
      {/* Johnny Box */}
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
