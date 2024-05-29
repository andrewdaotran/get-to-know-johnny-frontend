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
    <div className="grid gap-4 bg-white  pb-6">
      <h2 className="px-6 text-xl tracking-wider text-appOrange">Contacts</h2>
      <div className="grid grid-cols-3 gap-4">
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
    </div>
  );
};

export default ContactsWrapper;
