import { createContext, useState } from "react";
import { ChildrenNodeType } from "typings";

type Menu = {
  isChat: boolean;
  isDescription: boolean;
  isGallery: boolean;
};

export const CHAT_ACTION = "Chat";
export const DESCRIPTION_ACTION = "Description";
export const GALLERY_ACTION = "Gallery";

export type MobileMenuContextType = {
  menu: Menu;
  changeMenu: (menuString: string) => void;
};

const defaultMenu = {
  isChat: false,
  isDescription: false,
  isGallery: false,
};

const defaultState = {
  menu: defaultMenu,
  changeMenu: (menuString: string) => {},
};

const MobileMenuContext = createContext<MobileMenuContextType>(defaultState);

export const MobileMenuProvider = ({ children }: ChildrenNodeType) => {
  const [menu, setMenu] = useState<Menu>(defaultMenu);

  const changeMenu = (menuString: string) => {
    if (menuString === CHAT_ACTION) setMenu({ ...defaultMenu, isChat: true });
    if (menuString === DESCRIPTION_ACTION)
      setMenu({ ...defaultMenu, isDescription: true });
    if (menuString === GALLERY_ACTION)
      setMenu({ ...defaultMenu, isGallery: true });
  };

  return (
    <MobileMenuContext.Provider value={{ menu, changeMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuContext;
