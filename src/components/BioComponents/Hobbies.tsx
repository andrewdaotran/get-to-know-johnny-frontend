import IconAndTag from "./IconAndTag";
import { defaultHobby, defaultIcon } from "andrewdaotran/utils";
import { Hobby } from "typings";

type Props = {
  hobbies: Hobby[];
  isEditPage: boolean;
};

const Hobbies = ({ hobbies, isEditPage }: Props) => {
  return (
    <>
      <ul className="flex flex-wrap gap-2  ">
        {hobbies?.map((hobby) => {
          return (
            <IconAndTag
              key={hobby.hobby}
              id={hobby.id}
              icon={hobby.icon}
              hobby={hobby.hobby}
              isEditPage={isEditPage}
              defaultNewPuck={false}
              mainData={hobby}
            />
          );
        })}
        {/* New hobby puck */}
        <IconAndTag
          isEditPage={false}
          defaultNewPuck={true}
          icon={defaultIcon}
          hobby={defaultHobby}
          mainData={{ icon: defaultIcon, hobby: defaultHobby }}
        />
        {/* New hobby puck end */}
      </ul>
    </>
  );
};

export default Hobbies;
