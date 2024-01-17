import { createContext, useContext, useEffect, useState } from "react";
import type { ChildrenNodeType } from "typings";
import BasicInformationContext, {
  BasicInformationContextType,
} from "./BasicInformationContext";
import DescriptionContext, {
  DescriptionContextType,
} from "./DescriptionContext";
import Hobbies from "andrewdaotran/components/BioComponents/Hobbies";
import HobbyContext, { HobbyContextType } from "./HobbyContext";
import { useRouter } from "next/router";

type Menu = {
  isChat: boolean;
  isDescription: boolean;
  isGallery: boolean;
  isEdit: boolean;
};

export const CHAT_ACTION = "Chat";
export const DESCRIPTION_ACTION = "Description";
export const GALLERY_ACTION = "Gallery";
export const EDIT_ACTION = "Edit";

export type MobileMenuContextType = {
  menu: Menu;
  changeMenu: (menuString: string) => void;
  isAllDataLoading: boolean;
};

const defaultMenu = {
  isChat: false,
  isDescription: false,
  isGallery: false,
  isEdit: false,
};

// const defaultState = {
//   menu: defaultMenu,
//   changeMenu: (menuString: string) => {},
// };

// const MobileMenuContext = createContext<MobileMenuContextType>(defaultState);
const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

export const MobileMenuProvider = ({ children }: ChildrenNodeType) => {
  const router = useRouter();

  // Context data to load to change loading state

  const [isAllDataLoading, setIsAllDataLoading] = useState(true);

  const { mainData: basicInformationData } = useContext(
    BasicInformationContext
  ) as BasicInformationContextType;

  const { mainDataArray: descriptionDataArray } = useContext(
    DescriptionContext
  ) as DescriptionContextType;

  const { mainDataArray: hobbyDataArray } = useContext(
    HobbyContext
  ) as HobbyContextType;

  useEffect(() => {
    if (
      basicInformationData?.id &&
      descriptionDataArray[0]?.id &&
      hobbyDataArray[0]?.id
    )
      setIsAllDataLoading(false);
  }, [basicInformationData, descriptionDataArray, hobbyDataArray]);

  // End Context data

  const [menu, setMenu] = useState<Menu>(defaultMenu);

  useEffect(() => {
    if (router.pathname === "/" && menu.isDescription)
      return setMenu({ ...defaultMenu, isDescription: true });
    if (router.pathname === "/" && menu.isGallery)
      return setMenu({ ...defaultMenu, isGallery: true });
    if (router.pathname === "/")
      return setMenu({ ...defaultMenu, isChat: true });
    if (router.pathname === "/edit")
      return setMenu({ ...defaultMenu, isEdit: true });
  }, [router.pathname]);

  const changeMenu = (menuString: string) => {
    if (menuString === CHAT_ACTION) setMenu({ ...defaultMenu, isChat: true });
    if (menuString === DESCRIPTION_ACTION)
      setMenu({ ...defaultMenu, isDescription: true });
    if (menuString === GALLERY_ACTION)
      setMenu({ ...defaultMenu, isGallery: true });
    if (menuString === EDIT_ACTION) setMenu({ ...defaultMenu, isEdit: true });
  };

  return (
    <MobileMenuContext.Provider value={{ menu, changeMenu, isAllDataLoading }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuContext;
