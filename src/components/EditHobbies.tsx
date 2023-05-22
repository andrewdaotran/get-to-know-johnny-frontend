import { api } from "andrewdaotran/utils/api";
import React from "react";
import IconAndTag from "./IconAndTag";

const EditHobbies = () => {
  const { data, isLoading, isError } = api.hobby.getAll.useQuery();

  const trpc = api.useContext();
  return (
    <>
      <h2 className="mx-6 my-4 border border-red-500 text-center">Hobbies</h2>
      <ul className="flex flex-wrap gap-2 px-6 ">
        {data?.map(({ icon, hobby, id }) => {
          return <IconAndTag icon={icon} hobby={hobby} key={id} />;
        })}
      </ul>
    </>
  );
};

export default EditHobbies;
