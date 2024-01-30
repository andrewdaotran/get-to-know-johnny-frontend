import useWindowSize from "../CustomHooks/useWindowSize";
import { createContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "../../typings";

export type LoginButtonContextType = {
  isLoginButton: boolean;
  clickLoginButton: () => void;
};

import React from "react";

const LoginButtonContext = createContext<LoginButtonContextType | null>(null);

export const LoginButtonProvider = ({ children }: ChildrenNodeType) => {
  const [isLoginButton, setisLoginButton] = useState(false);

  const clickLoginButton = () => {
    setisLoginButton(!isLoginButton);
  };

  return (
    <LoginButtonContext.Provider value={{ isLoginButton, clickLoginButton }}>
      {children}
    </LoginButtonContext.Provider>
  );
};
