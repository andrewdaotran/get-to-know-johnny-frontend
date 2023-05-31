import {
  CheckCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { api } from "andrewdaotran/utils/api";
import { ChangeEvent, useContext, useRef, useState } from "react";
import IconAndTagEditableSpan from "./IconAndTagEditableSpan";
import HobbyContext, {
  HobbyContextType,
} from "andrewdaotran/context/HobbyContext";
import { Hobby } from "typings";
import { defaultHobby, defaultIcon } from "andrewdaotran/utils";

type Props = {
  isEditing: boolean;
  defaultNewPuck: boolean;
  hobby: string;
  icon: string;
  id?: string;
  mainData: Hobby;
};

const IconAndTag = ({ isEditing, defaultNewPuck, hobby, icon, id }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMakingNewPuck, setIsMakingNewPuck] = useState(false);
  const [isHobbySubmitted, setIsHobbySubmitted] = useState(false);
  const [newIcon, setNewIcon] = useState<string>(defaultIcon);
  const [newHobby, setNewHobby] = useState<string>(defaultHobby);

  const {
    mainDataArray,
    setMainDataArray,
    editHobby,
    createHobby,
    removeHobby,
  } = useContext(HobbyContext) as HobbyContextType;

  const iconRef = useRef<HTMLSpanElement>(null);
  const hobbyRef = useRef<HTMLSpanElement>(null);

  const edit = () => {
    const success = editHobby({ id, hobby, icon });
    if (success) {
      setIsHobbySubmitted(true);
      setIsFocused(false);
      setTimeout(() => {
        setIsHobbySubmitted(false);
      }, 2000);
    }
  };

  const create = () => {
    const success = createHobby({ icon: newIcon, hobby: newHobby });
    if (success) {
      setNewIcon(defaultIcon);
      setNewHobby(defaultHobby);
      setIsMakingNewPuck(false);
    }
  };

  const remove = () => {
    if (id) removeHobby(id);
  };

  const typeIcon = (e: ChangeEvent<HTMLSpanElement>) => {
    if (isMakingNewPuck) setNewIcon(String(e.currentTarget.textContent));
    if (mainDataArray) {
      setMainDataArray(
        mainDataArray.map((item) =>
          item.id === id
            ? { ...item, icon: String(e.currentTarget.textContent) || "" }
            : item
        )
      );
    }
  };

  const typeHobby = (e: ChangeEvent<HTMLSpanElement>) => {
    if (isMakingNewPuck) setNewHobby(String(e.currentTarget.textContent));
    if (mainDataArray) {
      setMainDataArray(
        mainDataArray.map((item) =>
          item.id === id
            ? { ...item, hobby: String(e.currentTarget.textContent) || "" }
            : item
        )
      );
    }
  };

  const onFocus = (e: ChangeEvent<HTMLSpanElement>) => {
    setIsFocused(true);
  };

  const toggleNewPuck = () => {
    setIsMakingNewPuck(true);
    setNewIcon("");
    setNewHobby("");
  };

  return (
    <li
      className={`flex gap-2 rounded-2xl  px-3 py-1 text-sm transition duration-200 ease-in-out ${
        isHobbySubmitted ? "bg-black" : "bg-secondary"
      }`}
    >
      {/* Hobbies for display */}
      {!isEditing && !defaultNewPuck && (
        <>
          {icon} {hobby}
        </>
      )}
      {/* Hobbies for display end*/}

      {/* Hobbies to be edited */}
      {isEditing && !defaultNewPuck && (
        <>
          <IconAndTagEditableSpan
            iconText={icon}
            hobbyText={hobby}
            iconRef={iconRef}
            hobbyRef={hobbyRef}
            typeIcon={typeIcon}
            typeHobby={typeHobby}
            onFocus={onFocus}
          />

          {/* Edit and remove buttons */}
          {!isHobbySubmitted && (
            <>
              {isFocused ? (
                <button onClick={edit}>
                  <CheckCircleIcon className="my-auto h-4 w-4 text-blue-600" />
                </button>
              ) : (
                <button className="" onClick={remove}>
                  <MinusCircleIcon className="my-auto h-4 w-4 text-red-600" />
                </button>
              )}
            </>
          )}
        </>
      )}
      {/* Edit and remove buttons end */}
      {/* Hobbies to be edited end */}

      {/* Default new puck */}
      {defaultNewPuck && !isMakingNewPuck && (
        <>
          <span className="flex">
            {icon} {hobby}
          </span>
          <button onClick={toggleNewPuck}>
            <PlusCircleIcon className="my-auto h-4 w-4" />
          </button>
        </>
      )}
      {/* Default new puck end */}

      {/* Editable new puck */}
      {defaultNewPuck && isMakingNewPuck && (
        <>
          <IconAndTagEditableSpan
            iconText={newIcon}
            hobbyText={newHobby}
            iconRef={iconRef}
            hobbyRef={hobbyRef}
            typeIcon={typeIcon}
            typeHobby={typeHobby}
            onFocus={onFocus}
          />
          <button onClick={create}>
            <CheckCircleIcon className="my-auto h-4 w-4 " />
          </button>
        </>
      )}
      {/* Editable new puck end */}
    </li>
  );
};

export default IconAndTag;
