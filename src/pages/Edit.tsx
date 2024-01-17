import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPageContext,
} from "next";

import EditDescriptions from "andrewdaotran/components/BioComponents/Descriptions";
import MobileMenu from "andrewdaotran/components/MobileMenu";
import { Description as DescriptionType } from "typings";
import MobileMenuContext, {
  EDIT_ACTION,
  CHAT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { useContext, useEffect } from "react";
import EditHobbies from "andrewdaotran/components/BioComponents/Hobbies";

import Bio from "andrewdaotran/components/Bio";
import BasicInformation from "andrewdaotran/components/BioComponents/BasicInformation";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import Link from "next/link";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import { api } from "andrewdaotran/utils/api";
import BasicInformationContext, {
  BasicInformationContextType,
} from "andrewdaotran/context/BasicInformationContext";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";

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

  const { johnnyData } = useContext(LoginModalContext) as LoginModalContextType;

  //  Needs loading state
  return (
    <>
      <div className="relative flex h-screen flex-col bg-secondary ">
        {/* Large Screen Edit Button */}
        {screenWidth > "mobile" && johnnyData?.status === "authenticated" && (
          <button
            className=" fixed right-0 top-0 z-10  rounded-md border border-red-500 bg-appOrange p-6 transition-colors hover:text-main  "
            onClick={() => changeMenu(CHAT_ACTION)}
          >
            <Link
              href={"/"}
              className={`${menu.isChat ? "pointer-events-none" : ""}`}
            >
              Home
            </Link>
          </button>
        )}

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
