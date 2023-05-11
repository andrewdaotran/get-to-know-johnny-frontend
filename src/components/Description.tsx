import React from "react";

// Need to pull descriptions from database so Johnny can edit it anytime

// Im looking for...
// I like... (hobbies)
// What im looking for in a person...
// My aspiraitions...
//

const Description = () => {
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
      {/* h-[100vh-5rem] is for mobile to account for the mobile menu */}
      <main className=" flex h-[100vh-5rem] w-full grow flex-col  gap-1 rounded-lg bg-gray-200 px-1 pt-2">
        {/* Basic Information */}
        <div className=" flex flex-col justify-center gap-2 rounded-md bg-white px-6 py-4 ">
          <h1 className=" w-fit  font-semibold">A little about me...</h1>
          <p className="text-sm text-gray-500">
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
                  } overflow-hidden bg-white p-2 text-sm outline outline-gray-200`}
                  key={info.title}
                >
                  <h2 className="text-gray-500">{info.title}</h2>
                  <h2 className="">{info.description}</h2>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Information Boxes End */}
        {/* Basic Information End */}
        {/* Hobbies */}
        <div className="grid gap-2 rounded-md bg-white px-6 py-4">
          <h2 className="w-fit font-semibold">My hobbies</h2>
          <ul className=" flex flex-wrap gap-2 ">
            {johnnyHobbies.map((hobby) => {
              return (
                <li
                  key={hobby.hobby}
                  className="rounded-2xl bg-gray-200 px-3 py-1 text-sm"
                >
                  {hobby.icon} {hobby.hobby}
                </li>
              );
            })}
          </ul>
        </div>
        {/* Hobbies End */}
      </main>
    </>
  );
};

export default Description;
