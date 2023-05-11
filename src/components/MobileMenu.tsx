import {
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Need state to trigger the color of the icons to show which page the user is on

const MobileMenu = () => {
  return (
    <>
      {/* Menu Bottom */}
      <div className="fixed grid h-20 w-full grow-0 grid-cols-3 justify-items-center bg-gray-100">
        <button className=" px-12">
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        </button>
        <button className=" px-12">
          <PhotoIcon className="h-6 w-6" />
        </button>
        <button className=" px-12">
          <DocumentTextIcon className="h-6 w-6" />
        </button>
      </div>
      {/* Menu Bottom End*/}
    </>
  );
};

export default MobileMenu;
