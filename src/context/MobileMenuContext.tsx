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

type MobileMenuContextType = {
  menu: Menu;
  changeMenu: (menuString: string) => void;
};

const defaultState = {
  isChat: false,
  isDescription: false,
  isGallery: false,
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export const MobileMenuProvider = ({ children }: ChildrenNodeType) => {
  const [menu, setMenu] = useState<Menu>(defaultState);

  const changeMenu = (menuString: string) => {
    if (menuString === CHAT_ACTION) setMenu({ ...defaultState, isChat: true });
    if (menuString === DESCRIPTION_ACTION)
      setMenu({ ...defaultState, isDescription: true });
    if (menuString === GALLERY_ACTION)
      setMenu({ ...defaultState, isGallery: true });
  };

  return (
    <MobileMenuContext.Provider value={{ menu, changeMenu }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuContext;
