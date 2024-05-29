import { api } from "../utils/api";
import {
  ChangeEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import { ChildrenNodeType, Contact } from "../../typings";

import ModalWrapperContext, {
  ModalWrapperContextType,
} from "./ModalWrapperContext";

export type ContactsContextType = {
  handleContactInfo: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneNumber: (value: string) => void;
  handleAge: (value: string) => void;
  handleSubmitContact: (e: React.FormEvent<HTMLFormElement>) => void;
  contactInfo: Contact;
  contactsArray: Contact[];
};

const ContactsContext = createContext<ContactsContextType | null>(null);

export const ContactsProvider = ({ children }: ChildrenNodeType) => {
  const { closeModal, changeModalType, modalTypeObj } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const trpc = api.useContext();

  // Get All Contacts Query
  const { data } = api.submitContact.getAll.useQuery();

  // Create Contact Mutation
  const { mutate: createContact } = api.submitContact.createContact.useMutation(
    {
      onSettled: async () => {
        await trpc.hobby.invalidate();
      },
    }
  );

  const [contactsArray, setContactsArray] = useState<Contact[]>([]);

  useEffect(() => {
    if (data) {
      setContactsArray([...data]);
    }
  }, [data]);

  const [contactInfo, setContactInfo] = useState<Contact>({
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

    createContact(contactInfo);
    closeModal();
    changeModalType(modalTypeObj.closed.type);
  };

  // Delete Contact Mutation

  const { mutate: deleteContact } = api.submitContact.deleteContact.useMutation(
    {
      onSettled: async () => {
        await trpc.submitContact.invalidate();
      },
    }
  );

  // const handleDeleteContact = (id) => {
  //   id && deleteContact(id);
  // };

  return (
    <ContactsContext.Provider
      value={{
        handleContactInfo,
        handlePhoneNumber,
        handleAge,
        handleSubmitContact,
        contactInfo,
        contactsArray,
      }}
    >
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContext;
