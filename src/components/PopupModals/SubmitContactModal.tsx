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

import { NumberFormatValues, PatternFormat } from "react-number-format";

import { toast } from "react-hot-toast";

import {
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import ModalWrapperContext from "andrewdaotran/context/ModalWrapperContext";
import { api } from "andrewdaotran/utils/api";

const SubmitContactModal = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyData,
    changeModalType,
    modalTypeObj,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;

  const trpc = api.useContext();

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    instagramHandle: "",
    age: "",
    horoscope: "",
    funFact: "",
  });

  const handleContactInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handlePhoneNumber = (value: string) => {
    setContactInfo({ ...contactInfo, phoneNumber: value });
  };

  const handleAge = (value: string) => {
    setContactInfo({ ...contactInfo, age: value });
  };

  // Create Contact Mutation
  const { mutate: create } = api.submitContact.createContact.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const handleSubmitContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactInfo.firstName === "") {
      toast.error("First Name is required");
    }
    if (contactInfo.lastName === "") {
      toast.error("Last Name is required");
    }
    if (contactInfo.phoneNumber === "" && contactInfo.instagramHandle === "") {
      toast.error("Phone Number or Instagram Handle is required");
    }
    if (
      (contactInfo.phoneNumber.replaceAll(" ", "").length < 13 &&
        contactInfo.phoneNumber.replaceAll(" ", "").length > 3) ||
      contactInfo.phoneNumber[1] === "1" ||
      contactInfo.phoneNumber[1] === "0"
    ) {
      toast.error("Phone Number is invalid");
    }
    if (contactInfo.age === "") {
      toast.error("Age is required");
    }
    if (contactInfo.horoscope === "") {
      toast.error("Horoscope is required");
    }
    if (contactInfo.funFact === "") {
      toast.error("Fun Fact is required");
    }

    console.log(create(contactInfo));
    closeModal();
    changeModalType(modalTypeObj.closed.type);
  };

  return (
    <form
      className="grid grid-cols-2 gap-4 px-2 text-start"
      onSubmit={(e) => handleSubmitContact(e)}
    >
      {/* Name */}
      <div className="col-start-1 col-end-2 flex flex-col gap-1 ">
        <h4 className="text-sm">
          First Name<span className="text-red-600">*</span>:
        </h4>
        <input
          type="text"
          name="firstName"
          value={contactInfo.firstName}
          placeholder="Gina"
          className="rounded-sm border-b  border-black px-1 pb-2 outline-none"
          onChange={(e) => handleContactInfo(e)}
        />
      </div>
      <div className="col-start-2 col-end-3 flex flex-col gap-1">
        <h4 className="text-sm">
          Last Name<span className="text-red-600">*</span>:
        </h4>
        <input
          type="text"
          name="lastName"
          value={contactInfo.lastName}
          placeholder="Something"
          className="rounded-sm border-b  border-black px-1 pb-2 outline-none"
          onChange={(e) => handleContactInfo(e)}
        />
      </div>
      {/* Phone Number */}
      <div className="col-start-1 col-end-2 flex flex-col gap-1 ">
        <h4 className="text-sm">
          Phone Number<span className="text-red-600">**</span>
        </h4>
        <PatternFormat
          format="(###) ###-####"
          placeholder="(123) 456-7890"
          value={contactInfo.phoneNumber}
          className="border-b  border-black px-1 pb-2 outline-none"
          onValueChange={(value) => handlePhoneNumber(value.formattedValue)}
        />
      </div>
      {/* Instagram Handle */}
      <div className="col-start-2 col-end-3 flex flex-col gap-1">
        <h4 className="text-sm">
          Instagram Handle<span className="text-red-600">**</span>
        </h4>
        <input
          type="text"
          name="instagramHandle"
          value={contactInfo.instagramHandle}
          placeholder="ginaisme"
          className="border-b  border-black px-1 pb-2 outline-none"
          onChange={(e) => handleContactInfo(e)}
        />
      </div>

      <div className="col-start-1 col-end-2 flex flex-col gap-1">
        <h4 className="text-sm">
          Age<span className="text-red-600">*</span>:
        </h4>
        <PatternFormat
          format="##"
          placeholder="24"
          value={contactInfo.age}
          className="border-b  border-black px-1 pb-2 outline-none"
          onValueChange={(value) => handleAge(value.formattedValue)}
        />
      </div>
      <div className="col-start-2 col-end-3 flex flex-col gap-1">
        <h4 className="text-sm">
          Horoscope<span className="text-red-600">*</span>:
        </h4>
        <input
          type="text"
          name="horoscope"
          value={contactInfo.horoscope}
          placeholder="Gemini"
          className="border-b  border-black px-1 pb-2 outline-none"
          onChange={(e) => handleContactInfo(e)}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <h4 className="text-sm">
          Fun Fact<span className="text-red-600">*</span>:
        </h4>
        <input
          type="text"
          name="funFact"
          value={contactInfo.funFact}
          placeholder="I am Radiant in Valorant"
          className="border-b  border-black px-1 pb-2 outline-none"
          onChange={(e) => handleContactInfo(e)}
        />
      </div>
      <button
        className="col-span-2 rounded-sm border  border-appOrange bg-appOrange py-1 pt-2 text-white transition-all duration-500 hover:bg-white hover:text-black"
        type="submit"
      >
        Submit
      </button>
      <div className="flex flex-col gap-1 text-xs">
        <h6 className="text-gray-400">
          <span className="text-red-600">*</span> Required
        </h6>
        <h6 className="text-xs text-gray-400">
          <span className="text-red-600">**</span> One or the other is required
        </h6>
      </div>
    </form>
  );
};

export default SubmitContactModal;
