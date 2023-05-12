import Image from "next/image";
import React from "react";

// Need to pull descriptions from database so Johnny can edit it anytime

// What im looking for in a person...
//

const Description = () => {
  const johnnyBasicInformation = [
    {
      title: "Height",
      // &apos; to replace '
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
      {/* h-[100vh-5rem] is for mobile to account for the mobile menu */}
      <main className="flex  w-full grow flex-col gap-1 overflow-auto rounded-lg  bg-secondary px-1 py-2">
        {/* Image */}
        {/* <div className="w-36 max-w-full"> */}
        <div className="relative h-auto w-48 self-center border border-red-500">
          <Image
            width="0"
            height="0"
            sizes="100vw"
            className=" h-auto w-48 object-cover"
            src="/images/jungkook2.jpeg"
            alt="Jungkook in place of Johnny"
            priority
          />
        </div>
        {/* </div> */}
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
                <li
                  key={hobby.hobby}
                  className="rounded-2xl bg-secondary px-3 py-1 text-sm"
                >
                  {hobby.icon} {hobby.hobby}
                </li>
              );
            })}
          </ul>
        </div>
        {/* Hobbies End */}

        {/* Aspirations */}
        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          <h2 className="w-fit font-semibold">My aspirations...</h2>
          <p className="text-sm text-grayText">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est sunt,
            pariatur quod cumque ipsum quo, ducimus minima commodi voluptate
            modi sapiente excepturi, praesentium quibusdam assumenda.
          </p>
        </div>
        {/* Aspirations End */}

        {/* What I bring to the tablefor */}
        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          <h2 className="w-fit font-semibold">What I bring to the table...</h2>
          <p className="text-sm text-grayText">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est sunt,
            pariatur quod cumque ipsum quo, ducimus minima commodi voluptate
            modi sapiente excepturi, praesentium quibusdam assumenda.
          </p>
        </div>
        {/* What I bring to the table End */}
        {/* What I'm looking for */}
        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          <h2 className="w-fit font-semibold">What I&apos;m looking for...</h2>
          <p className="text-sm text-grayText">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est sunt,
            pariatur quod cumque ipsum quo, ducimus minima commodi voluptate
            modi sapiente excepturi, praesentium quibusdam assumenda.
          </p>
        </div>
        {/* What I'm looking for End */}

        {/* Deal Breakers */}
        <div className="grid gap-2 rounded-md bg-main px-6 py-4">
          <h2 className="w-fit font-semibold">Deal breakers...</h2>
          <p className="text-sm text-grayText">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Est sunt,
            pariatur quod cumque ipsum quo, ducimus minima commodi voluptate
            modi sapiente excepturi, praesentium quibusdam assumenda.
          </p>
        </div>
        {/* Deal Breakers End */}
      </main>
    </>
  );
};

export default Description;
