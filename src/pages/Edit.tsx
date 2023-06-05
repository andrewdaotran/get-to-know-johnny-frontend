import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPageContext,
} from "next";

import EditDescriptions from "andrewdaotran/components/BioComponents/Descriptions";
import MobileMenu from "andrewdaotran/components/MobileMenu";
import { Description as DescriptionType } from "typings";
import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { useContext, useEffect } from "react";
import EditHobbies from "andrewdaotran/components/BioComponents/Hobbies";

import Bio from "andrewdaotran/components/Bio";
import BasicInformation from "andrewdaotran/components/BioComponents/BasicInformation";

type Props = {
  data: DescriptionType;
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
        {/* <BasicInformation isViewOnly={false} />
        <EditHobbies isEditPage={true} />
        <EditDescriptions /> */}
        <Bio isEditPage={true} />
      </div>
      <MobileMenu />
    </>
  );
};

export default Edit;
