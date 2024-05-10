import React, { useContext } from "react";
import LoginModal from "./PopupModals/LoginModal";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import { animateScroll as scroll } from "react-scroll";
import { Bars2Icon } from "@heroicons/react/24/solid";
import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";

import MobileMenuContext, {
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import ChatboxContext, {
  ChatboxContextType,
} from "andrewdaotran/context/ChatboxContext";

const Navbar = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    johnnyData,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const { openSidebar, isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;

  const { menu } = useContext(MobileMenuContext) as MobileMenuContextType;

  const { johnnyResponseCount } = useContext(
    ChatboxContext
  ) as ChatboxContextType;

  return (
    <div className="fixed left-0 top-0 z-[1] flex h-20 w-full items-center justify-between   bg-secondary px-4 shadow-sm transition-all duration-700 ease-in-out">
      {/* Logo */}
      <Link
        href={menu.isEdit ? "/" : ""}
        onClick={
          !menu.isEdit
            ? () => {
                scroll.scrollToTop();
              }
            : () => {
                return;
              }
        }
      >
        <Image
          width={66}
          height={66}
          className="justify-start rounded-2xl"
          src={"/images/johnny_logo.png"}
          alt={"johnny's logo"}
          priority
        />
      </Link>
      {/* Logo End */}
      {/* Center App Name */}
      <Link
        href={menu.isEdit ? "/" : ""}
        onClick={
          !menu.isEdit
            ? () => {
                scroll.scrollToTop();
              }
            : () => {
                return;
              }
        }
      >
        <h3>INSERT APP NAME HERE</h3>
      </Link>

      {/* Center App Name End */}
      <div
        className=" relative grid  h-fit w-fit cursor-pointer items-center   justify-end  transition-all duration-500 "
        // onClick={openLoginModal}
        onClick={openSidebar}
        style={isSidebarOpen ? { transform: "rotate(90deg)" } : {}}
      >
        {/* 'rotate-90 transition-transform duration-500' */}

        <Bars2Icon className=" h-10 w-10 transition-colors duration-500 hover:text-appOrange" />
        {johnnyResponseCount > 0 && (
          <div className=" absolute -right-2 -top-1 grid h-6 w-6 items-center rounded-full bg-red-400 text-center">
            {johnnyResponseCount > 9 ? "9+" : String(johnnyResponseCount)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
