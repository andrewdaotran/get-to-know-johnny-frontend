import {
  CheckCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { ChangeEvent, useContext, useRef, useState } from "react";

import HobbyContext, {
  HobbyContextType,
} from "andrewdaotran/context/HobbyContext";
import { Hobby } from "typings";
import { defaultHobby, defaultIcon } from "andrewdaotran/utils";
import IconAndTagEditableSpan from "./IconAndTagEditableSpan";
import { set } from "zod";

type Props = {
  isEditPage: boolean;
  defaultNewPuck: boolean;
  hobby: string;
  icon: string;
  id?: string;
  mainData: Hobby;
};

const IconAndTag = ({ isEditPage, defaultNewPuck, hobby, icon, id }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isMakingNewPuck, setIsMakingNewPuck] = useState(false);
  const [isHobbySubmitted, setIsHobbySubmitted] = useState(false);
  const [iconText, setIconText] = useState<string>(icon);
  const [hobbyText, setHobbyText] = useState<string>(hobby);

  const {
    mainDataArray,
    setMainDataArray,
    editHobby,
    createHobby,
    removeHobby,
  } = useContext(HobbyContext) as HobbyContextType;

  const iconRef = useRef<HTMLSpanElement>(null);
  const hobbyRef = useRef<HTMLSpanElement>(null);

  // console.log("HELLOOOOO", iconText.length);

  const edit = () => {
    // const success = editHobby({ id, hobby: hobbyText, icon: iconText });

    const success = editHobby({ id, hobby: hobbyText, icon: iconText });
    if (success) {
      setIsHobbySubmitted(true);
      setIsFocused(false);
      setTimeout(() => {
        setIsHobbySubmitted(false);
      }, 2000);
    }
  };

  const create = () => {
    const success = createHobby({ icon: iconText, hobby: hobbyText });
    if (success) {
      setIsMakingNewPuck(false);
    }
  };

  const remove = () => {
    if (id) removeHobby(id);
  };

  const typeIcon = (e: ChangeEvent<HTMLSpanElement>) => {
    if (!isMakingNewPuck) {
      setIconText(icon);
    }
    setIconText(String(e.currentTarget.textContent));
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
    if (!isMakingNewPuck) {
      setHobbyText(hobby);
    }
    setHobbyText(String(e.currentTarget.textContent));
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
    setIconText("");
    setHobbyText("");
  };

  return (
    <li
      className={`flex gap-2 rounded-2xl  px-3 py-1 text-sm transition duration-200 ease-in-out ${
        isHobbySubmitted ? "bg-black" : "bg-secondary"
      }`}
    >
      {/* Hobbies for display */}
      {!isEditPage && !defaultNewPuck && (
        <>
          {icon} {hobby}
        </>
      )}
      {/* Hobbies for display end*/}

      {/* Hobbies to be edited */}
      {isEditPage && !defaultNewPuck && (
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
      {defaultNewPuck && !isMakingNewPuck && isEditPage && (
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
      {defaultNewPuck && isMakingNewPuck && isEditPage && (
        <>
          <IconAndTagEditableSpan
            iconText={iconText}
            hobbyText={hobbyText}
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
