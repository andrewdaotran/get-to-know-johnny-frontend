import React, { useContext } from "react";
import LoginModal from "./LoginModal";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";

import { Bars2Icon } from "@heroicons/react/24/solid";
import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import Image from "next/image";

const Navbar = () => {
  const {
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    modalSize,
    modalMargin,
    johnnyData,
  } = useContext(LoginModalContext) as LoginModalContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const { openSidebar, isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;
  return (
    <div className="fixed left-0 top-0 z-[1] flex h-20 w-full items-center justify-between   bg-main px-4 shadow-sm transition-all duration-700 ease-in-out">
      <Image
        width={66}
        height={66}
        className="justify-start rounded-md"
        src={"/images/johnny_logo.png"}
        alt={"johnny's logo"}
        priority
      />

      <h3>INSERT APP NAME HERE</h3>

      <div
        className="   grid h-fit w-fit cursor-pointer   items-center justify-end transition-all duration-500 hover:text-appOrange"
        // onClick={openLoginModal}
        onClick={isSidebarOpen ? () => {} : openSidebar}
        style={isSidebarOpen ? { transform: "rotate(90deg)" } : {}}
      >
        {/* 'rotate-90 transition-transform duration-500' */}
        <Bars2Icon className=" h-10 w-10" />
      </div>
    </div>
  );
};

export default Navbar;
