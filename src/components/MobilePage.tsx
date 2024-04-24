import React, { useContext } from "react";
import Chatbox from "./Chatbox";
import MobileMenu from "./MobileMenu";
import Bio from "./Bio";
import MobileMenuContext, {
  MobileMenuContextType,
} from "../context/MobileMenuContext";
import Gallery from "./Gallery";
import WindowSizeContext, {
  WindowSizeContextType,
} from "../context/ScreenSizeContext";
import useWindowSize from "../CustomHooks/useWindowSize";
import LoginModalContext, {
  LoginModalContextType,
} from "../context/LoginModalContext";
import LoginModal from "./LoginModal";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import Footer from "./Footer";
import { useScrollPosition } from "andrewdaotran/CustomHooks/useScrollPosition";

const MobilePage = () => {
  const windowSize = useWindowSize();
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const {
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,

    modalMargin,
  } = useContext(LoginModalContext) as LoginModalContextType;

  const { isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;

  // useEffect(() => {
  //   changeMenu(CHAT_ACTION);
  // }, []);

  // May need to figure out a new way to default to chat page as default but maybe not
  console.log(windowSize.width);

  const { scrollPos } = useScrollPosition();

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  console.log("window", window.scrollY);

  return (
    <div
      className=" relative"
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
          className="fixed left-0 top-0  h-full w-full bg-black duration-700 ease-in-out"
          onClick={() => {
            if (isLoginModalOpen || isSidebarOpen) {
              closeLoginModal();
              closeSidebar();
            }
          }}
          style={
            isLoginModalOpen || isSidebarOpen
              ? { opacity: "50%", zIndex: 10 }
              : { opacity: "0%", zIndex: 1, visibility: "hidden" }
          }
        ></div>
      )}

      {/* Gray Background End */}

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
