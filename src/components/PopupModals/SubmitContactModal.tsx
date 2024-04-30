"use client";
import LoginModalContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import React, { ChangeEvent, useContext, useState } from "react";
import GoogleButton from "react-google-button";

import { signIn, signOut, useSession } from "next-auth/react";

import { PatternFormat } from "react-number-format";

import {
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import ModalWrapperContext from "andrewdaotran/context/ModalWrapperContext";

const SubmitContactModal = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyData,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;

  const [contactInfo, setContactInfo] = useState({
    name: "",
    phoneNumber: "",
    instagramHandle: "",
    age: "",
    funFact: "",
  });

  const handleContactInfo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "phoneNumber") {
      if (e.target.value.length > 10) {
        return;
      }

      setContactInfo({
        ...contactInfo,
        [e.target.name]: e.target.value.replace(/[^0-9]/g, ""),
      });
    } else {
      setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    }
  };

  console.log(contactInfo);

  const submitContact = () => {};
  return (
    <form className="flex flex-col">
      <div className="flex gap-1">
        <h4>Name:</h4>
        <input
          type="text"
          name="name"
          value={contactInfo.name}
          placeholder="Gina"
          className="rounded-sm border border-black px-1 outline-none"
          onChange={(e) => handleContactInfo(e)}
        />
      </div>
      <div className="flex gap-1">
        <h4>Phone Number:</h4>
        <PatternFormat
          format="(###) ###-####"
          placeholder="(123) 456-7890"
          value={contactInfo.phoneNumber}
          // name: "phoneNumber"÷
          onChange={(e) => handleContactInfo(e)}
        />
        {/* <input
          type="text"
          name="phoneNumber"
          value={contactInfo.phoneNumber}
          placeholder="(123) 456-7890"
          // onKeyDown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
          className="rounded-sm border border-black px-1 outline-none"
          onChange={(e) => handleContactInfo(e)}
        /> */}
      </div>
    </form>
  );
};

export default SubmitContactModal;
