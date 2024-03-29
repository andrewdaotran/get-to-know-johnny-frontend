import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";
import { createContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "typings";

export type WindowSizeContextType = {
  screenWidth: string;
  // screenHeight: string;
};

const WindowSizeContext = createContext<WindowSizeContextType | null>(null);

export const WindowSizeProvider = ({ children }: ChildrenNodeType) => {
  // const mobileWidth = 1023;
  // const tabletWidth = 1024;

  const mobileWidth = 897;
  const tabletWidth = 898;
  const desktopWidth = 1536;
  // const mobileWidth = 1179;
  // const tabletWidth = 1180;
  // const desktopWidth = 1728;

  const [screenWidth, setScreenWidth] = useState("mobile");
  // const [screenHeight, setScreenHeight] = useState("mobile");

  const windowSize = useWindowSize();
  useEffect(() => {
    if (windowSize.width >= 0 && windowSize.width < tabletWidth) {
      setScreenWidth("mobile");
    }
    if (windowSize.width >= tabletWidth && windowSize.width < desktopWidth) {
      setScreenWidth("tablet");
    }
    if (windowSize.width >= desktopWidth) {
      setScreenWidth("desktop");
    }
  }, [windowSize.width, windowSize.height]);

  return (
    <WindowSizeContext.Provider value={{ screenWidth }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeContext;
