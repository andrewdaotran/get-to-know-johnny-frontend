import React, { useContext, useEffect } from "react";
import Chatbox from "./Chatbox";
import MobileMenu from "./MobileMenu";
import Bio from "./Bio";
import MobileMenuContext, {
  CHAT_ACTION,
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import Gallery from "./Gallery";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import LoginModal from "./LoginModal";

import Link from "next/link";

const MobilePage = () => {
  const windowSize = useWindowSize();
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const {
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    modalSize,
    modalMargin,
    johnnyData,
  } = useContext(LoginModalContext) as LoginModalContextType;

  // useEffect(() => {
  //   changeMenu(CHAT_ACTION);
  // }, []);

  // May need to figure out a new way to default to chat page as default but maybe not
  console.log(windowSize.width);

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <div className="relative">
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

      {/* Large Screen Edit Button */}
      {screenWidth > "mobile" && (
        <div className=" fixed right-0 top-0 z-10  rounded-md border border-red-500 bg-appOrange p-6 ">
          {johnnyData?.status === "authenticated" && (
            <button
              className=""
              onClick={() => {
                changeMenu(EDIT_ACTION);
              }}
            >
              <Link
                // href={"/Edit"}
                href={"/edit"}
                className={`${menu.isEdit ? "pointer-events-none" : ""}`}
              >
                <h3
                  className={`${
                    menu.isEdit ? "text-main" : ""
                  } mx-auto h-6 w-6`}
                >
                  Edit
                </h3>
              </Link>
            </button>
          )}
        </div>
      )}
      {/* Large Screen Edit Button End */}

      {/* Login Modal Gray Background */}
      {isLoginModalOpen && (
        <div
          className="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50"
          onClick={closeLoginModal}
        ></div>
      )}
      {/* Login Modal Gray Background End */}
      {/* Hidden Login Button */}
      <div
        className="fixed left-0 top-0 z-10 h-20 w-20 rounded-md "
        onClick={openLoginModal}
      ></div>
      {/* Hidden Login Button End */}
      {screenWidth === "mobile" && (
        <div className={`flex h-screen flex-col bg-secondary`}>
          {menu?.isChat && <Chatbox />}
          {menu?.isDescription && <Bio isEditPage={false} />}
          {menu?.isGallery && <Gallery />}
          <MobileMenu />
        </div>
      )}
      {screenWidth === "tablet" && (
        <div className={`flex flex-col gap-4 bg-white`}>
          <Chatbox />
          <Bio isEditPage={false} />
          <Gallery />
        </div>
      )}
      {screenWidth === "desktop" && (
        <div className={`grid w-full grid-cols-2 gap-4 bg-white  2xl:gap-20`}>
          <div className="col-start-1 col-end-2 w-1/2 ">
            <Chatbox />
          </div>

          <div className=" col-start-2 col-end-3 ">
            <Bio isEditPage={false} />
            <Gallery />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePage;
