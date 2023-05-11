import React from "react";
import Chatbox from "./Chatbox";
import MobileMenu from "./MobileMenu";
import Description from "./Description";

const MobilePage = () => {
  return (
    <div className="relative flex h-screen flex-col-reverse border border-red-500">
      <Chatbox />

      {/* <Description /> */}
      <MobileMenu />
    </div>
  );
};

export default MobilePage;
