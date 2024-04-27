import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import React, { Fragment, useContext, useEffect, useRef } from "react";
import { Link as ReactScrollLink, scroller } from "react-scroll";

import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";

import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { useRouter } from "next/router";
import ChatboxContext, {
  ChatboxContextType,
} from "andrewdaotran/context/ChatboxContext";

const Sidebar = () => {
  const router = useRouter();
  const { openSidebar, isSidebarOpen, closeSidebar, sidebarNavItems } =
    useContext(SidebarContext) as SidebarContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const { johnnyData, openModal, modalTypeObj, changeModalType } = useContext(
    ModalWrapperContext
  ) as ModalWrapperContextType;

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { johnnyResponseCount, resetJohnnyResponseCount } = useContext(
    ChatboxContext
  ) as ChatboxContextType;

  // const sidebar = useRef(null);

  // useOnClickOutside(sidebar, closeSidebar);

  const sidebarSmoothScrollToSectionFromEditPage = (linkTo: string) => {
    void (async () => {
      if (menu.isEdit) {
        try {
          await router.push("/");
          scroller.scrollTo(linkTo, {
            duration: 1200,
            smooth: true,
            // containerId: "ContainerElementID",
            offset: -80,
          });
        } catch (error) {
          console.log(error);
        }
      }
      closeSidebar();
    })();
  };

  const navigateToEditPage = () => {
    void (async () => {
      try {
        await router.push("/Edit");
        // await router.push("/edit");
        changeMenu(EDIT_ACTION);
      } catch (error) {
        console.log(error);
      }
      closeSidebar();
    })();
  };

  return (
    <div
      className={`fixed top-0 z-[51] h-screen w-[20rem] bg-main  transition-all duration-700 `}
      style={isSidebarOpen ? { left: "0" } : { left: "-20rem" }}
      // ref={sidebar}
    >
      {/* Relative Wrapper */}
      <div className="relative h-full w-full  px-12 py-10">
        {/* Sidebar Nav Items */}
        <div className="grid gap-8  ">
          {sidebarNavItems.map((item, index) => {
            return (
              <Fragment key={item.title}>
                {/* Map Over Sidebar Items */}
                {item.title !== "Edit Page" && (
                  <div className="relative w-fit ">
                    <ReactScrollLink
                      key={index}
                      className="flex  cursor-pointer flex-col gap-2 text-2xl transition-all duration-500 hover:pl-2 hover:text-appOrange "
                      to={item.linkTo}
                      smooth={true}
                      duration={1200}
                      offset={-80}
                      onClick={() => {
                        sidebarSmoothScrollToSectionFromEditPage(item.linkTo);
                        if (item.title === "Chat") {
                          resetJohnnyResponseCount();
                        }
                      }}
                    >
                      <h3>{item.title.toUpperCase()}</h3>
                    </ReactScrollLink>
                    {johnnyResponseCount > 0 && item.title === "Chat" && (
                      <div className=" absolute -right-5 -top-2 grid h-6 w-6 items-center rounded-full bg-red-400 text-center">
                        {johnnyResponseCount > 9
                          ? "9+"
                          : String(johnnyResponseCount)}
                      </div>
                    )}
                  </div>
                )}
                {/* Map Over Sidebar Items End */}
                {/* Edit Page Button */}
                {item.title === "Edit Page" &&
                johnnyData?.status === "authenticated" ? (
                  <button
                    className="w-fit  text-2xl transition-all duration-500 hover:pl-2 hover:text-appOrange"
                    onClick={navigateToEditPage}
                    style={
                      menu.isEdit
                        ? {
                            color: "rgb(249 115 22)", // appOrange
                            paddingLeft: "0.5rem", // pl-2
                            cursor: "default",
                          }
                        : {}
                    }
                    disabled={menu.isEdit}
                  >
                    {item.title.toUpperCase()}
                  </button>
                ) : null}
                {/* Edit Page Button End */}
              </Fragment>
            );
          })}
          {/* Sidebar Nav Items End */}
        </div>

        {/* Johnny Login Button */}
        <div
          className="fixed bottom-4 left-2 "
          style={isSidebarOpen ? {} : { display: "none" }}
          onClick={() => {
            closeSidebar();
            openModal();
            changeModalType(modalTypeObj.login);
          }}
        >
          <h3
            className="cursor-pointer  py-1 text-sm text-main transition-colors duration-500 hover:text-appOrange "
            style={{ textOrientation: "upright", writingMode: "vertical-rl" }}
          >
            Johnny {johnnyData.id ? "Logout" : "Login"}
          </h3>
        </div>
        {/* Johnny Login Button End */}
      </div>
      {/* Relative Wrapper End */}
    </div>
  );
};

export default Sidebar;
