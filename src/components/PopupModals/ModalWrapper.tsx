"use client";
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
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";
import LoginModal from "./LoginModal";

type Props = {};

const ModalWrapper = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyData,
    modalTypeObj,
    modalType,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <div
      className={` relative z-30 flex flex-col gap-4 rounded-md  bg-main text-center duration-700 ease-in-out sm:p-12`}
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

      <div className="border  border-red-700">
        {modalType === modalTypeObj.login && (
          <h3 className="text-2xl">Johnny Login</h3>
        )}
        {modalType === modalTypeObj.submitContact && (
          <h3 className="text-2xl">
            Leave your name and number and Johnny will hit you up 😛
          </h3>
        )}
      </div>

      {modalType === modalTypeObj.login && <LoginModal />}
    </div>
  );
};

export default ModalWrapper;
