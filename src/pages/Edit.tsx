import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  NextPageContext,
} from "next";

import EditDescriptions from "andrewdaotran/components/EditDescriptions";
import MobileMenu from "andrewdaotran/components/MobileMenu";
import { api } from "andrewdaotran/utils/api";
import { Description } from "typings";

type Props = {
  data: Description;
};

const Edit = () => {
  return (
    <>
      <EditDescriptions />
      <MobileMenu />
    </>
  );
};

export default Edit;
