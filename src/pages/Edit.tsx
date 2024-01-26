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
import LoginModalContext, {
  LoginModalContextType,
} from "../context/LoginModalContext";
import { api } from "../utils/api";
import BasicInformationContext, {
  BasicInformationContextType,
} from "../context/BasicInformationContext";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "andrewdaotran/components/Navbar";
import Sidebar from "andrewdaotran/components/Sidebar";
import LoginModal from "andrewdaotran/components/LoginModal";
import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";

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

  const { johnnyData, isLoginModalOpen, closeLoginModal, modalMargin } =
    useContext(LoginModalContext) as LoginModalContextType;

  const { isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;

  //  Needs loading state
  return (
    <div
      className="relative flex h-screen flex-col bg-secondary"
      style={screenWidth !== "mobile" ? { marginTop: "5rem" } : {}}
    >
      {/* Navbar */}

      {screenWidth !== "mobile" && <Navbar />}
      {/* Navbar End */}

      {/* Sidebar */}
      {screenWidth !== "mobile" && <Sidebar />}
      {/* Sidebar End */}

      {/* Login Modal */}

      {isLoginModalOpen && (
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
            if (isLoginModalOpen || isSidebarOpen) {
              closeLoginModal();
              closeSidebar();
            }
          }}
          style={
            isLoginModalOpen || isSidebarOpen
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
    </div>
  );
};

export default Edit;
