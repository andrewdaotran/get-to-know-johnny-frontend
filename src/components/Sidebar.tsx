import SidebarContext, {
  SidebarContextType,
} from "andrewdaotran/context/SidebarContext";
import React, { useContext, useEffect } from "react";
import useClickOutside from "../CustomHooks/useClickOutside";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";

const Sidebar = () => {
  const { openSidebar, isSidebarOpen, closeSidebar } = useContext(
    SidebarContext
  ) as SidebarContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const domNode = useClickOutside(() => {
    closeSidebar();
  });

  return (
    <div
      className={`fixed top-0 z-[51] h-screen w-[28rem] bg-main px-16 py-10 transition-all duration-700 `}
      style={isSidebarOpen ? { left: "0" } : { left: "-28rem" }}
      ref={domNode}
    >
      Sidebar
    </div>
  );
};

export default Sidebar;
