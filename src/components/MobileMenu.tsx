import {
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import MobileMenuContext, {
  CHAT_ACTION,
  DESCRIPTION_ACTION,
  GALLERY_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { useContext } from "react";

const MobileMenu = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;
  return (
    <>
      {/* Menu Bottom */}
      <div className=" grid min-h-[5rem] w-full grow-0 grid-cols-3 justify-items-center bg-gray-100">
        {/* Chat Button */}
        <button className=" px-12" onClick={() => changeMenu(CHAT_ACTION)}>
          <ChatBubbleLeftRightIcon
            className={`${menu.isChat ? "text-main" : ""} h-6 w-6`}
          />
        </button>
        {/* Chat Button End */}
        {/* Description Button */}
        <button
          className=" px-12"
          onClick={() => changeMenu(DESCRIPTION_ACTION)}
        >
          <DocumentTextIcon
            className={` ${menu.isDescription ? "text-main" : ""} h-6 w-6`}
          />
        </button>
        {/* Description Button End */}
        {/* Gallery Button */}
        <button className=" px-12" onClick={() => changeMenu(GALLERY_ACTION)}>
          <PhotoIcon
            className={`${menu.isGallery ? "text-main" : ""} h-6 w-6`}
          />
        </button>
        {/* Gallery Button End */}
      </div>
      {/* Menu Bottom End*/}
    </>
  );
};

export default MobileMenu;
