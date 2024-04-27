"use client";
import LoginModalContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import React, { useContext } from "react";
import GoogleButton from "react-google-button";

import { signIn, signOut, useSession } from "next-auth/react";

import {
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const LoginModal = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyData,
  } = useContext(LoginModalContext) as ModalWrapperContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <div
      className={` relative z-30 grid grid-rows-3 gap-4 rounded-md  bg-main duration-700 ease-in-out sm:p-12`}
      style={
        screenWidth === "mobile"
          ? modalSize.mobile
          : screenWidth === "tablet"
          ? modalSize.tablet
          : modalSize.desktop
      }
    >
      {/* Close Modal Button */}
      <div className="absolute left-4 top-4" onClick={closeModal}>
        <XMarkIcon className=" my-auto h-8 w-8 cursor-pointer text-appOrange transition-colors hover:text-secondary" />
      </div>
      {/* Close Modal Button End*/}

      <div>
        {johnnyData?.id ? (
          <button onClick={() => void signOut()}>sign out</button>
        ) : (
          <GoogleButton
            className="mx-auto"
            onClick={() => void signIn("google")}
          />
        )}
      </div>

      {/* Modal Header */}

      {/* Modal Header End */}

      {/* Modal Body */}

      {/* Modal Body End */}
    </div>
  );
};

export default LoginModal;
