import React, { useContext, useEffect } from "react";
import Chatbox from "./Chatbox";
import MobileMenu from "./MobileMenu";
import Description from "./Description";
import MobileMenuContext, {
  CHAT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";

const MobilePage = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  useEffect(() => {
    changeMenu(CHAT_ACTION);
  }, []);

  // May need to figure out a new way to default to chat page as default but maybe not

  return (
    <>
      <div className=" flex h-screen flex-col bg-secondary">
        {menu?.isChat && <Chatbox />}
        {menu?.isDescription && <Description />}
        <MobileMenu />
      </div>
    </>
  );
};

export default MobilePage;
