import { johnnyNameAndAge } from "andrewdaotran/utils/johnnyInfo";
import Image from "next/image";
import BasicDescriptionBox from "./BasicDescriptionBox";
import IconAndTag from "./IconAndTag";
import { api } from "../utils/api";
import MobileMenuContext, {
  DESCRIPTION_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import { FormEvent, use, useContext, useEffect } from "react";
import BasicInformation from "./BasicInformation";
import DescriptionContext, {
  DescriptionContextType,
} from "andrewdaotran/context/DescriptionContext";
import { Description } from "typings";
// Need to pull descriptions from database so Johnny can edit it anytime

const Description = () => {
  // const {
  //   data: descriptions,
  //   isLoading,
  //   isError,
  // } = api.description.getAll.useQuery();

  const { data: hobbies } = api.hobby.getAll.useQuery();

  const { mutate: edit } = api.description.editDescription.useMutation();

  const editDescription = ({ description, title, id }: Description) => {
    if (id) edit({ id, description, title });
  };

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

  const { mainDataArray } = useContext(
    DescriptionContext
  ) as DescriptionContextType;

  useEffect(() => {
    changeMenu(DESCRIPTION_ACTION);
  }, []);

  return (
    <>
      <main className="flex w-full grow flex-col gap-1 overflow-auto rounded-lg  bg-secondary px-1 py-2">
        {/* Image */}
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
        {/* Image End */}

        <BasicInformation isViewOnly={true} />

        {/* Hobbies */}
        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          <h2 className="w-fit font-semibold">My hobbies...</h2>
          <ul className=" flex flex-wrap gap-2 ">
            {hobbies?.map((hobby) => {
              return (
                <IconAndTag
                  icon={hobby.icon}
                  hobby={hobby.hobby}
                  key={hobby.hobby}
                  isEditing={false}
                  defaultNewPuck={false}
                />
              );
            })}
          </ul>
        </div>
        {/* Hobbies End */}

        {mainDataArray?.map((box, index) => {
          return (
            <BasicDescriptionBox
              id={box.id}
              key={box.id}
              isEditing={false}
              isNewDescription={false}
              mainData={box}
            />
          );
        })}
        {/* {descriptions?.map((box) => {
          return (
            <BasicDescriptionBox
              id={box.id}
              title={box.title}
              description={box.description}
              key={box.id}
              isEditing={false}
              isNewDescription={false}
            />
          );
        })} */}
      </main>
    </>
  );
};

export default Description;
