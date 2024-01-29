import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import React, { Fragment, useContext, useEffect, useRef } from "react";
import { Link as ReactScrollLink, scroller } from "react-scroll";

import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";

import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const { openSidebar, isSidebarOpen, closeSidebar, sidebarNavItems } =
    useContext(SidebarContext) as SidebarContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const { johnnyData, openLoginModal } = useContext(
    LoginModalContext
  ) as LoginModalContextType;

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  // const sidebar = useRef(null);

  // useOnClickOutside(sidebar, closeSidebar);

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
                  <ReactScrollLink
                    key={index}
                    className="flex w-fit cursor-pointer flex-col gap-2 text-2xl transition-all duration-500 hover:pl-2 hover:text-appOrange "
                    to={item.linkTo}
                    smooth={true}
                    duration={1200}
                    offset={-80}
                    onClick={async () => {
                      if (menu.isEdit) {
                        await router.push("/");
                        scroller.scrollTo(item.linkTo, {
                          duration: 1200,
                          smooth: true,
                          // containerId: "ContainerElementID",
                          offset: -80,
                        });
                      }
                      closeSidebar();
                    }}
                  >
                    <h3>{item.title.toUpperCase()}</h3>
                  </ReactScrollLink>
                )}
                {/* Map Over Sidebar Items End */}
                {/* Edit Page Button */}
                {item.title === "Edit Page" &&
                johnnyData?.status === "authenticated" ? (
                  <button
                    className="w-fit  text-2xl transition-all duration-500 hover:pl-2 hover:text-appOrange"
                    onClick={async () => {
                      await router.push("/edit");
                      changeMenu(EDIT_ACTION);
                      closeSidebar();
                    }}
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
            openLoginModal();
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
