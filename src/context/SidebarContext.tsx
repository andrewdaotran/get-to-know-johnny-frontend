import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "typings";
import WindowSizeContext, { WindowSizeContextType } from "./ScreenSizeContext";
import LoginModalContext, { LoginModalContextType } from "./LoginModalContext";
import { scroller } from "react-scroll";

export type SidebarContextType = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  sidebarNavItems: { title: string; linkTo: string }[];
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: ChildrenNodeType) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const [sidebarNavItems, setSidebarNavItems] = useState([
    { title: "Chat", linkTo: "chat" },
    { title: "Bio", linkTo: "bio" },
    { title: "Gallery", linkTo: "gallery" },
  ]);

  const [currentSidbarLinkTo, setCurrentSidebarLinkTo] = useState("bio");

  const { johnnyData } = useContext(LoginModalContext) as LoginModalContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  useEffect(() => {
    if (screenWidth !== "mobile") {
      scroller.scrollTo("bio", {
        duration: 1200,
        delay: 100,
        smooth: true,
        containerId: currentSidbarLinkTo,
      });
    }
  }, [screenWidth]);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    if (screenWidth === "mobile") {
      closeSidebar();
    }
  }, [screenWidth]);

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar, sidebarNavItems }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
