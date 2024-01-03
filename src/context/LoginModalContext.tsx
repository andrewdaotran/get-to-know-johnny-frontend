import { createContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "typings";

export type LoginModalContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  modalSize: {
    mobile: { width: string; height: string };
    tablet: { width: string; height: string };
    desktop: { width: string; height: string };
  };
  modalMargin: {
    mobile: {
      marginLeft: string;
      marginTop: string;
    };
    tablet: {
      marginLeft: string;
      marginTop: string;
    };
    desktop: {
      marginLeft: string;
      marginTop: string;
    };
  };
};

const LoginModalContext = createContext<LoginModalContextType | null>(null);

export const LoginModalProvider = ({ children }: ChildrenNodeType) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const modalSizeNoRems = {
    mobile: {
      width: "22",
      height: "25",
    },
    tablet: {
      width: "40",
      height: "30",
    },
    desktop: {
      width: "40",
      height: "30",
    },
  };

  const modalSize = {
    mobile: {
      // width: modalSizeNoRems.mobile.width + "rem",
      width: "100vw",
      height: modalSizeNoRems.mobile.height + "rem",
    },
    tablet: {
      width: modalSizeNoRems.tablet.width + "rem",
      height: modalSizeNoRems.tablet.height + "rem",
    },
    desktop: {
      width: modalSizeNoRems.desktop.width + "rem",
      height: modalSizeNoRems.desktop.height + "rem",
    },
  };

  const modalMargin = {
    mobile: {
      // marginLeft:
      //   String("-" + Number(modalSizeNoRems.mobile.width) / 2) + "rem",
      marginLeft: "",
      marginTop:
        String("-" + Number(modalSizeNoRems.mobile.height) / 2) + "rem",
    },
    tablet: {
      // marginLeft: String("-" + Number(modalSizeNoRems.tablet.width) / 2) + "rem",
      marginLeft: "-20rem", // TODO: Fix this 'hack
      marginTop:
        String("-" + Number(modalSizeNoRems.tablet.height) / 2) + "rem",
    },
    desktop: {
      marginLeft:
        String("-" + Number(modalSizeNoRems.desktop.width) / 2) + "rem",
      marginTop:
        String("-" + Number(modalSizeNoRems.desktop.height) / 2) + "rem",
    },
  };

  return (
    <LoginModalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        modalSize,
        modalMargin,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalContext;
