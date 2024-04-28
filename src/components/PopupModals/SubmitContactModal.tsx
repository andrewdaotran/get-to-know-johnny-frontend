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
import ModalWrapperContext from "andrewdaotran/context/ModalWrapperContext";

const SubmitContacctModal = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyData,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;
  console.log(johnnyData);
  return (
    <div className="">
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
    </div>
  );
};

export default SubmitContacctModal;
