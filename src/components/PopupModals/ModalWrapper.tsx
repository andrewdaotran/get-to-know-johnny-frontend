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
import ContactsContext, {
  ContactsContextType,
} from "andrewdaotran/context/ContactsContext";
import Image from "next/image";

// type Props = {};

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
    deletedContact,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;
  console.log(modalType);

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
      <div className="absolute right-6 top-6" onClick={closeModal}>
        <XMarkIcon className=" my-auto h-8 w-8 cursor-pointer text-appOrange transition-colors hover:text-secondary" />
      </div>
      {/* Close Modal Button End*/}

      {/* Modal Image */}

      {modalType === modalTypeObj.deleteContact.type && (
        <Image
          src={modalTypeObj.deleteContact.image}
          width={250}
          height={250}
          className="self-center rounded-md object-cover transition-transform duration-500 ease-in-out "
          alt={"jar-of-hearts"}
          priority
        />
      )}

      {/* Modal Image End  */}

      <div className="flex flex-col gap-4 p-4">
        <h3 className="text-2xl">
          {modalType === modalTypeObj.login.type && modalTypeObj.login.title}
          {modalType === modalTypeObj.submitContact.type &&
            modalTypeObj.submitContact.title}
          {modalType === modalTypeObj.deleteContact.type && (
            <>
              {modalTypeObj.deleteContact.title}
              <span className="text-red-600"> {deletedContact.firstName} </span>
              ?
            </>
          )}
        </h3>

        {modalType === modalTypeObj.login.type && (
          <modalTypeObj.login.component />
        )}

        {modalType === modalTypeObj.submitContact.type && (
          <modalTypeObj.submitContact.component />
        )}

        {modalType === modalTypeObj.deleteContact.type && (
          <modalTypeObj.deleteContact.component />
        )}
      </div>
    </div>
  );
};

export default ModalWrapper;
