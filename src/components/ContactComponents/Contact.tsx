import React, { use, useContext, useEffect, useState } from "react";
import { Contact as ContactType } from "../../../typings";
import { truncate } from "andrewdaotran/utils";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { api } from "andrewdaotran/utils/api";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";

interface Props extends ContactType {
  isAllTruncated: boolean;
  setIsAllTruncated: (value: boolean) => void;
}

const Contact = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  instagramHandle,
  age,
  horoscope,
  funFact,
  isAllTruncated,
  setIsAllTruncated,
}: Props) => {
  const trpc = api.useContext();

  const { closeModal, changeModalType, modalTypeObj, modalType } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const openDeleteContactModal = () => {};

  const handleSeeMoreOrSeeLess = () => {
    setIsAllTruncated(!isAllTruncated);
  };

  return (
    <div className="relative grid w-72 gap-2 rounded-md border border-black p-4">
      {/* Delete Contact */}
      <div className="absolute right-4 top-4">
        <button
          className=""
          onClick={() => {
            console.log(modalTypeObj.deleteContact.type, modalType);
            changeModalType(modalTypeObj.deleteContact.type);
          }}
        >
          <XMarkIcon className=" my-auto h-8 w-8 cursor-pointer text-appOrange transition-colors hover:text-secondary" />
        </button>
      </div>
      {/* Delete Contact End */}
      <div>
        <h3 className="text-center text-lg font-bold">
          {firstName} {lastName}
        </h3>
        <div className="flex justify-center">
          <p className="text-grayText">
            {age} {horoscope}
          </p>
        </div>
      </div>

      <div>
        <h4 className="font-semibold">Phone Number:</h4>
        <p className="text-grayText">{phoneNumber ? phoneNumber : "None"}</p>
      </div>

      <div>
        <h4 className="font-semibold">Instagram Handle:</h4>
        <p className="text-grayText">
          {instagramHandle ? instagramHandle : "None"}
        </p>
      </div>

      <div>
        <h4 className="font-semibold">Fun Fact:</h4>
        <p className="text-grayText">
          {isAllTruncated && funFact.length > 40
            ? truncate(funFact) + "..."
            : funFact}
        </p>
        {funFact.length > 40 && (
          <button className="text-appOrange" onClick={handleSeeMoreOrSeeLess}>
            {isAllTruncated ? "see more" : "see less"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Contact;
