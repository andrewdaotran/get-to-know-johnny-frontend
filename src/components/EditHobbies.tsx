import { api } from "andrewdaotran/utils/api";
import React, { useState } from "react";
import IconAndTag from "./IconAndTag";
import StandardButton from "./StandardButton";

// type Props = {

// };

const EditHobbies = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data, isLoading, isError } = api.hobby.getAll.useQuery();

  const trpc = api.useContext();
  return (
    <>
      <h2 className="mx-6 my-4 border border-red-500 text-center">Hobbies</h2>
      <div className="grid">
        <ul className="flex flex-wrap gap-2 px-6 ">
          {data?.map(({ icon, hobby, id }) => {
            return (
              <IconAndTag
                icon={icon}
                hobby={hobby}
                key={id}
                isEditing={isEditing}
              />
            );
          })}
        </ul>
        <StandardButton
          buttonText={!isEditing ? "Edit Hobbies" : "Save Edit"}
          onClick={() => setIsEditing(!isEditing)}
        />
      </div>
    </>
  );
};

export default EditHobbies;
