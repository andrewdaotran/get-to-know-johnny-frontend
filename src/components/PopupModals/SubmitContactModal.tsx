"use client";

import React, { useContext } from "react";

import { PatternFormat } from "react-number-format";

import { api } from "andrewdaotran/utils/api";
import ContactsContext, {
  ContactsContextType,
} from "andrewdaotran/context/ContactsContext";

const SubmitContactModal = () => {
  const {
    handleContactInfo,
    handlePhoneNumber,
    handleAge,
    handleSubmitContact,
    contactInfo,
  } = useContext(ContactsContext) as ContactsContextType;

  const trpc = api.useContext();

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
