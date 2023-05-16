import { johnnyNameAndAge } from "andrewdaotran/utils/johnnyInfo";
import Image from "next/image";
import BasicDescriptionBox from "./BasicDescriptionBox";
import IconAndTag from "./IconAndTag";
import { api } from "../utils/api";
// Need to pull descriptions from database so Johnny can edit it anytime

const Description = () => {
  const {
    data: descriptions,
    isLoading,
    isError,
  } = api.description.getAll.useQuery();

  console.log("stuff", descriptions);

  const johnnyBasicInformation = [
    {
      title: "Height",
      description: `5'8"`,
    },
    {
      title: "Location",
      description: "Orange County",
    },
    {
      title: "Employer",
      description: "Unemployed",
    },
    {
      title: "Religion",
      description: "Buddhist / Catholic",
    },
    {
      title: "Degree",
      description: "Information Systems",
    },
    {
      title: "Job Title",
      description: "Unemployed",
    },
  ];

  const johnnyHobbies = [
    { hobby: "Basketball", icon: "🏀" },
    { hobby: "Gaming", icon: "🎮" },
    { hobby: "Food Adventures", icon: "🍗" },
    { hobby: "Gym", icon: "💪🏼" },
  ];

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

        {/* Basic Information */}
        <div className=" flex flex-col justify-center gap-2 rounded-md bg-main px-6 py-4 ">
          <h1 className=" w-fit  font-semibold">A little about me...</h1>
          <p className="text-sm text-grayText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            corporis laborum architecto obcaecati accusantium sed?
          </p>

          {/* Information Boxes */}
          <ul className="grid grid-cols-3 grid-rows-2  ">
            {johnnyBasicInformation.map((info, index) => {
              return (
                <li
                  className={`${
                    index === 0
                      ? "rounded-tl-md"
                      : index === 2
                      ? "rounded-tr-md"
                      : index === 3
                      ? "rounded-bl-md"
                      : index === 5
                      ? "rounded-br-md"
                      : ""
                  } overflow-hidden bg-main p-2 text-sm outline outline-secondary`}
                  key={info.title}
                >
                  <h2 className="text-grayText">{info.title}</h2>
                  <h2 className="">{info.description}</h2>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Information Boxes End */}
        {/* Basic Information End */}

        {/* Hobbies */}
        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          <h2 className="w-fit font-semibold">My hobbies...</h2>
          <ul className=" flex flex-wrap gap-2 ">
            {johnnyHobbies.map((hobby) => {
              return (
                <IconAndTag
                  icon={hobby.icon}
                  hobby={hobby.hobby}
                  key={hobby.hobby}
                />
              );
            })}
          </ul>
        </div>
        {/* Hobbies End */}

        {descriptions?.map((box) => {
          return (
            <BasicDescriptionBox
              title={box.title}
              description={box.description}
              key={box.id}
            />
          );
        })}
      </main>
    </>
  );
};

export default Description;
