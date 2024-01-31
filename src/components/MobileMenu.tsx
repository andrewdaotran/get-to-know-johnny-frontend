import {
  PhotoIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import MobileMenuContext, {
  CHAT_ACTION,
  DESCRIPTION_ACTION,
  EDIT_ACTION,
  GALLERY_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import Link from "next/link";
import { useContext } from "react";

const MobileMenu = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { johnnyData } = useContext(LoginModalContext) as LoginModalContextType;
  return (
    <>
      {/* Menu Bottom */}
      <div className="grid min-h-[5rem] w-screen grow-0 grid-flow-col  bg-gray-100   ">
        {/* Chat Button */}
        <button className="   " onClick={() => changeMenu(CHAT_ACTION)}>
          <Link
            href={"/"}
            className={`${menu.isChat ? "pointer-events-none" : ""}`}
          >
            <ChatBubbleLeftRightIcon
              className={`${
                menu.isChat ? "text-appOrange" : ""
              } mx-auto h-6 w-6 `}
            />
          </Link>
        </button>
        {/* Chat Button End */}
        {/* Description Button */}
        <button className=" " onClick={() => changeMenu(DESCRIPTION_ACTION)}>
          <Link
            href={"/"}
            className={`${menu.isDescription ? "pointer-events-none" : ""}`}
          >
            <DocumentTextIcon
              className={` ${
                menu.isDescription ? "text-appOrange" : ""
              } mx-auto h-6 w-6`}
            />
          </Link>
        </button>
        {/* Description Button End */}
        {/* Gallery Button */}
        <button className="  " onClick={() => changeMenu(GALLERY_ACTION)}>
          <Link
            href={"/"}
            className={`${menu.isGallery ? "pointer-events-none" : ""}`}
          >
            <PhotoIcon
              className={`${
                menu.isGallery ? "text-appOrange" : ""
              } mx-auto h-6 w-6`}
            />
          </Link>
        </button>
        {/* Gallery Button End */}

        {/* Edit Button */}
        {johnnyData?.status === "authenticated" && (
          <button
            className=""
            onClick={() => {
              changeMenu(EDIT_ACTION);
            }}
          >
            <Link
              href={"/Edit"}
              // href={"/edit"}
              className={`${menu.isEdit ? "pointer-events-none" : ""}`}
            >
              {/* <Link href={menu.isEdit ? "#" : "/edit"}> */}
              <PencilSquareIcon
                className={`${
                  menu.isEdit ? "text-appOrange" : ""
                } mx-auto h-6 w-6`}
              />
            </Link>
          </button>
        )}

        {/* Edit Button End */}
      </div>
      {/* Menu Bottom End*/}
    </>
  );
};

export default MobileMenu;
