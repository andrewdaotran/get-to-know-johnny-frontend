import { api } from "andrewdaotran/utils/api";
import IconAndTag from "./IconAndTag";
import IconAndTagEditableSpan from "./IconAndTagEditableSpan";
import { defaultHobby, defaultIcon } from "andrewdaotran/utils";

// type Props = {

// };

const EditHobbies = () => {
  const { data, isLoading, isError } = api.hobby.getAll.useQuery();

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
                isEditing={true}
                id={id}
                key={id}
                defaultNewPuck={false}
              />
            );
          })}
          {/* New hobby puck */}
          <IconAndTag
            isEditing={false}
            defaultNewPuck={true}
            icon={defaultIcon}
            hobby={defaultHobby}
          />
          {/* New hobby puck end */}
        </ul>
      </div>
    </>
  );
};

export default EditHobbies;
