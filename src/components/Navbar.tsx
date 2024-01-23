import React, { useContext } from "react";
import LoginModal from "./LoginModal";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";

import { Bars2Icon } from "@heroicons/react/24/solid";

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
  return (
    <div className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border border-red-500 bg-main px-4">
      <h2>Hello</h2>

      <h3>INSERT APP NAME HERE</h3>

      <div
        className="  grid h-fit w-fit cursor-pointer items-center transition-colors hover:text-appOrange "
        onClick={openLoginModal}
      >
        <Bars2Icon className=" h-10 w-10" />
      </div>
    </div>
  );
};

export default Navbar;
