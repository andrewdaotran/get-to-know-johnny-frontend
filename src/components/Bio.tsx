import { johnnyNameAndAge } from "andrewdaotran/utils/johnnyInfo";
import Image from "next/image";
import { api } from "../utils/api";
import MobileMenuContext, {
  DESCRIPTION_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { useContext, useEffect } from "react";
import BasicInformation from "./BioComponents/BasicInformation";
import Hobbies from "./BioComponents/Hobbies";
import Descriptions from "./BioComponents/Descriptions";
import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";

type Props = {
  isEditPage: boolean;
};

const Bio = ({ isEditPage }: Props) => {
  const windowSize = useWindowSize();
  const { data: hobbies } = api.hobby.getAll.useQuery();

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  // useEffect(() => {
  //   changeMenu(DESCRIPTION_ACTION);
  // }, []);

  return (
    <>
      <main
        className={` flex w-full grow flex-col gap-1   rounded-lg px-1 py-2  lg:bg-white  `}
        style={
          screenWidth === "mobile" ? { height: "100vh", overflow: "auto" } : {}
        }
        id="bio"
      >
        <div className="mt-[-5rem] border border-red-500 pt-20 opacity-0"></div>
        {/* Image */}
        {!isEditPage && (
          <div className="relative  min-h-[33rem]  w-full max-w-4xl self-center rounded-md">
            <Image
              fill
              className="rounded-md object-cover object-top"
              src="/images/jungkook2.jpeg"
              alt="Jungkook in place of Johnny"
              priority
            />
            <div className="absolute bottom-8 left-4 grid ">
              <h2 className=" flex align-middle font-semibold text-white">
                {johnnyNameAndAge}
              </h2>
              <h3 className="text-sm text-main">Lorem, ipsum dolor.</h3>
            </div>
          </div>
        )}
        {/* Image End */}

        <BasicInformation isEditPage={isEditPage} />

        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          {isEditPage ? (
            <h2 className="pb-2 text-xl tracking-wider text-appOrange">
              Hobbies
            </h2>
          ) : (
            <h2 className="w-fit font-semibold">My hobbies...</h2>
          )}

          {hobbies && <Hobbies hobbies={hobbies} isEditPage={isEditPage} />}
        </div>

        <Descriptions isEditPage={isEditPage} />
      </main>
    </>
  );
};

export default Bio;
