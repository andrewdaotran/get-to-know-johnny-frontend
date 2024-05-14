import React, { useContext } from "react";

import { api } from "andrewdaotran/utils/api";
import ContactsContext, {
  ContactsContextType,
} from "andrewdaotran/context/ContactsContext";
import Contact from "./Contact";

const ContactsWrapper = () => {
  const trpc = api.useContext();

  const { contactsArray } = useContext(ContactsContext) as ContactsContextType;

  return (
    <div className="grid gap-4 border border-red-600 bg-white ">
      {contactsArray.map((contact) => {
        return <Contact key={contact.id} {...contact} />;
      })}
    </div>
  );
};

export default ContactsWrapper;
