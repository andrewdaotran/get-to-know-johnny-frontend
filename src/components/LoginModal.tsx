import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import React, { useContext } from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

const LoginModal = () => {
  const {
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    modalSize,
    modalMargin,
  } = useContext(LoginModalContext) as LoginModalContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <div
      className={` relative  rounded-md border border-red-500 bg-main p-12`}
      style={
        screenWidth === "mobile"
          ? modalSize.mobile
          : screenWidth === "tablet"
          ? modalSize.tablet
          : modalSize.desktop
      }
    >
      LoginModal
      <div className="absolute left-4 top-4">
        <XMarkIcon className=" my-auto h-8 w-8 cursor-pointer text-appOrange transition-colors hover:text-secondary" />
      </div>
    </div>
  );
};

export default LoginModal;
