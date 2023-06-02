import IconAndTag from "./IconAndTag";
import { defaultHobby, defaultIcon } from "andrewdaotran/utils";
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
      <div className="grid gap-2 rounded-md bg-main px-6 py-4">
        <div className="grid">
          <ul className="flex flex-wrap gap-2  ">
            {mainDataArray?.map((item) => {
              return (
                <IconAndTag
                  icon={item.icon}
                  hobby={item.hobby}
                  isEditing={true}
                  id={item.id}
                  key={item.id}
                  defaultNewPuck={false}
                  mainData={item}
                />
              );
            })}
            {/* New hobby puck */}
            <IconAndTag
              isEditing={false}
              defaultNewPuck={true}
              icon={defaultIcon}
              hobby={defaultHobby}
              mainData={{ icon: defaultIcon, hobby: defaultHobby }}
            />
            {/* New hobby puck end */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default EditHobbies;
