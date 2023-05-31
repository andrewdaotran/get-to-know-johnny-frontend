import { api } from "andrewdaotran/utils/api";
import IconAndTag from "./IconAndTag";
import IconAndTagEditableSpan from "./IconAndTagEditableSpan";
import { defaultHobby } from "andrewdaotran/utils";
import { useContext } from "react";
import HobbyContext, {
  HobbyContextType,
} from "andrewdaotran/context/HobbyContext";

// type Props = {

// };

const EditHobbies = () => {
  const { mainDataArray } = useContext(HobbyContext) as HobbyContextType;

  return (
    <>
      <h2 className="mx-6 my-4 border border-red-500 text-center">Hobbies</h2>
      <div className="grid">
        <ul className="flex flex-wrap gap-2 px-6 ">
          {mainDataArray?.map((item) => {
            return (
              <IconAndTag
                isEditing={true}
                key={item.id}
                defaultNewPuck={false}
                {...item}
              />
            );
          })}
          {/* New hobby puck */}
          <IconAndTag
            isEditing={false}
            defaultNewPuck={true}
            {...defaultHobby}
          />
          {/* New hobby puck end */}
        </ul>
      </div>
    </>
  );
};

export default EditHobbies;
