import React, { useContext, useEffect, useState } from "react";

import { api } from "andrewdaotran/utils/api";
import ContactsContext, {
  ContactsContextType,
} from "andrewdaotran/context/ContactsContext";
import Contact from "./Contact";

const ContactsWrapper = () => {
  const trpc = api.useContext();

  const { contactsArray } = useContext(ContactsContext) as ContactsContextType;

  const [isAllTruncated, setIsAllTruncated] = useState(true);

  return (
    <div className="flex gap-4 border border-red-600 bg-white ">
      {contactsArray.map((contact) => {
        return (
          <Contact
            key={contact.id}
            {...contact}
            isAllTruncated={isAllTruncated}
            setIsAllTruncated={setIsAllTruncated}
          />
        );
      })}
    </div>
  );
};

export default ContactsWrapper;
