import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "typings";
import WindowSizeContext, { WindowSizeContextType } from "./ScreenSizeContext";

export type SidebarContextType = {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarProvider = ({ children }: ChildrenNodeType) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  useEffect(() => {
    if (screenWidth === "mobile") {
      closeSidebar();
    }
  }, [screenWidth]);

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, openSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
