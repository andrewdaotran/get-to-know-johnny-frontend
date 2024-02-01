import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";

import { GetServerSideProps } from "next";

import { api } from "andrewdaotran/utils/api";
import MobilePage from "andrewdaotran/components/MobilePage";
import { useContext } from "react";
import MobileMenuContext, {
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import Loading from "andrewdaotran/components/Loading";
import Footer from "andrewdaotran/components/Footer";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";

const Home: NextPage = () => {
  const { isAllDataLoading } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <>
      <Head>
        <title>Johnny Dating App</title>
        <meta name="description" content="Johnny Dating App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className=" relative   flex min-h-screen flex-col items-center justify-center bg-main"
        style={screenWidth !== "mobile" ? { marginBottom: "22rem" } : {}}
      >
        {isAllDataLoading ? (
          <Loading />
        ) : (
          <div className=" relative">
            <>
              <MobilePage />
              {screenWidth !== "mobile" && <Footer />}
            </>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return <></>;
// };

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   // const { data: sessionData } = await api.auth.getSession.useQuery();

//   // if (sessionData?.user) {
//   //   return {
//   //     props: {
//   //       session: sessionData,
//   //     },
//   //   };
//   // }

//   // return {
//   //   redirect: {
//   //     destination: "/api/auth/signin",
//   //     permanent: false,
//   //   },
//   // };

//     const trpc = api.useContext();
//     const { data: basicInformation } = api.basicInformation.get.useQuery();
//     const { data: informationBoxesQuery } =
//       api.basicInformation.getInformationBoxes.useQuery();

//   return {
//     props: {},
//   };
// }
