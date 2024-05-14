import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPageContext,
} from "next";

import EditDescriptions from "../components/BioComponents/Descriptions";
import MobileMenu from "../components/MobileMenu";
import { Description as DescriptionType } from "../../typings";
import MobileMenuContext, {
  EDIT_ACTION,
  CHAT_ACTION,
  MobileMenuContextType,
} from "../context/MobileMenuContext";
import { useContext, useEffect } from "react";
import EditHobbies from "../components/BioComponents/Hobbies";

import Bio from "../components/Bio";
import BasicInformation from "../components/BioComponents/BasicInformation";
import WindowSizeContext, {
  WindowSizeContextType,
} from "../context/ScreenSizeContext";
import Link from "next/link";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "../context/ModalWrapperContext";
import { api } from "../utils/api";
import BasicInformationContext, {
  BasicInformationContextType,
} from "../context/BasicInformationContext";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "andrewdaotran/components/Navbar";
import Sidebar from "andrewdaotran/components/Sidebar";
import LoginModal from "andrewdaotran/components/PopupModals/LoginModal";
import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import ContactsContext, {
  ContactsContextType,
} from "andrewdaotran/context/ContactsContext";
import ContactsWrapper from "andrewdaotran/components/ContactComponents/ContactsWrapper";

type Props = {
  data: DescriptionType;
};

const Edit = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const { johnnyData, isModalOpen, closeModal, modalMargin } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const { isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;

  const { contactsArray } = useContext(ContactsContext) as ContactsContextType;

  console.log(contactsArray);

  //  Needs loading state
  return (
    <div
      className="relative mx-auto flex h-screen max-w-4xl flex-col bg-secondary"
      style={screenWidth !== "mobile" ? { marginTop: "5rem" } : {}}
    >
      {/* Navbar */}

      {screenWidth !== "mobile" && <Navbar />}
      {/* Navbar End */}

      {/* Sidebar */}
      {screenWidth !== "mobile" && <Sidebar />}
      {/* Sidebar End */}

      {/* Login Modal */}

      {isModalOpen && (
        <div
          className="fixed left-1/2 top-1/3 z-20 "
          style={
            screenWidth === "mobile"
              ? modalMargin.mobile
              : screenWidth === "tablet"
              ? modalMargin.tablet
              : modalMargin.desktop
          }
        >
          <LoginModal />
        </div>
      )}
      {/* Login Modal End */}

      {/* Gray Background */}
      {screenWidth !== "mobile" && (
        <div
          className="fixed left-0 top-0 z-10 h-full w-full bg-black duration-700 ease-in-out"
          onClick={() => {
            if (isModalOpen || isSidebarOpen) {
              closeModal();
              closeSidebar();
            }
          }}
          style={
            isModalOpen || isSidebarOpen
              ? { opacity: "50%" }
              : { opacity: "0%", zIndex: -1 }
          }
        ></div>
      )}

      {/* Gray Background End */}

      {/* Edit Page Content */}
      <Bio isEditPage={true} />
      {screenWidth === "mobile" && <MobileMenu />}
      {/* Edit Page Content End */}

      {/* Contacts */}
      <ContactsWrapper />
      {/* Contacts End */}
    </div>
  );
};

export default Edit;
