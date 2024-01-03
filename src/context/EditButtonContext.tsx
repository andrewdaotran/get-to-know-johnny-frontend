import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";
import { createContext, useEffect, useState } from "react";
import { ChildrenNodeType } from "typings";

export type LoginButtonContextType = {
  isLoginButton: boolean;
  clickLoginButton: () => void;
};

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
