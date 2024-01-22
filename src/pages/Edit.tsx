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

type Props = {
  data: DescriptionType;
};

const Edit = () => {
  const { menu, changeMenu } = useContext(MobileMenuContext);
  // as MobileMenuContextType;

  const { screenWidth } = useContext(WindowSizeContext);
  // as WindowSizeContextType;

  const { johnnyData } = useContext(LoginModalContext);
  // as LoginModalContextType;

  //  Needs loading state
  return (
    <>
      <div className="relative flex h-screen flex-col bg-secondary ">
        {/* Large Screen Edit Button End */}
        {/* <BasicInformation isViewOnly={false} />
        <EditHobbies isEditPage={true} />
        <EditDescriptions /> */}
        <Bio isEditPage={true} />
        {screenWidth === "mobile" && <MobileMenu />}
      </div>
    </>
  );
};

export default Edit;
