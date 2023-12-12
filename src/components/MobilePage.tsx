import React, { useContext, useEffect } from "react";
import Chatbox from "./Chatbox";
import MobileMenu from "./MobileMenu";
import Bio from "./Bio";
import MobileMenuContext, {
  CHAT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import Gallery from "./Gallery";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";

const MobilePage = () => {
  const windowSize = useWindowSize();
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  // useEffect(() => {
  //   changeMenu(CHAT_ACTION);
  // }, []);

  // May need to figure out a new way to default to chat page as default but maybe not
  console.log(windowSize.width);

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <>
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
        <div className={`grid w-full grid-cols-2 gap-4  bg-white`}>
          <div className="col-start-1 col-end-2 w-1/2 ">
            <Chatbox />
          </div>

          <div className=" col-start-2 col-end-3 ">
            <Bio isEditPage={false} />
            <Gallery />
          </div>
        </div>
      )}
    </>
  );
};

export default MobilePage;
