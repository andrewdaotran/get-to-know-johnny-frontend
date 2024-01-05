import { createContext, useContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "typings";
import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";

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
  const windowSize = useWindowSize();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const modalSizeNoRems = {
    mobile: {
      width: "90",
      height: "30",
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
      width:
        windowSize.width < 704 ? modalSizeNoRems.mobile.width + "vw" : "40rem",

      marginLeft:
        windowSize.width < 704
          ? String((100 - Number(modalSizeNoRems.mobile.width)) / 2) + "vw"
          : "",
      marginRight:
        windowSize.width < 704
          ? String((100 - Number(modalSizeNoRems.mobile.width)) / 2) + "vw"
          : "",
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
      marginLeft: windowSize.width >= 704 ? "-20rem" : "-50vw",
      marginTop:
        "-" + String(+Number(modalSizeNoRems.mobile.height) / 2) + "rem",
    },
    tablet: {
      marginLeft:
        "-" + String(Number(modalSizeNoRems.tablet.width) / 2) + "rem",

      marginTop:
        "-" + String(Number(modalSizeNoRems.tablet.height) / 2) + "rem",
    },
    desktop: {
      marginLeft:
        "-" + String(Number(modalSizeNoRems.desktop.width) / 2) + "rem",
      marginTop:
        "-" + String(Number(modalSizeNoRems.desktop.height) / 2) + "rem",
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
