import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-scroll";

import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import { useOnClickOutside } from "usehooks-ts";

const Sidebar = () => {
  const { openSidebar, isSidebarOpen, closeSidebar, sidebarNavItems } =
    useContext(SidebarContext) as SidebarContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const { johnnyData, openLoginModal } = useContext(
    LoginModalContext
  ) as LoginModalContextType;

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
        <div className="grid gap-8 ">
          {sidebarNavItems.map((item, index) => {
            return (
              <Link
                key={index}
                className="flex cursor-pointer flex-col gap-2 text-2xl transition-colors duration-500 hover:text-appOrange "
                to={item.linkTo}
                smooth={true}
                duration={1200}
                offset={-80}
              >
                <h3>{item.title.toUpperCase()}</h3>
              </Link>
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
