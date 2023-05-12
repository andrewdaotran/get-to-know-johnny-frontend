import React from "react";
import Chatbox from "./Chatbox";
import MobileMenu from "./MobileMenu";
import Description from "./Description";

const MobilePage = () => {
  return (
    <>
      <div className=" flex h-screen flex-col bg-secondary">
        {/* <Chatbox /> */}

        <Description />
        <MobileMenu />
      </div>
    </>
  );
};

export default MobilePage;
