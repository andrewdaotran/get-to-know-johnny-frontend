"use client";

import React, { useContext } from "react";

import { PatternFormat } from "react-number-format";

import { api } from "andrewdaotran/utils/api";
import ContactsContext, {
  ContactsContextType,
} from "andrewdaotran/context/ContactsContext";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";

const DeleteContactModal = () => {
  const {
    handleContactInfo,
    handlePhoneNumber,
    handleAge,
    handleSubmitContact,
    contactInfo,
  } = useContext(ContactsContext) as ContactsContextType;

  const { closeModal, deleteContact, deletedContact } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const trpc = api.useContext();

  return (
    <form className="grid grid-cols-2 gap-4 px-2 text-start">
      {/* Confirm Delete Button */}
      <button
        className="col-span-2 rounded-sm border  border-appOrange bg-appOrange py-1 pt-2 text-white transition-all duration-500 hover:bg-white hover:text-black"
        onClick={() => deleteContact(deletedContact.id)}
      >
        Confirm
      </button>
      {/* Confirm Delete Button End */}

      {/* Don't Delete Button */}
      <button
        className="col-span-2 rounded-sm border  border-appOrange bg-appOrange py-1 pt-2 text-white transition-all duration-500 hover:bg-white hover:text-black"
        onClick={closeModal}
      >
        Don&apos;t delete
      </button>
      {/* Don't Delete Button End*/}
    </form>
  );
};

export default DeleteContactModal;
