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
    deleteContact,
  } = useContext(ContactsContext) as ContactsContextType;

  const { closeModal, deletedContact } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const trpc = api.useContext();

  return (
    <>
      <h4 className="my-4 text-grayText">
        This operation cannot be undone. Would you like to proceed?
      </h4>
      <form className="flex justify-center gap-4 px-2 text-start">
        {/* Cancel Button */}
        <button
          className="bg-inherite col-span-2 rounded-sm  border border-appOrange px-12 py-1  text-black transition-all duration-500 "
          onClick={closeModal}
        >
          Cancel
        </button>
        {/* Cancel Button End*/}

        {/* Delete Button */}
        <button
          className="col-span-2 rounded-sm border  border-appOrange bg-appOrange px-12 py-1  text-white transition-all duration-500 "
          onClick={(e) => {
            e.preventDefault();
            deleteContact(deletedContact.id);
            closeModal();
          }}
        >
          Delete
        </button>
        {/* Delete Button End */}
      </form>
    </>
  );
};

export default DeleteContactModal;
