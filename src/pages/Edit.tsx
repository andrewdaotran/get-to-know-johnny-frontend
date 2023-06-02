import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPageContext,
} from "next";

import EditDescriptions from "andrewdaotran/components/EditDescriptions";
import MobileMenu from "andrewdaotran/components/MobileMenu";
import { api } from "andrewdaotran/utils/api";
import { Description } from "typings";
import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { useContext, useEffect } from "react";
import EditHobbies from "andrewdaotran/components/EditHobbies";
import BasicInformation from "andrewdaotran/components/BasicInformation";

type Props = {
  data: Description;
};

const Edit = () => {
  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  useEffect(() => {
    changeMenu(EDIT_ACTION);
  }, []);
  return (
    <>
      <div className=" grid gap-1 bg-secondary px-1 py-2 ">
        <BasicInformation isViewOnly={false} />
        <EditHobbies />
        <EditDescriptions />
      </div>
      <MobileMenu />
    </>
  );
};

export default Edit;
