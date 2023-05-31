import {
  CheckCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { api } from "andrewdaotran/utils/api";
import { ChangeEvent, useContext, useRef, useState } from "react";
import IconAndTagEditableSpan from "./IconAndTagEditableSpan";
import { hobbyInput, hobbyInputWithId } from "zodTypings";
import { toast } from "react-hot-toast";
import HobbyContext, {
  HobbyContextType,
} from "andrewdaotran/context/HobbyContext";
import { Hobby } from "typings";

type Props = {
  isEditing: boolean;
  defaultNewPuck: boolean;
  hobby: string;
  icon: string;
  id?: string;
  mainData: Hobby;
};

const IconAndTag = ({ isEditing, defaultNewPuck, hobby, icon, id }: Props) => {
  const [iconText, setIconText] = useState(icon);
  const [hobbyText, setHobbyText] = useState(hobby);
  const [isFocused, setIsFocused] = useState(false);
  const [isMakingNewPuck, setIsMakingNewPuck] = useState(false);
  const [isHobbySubmitted, setIsHobbySubmitted] = useState(false);

  const { mainDataArray, setMainDataArray } = useContext(
    HobbyContext
  ) as HobbyContextType;

  const iconRef = useRef<HTMLSpanElement>(null);
  const hobbyRef = useRef<HTMLSpanElement>(null);

  const trpc = api.useContext();

  const { mutate: edit } = api.hobby.editHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const editHobby = () => {
    if (id) {
      edit({
        icon,
        hobby,
        id,
      });

      const result = hobbyInputWithId.safeParse({
        icon,
        hobby,
      });
      if (!result.success) {
        if (
          result.error.issues[1]?.path[0] === "icon" &&
          result.error.issues[1]?.code === "too_small"
        )
          toast.error(`Must have one emoji`);
        if (
          result.error.issues[1]?.path[0] === "icon" &&
          result.error.issues[1]?.code === "too_big"
        )
          toast.error(`You can only have one emoji`);

        if (
          result.error.issues[1]?.path[0] === "hobby" &&
          result.error.issues[1]?.code === "too_small"
        )
          toast.error(`Hobby must contain at least one character`);
        if (
          result.error.issues[1]?.path[0] === "hobby" &&
          result.error.issues[1]?.code === "too_big"
        )
          toast.error(`Hobby cannot contain more than 50 characters`);
        return;
      }
      setIsHobbySubmitted(true);
      setIsFocused(false);
      setTimeout(() => {
        setIsHobbySubmitted(false);
      }, 2000);
    }
  };

  const { mutate: remove } = api.hobby.removeHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const { mutate: create } = api.hobby.createHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

  const removeHobby = () => {
    if (id) remove(id);
  };

  // const createHobby = () => {
  //   create({
  //     hobby: hobbyText,
  //     icon: iconText,
  //     isFocused: false,
  //     isHobbySubmitted: false,
  //     isMakingNewPuck: false,
  //   });
  //   const result = hobbyInput.safeParse({
  //     icon: iconText,
  //     hobby: hobbyText,
  //   });
  //   if (!result.success) {
  //     if (
  //       result.error.issues[0]?.path[0] === "icon" &&
  //       result.error.issues[0]?.code === "too_small"
  //     )
  //       toast.error(`Must have one emoji`);

  //     if (
  //       result.error.issues[0]?.path[0] === "icon" &&
  //       result.error.issues[0]?.code === "too_big"
  //     )
  //       toast.error(`You can only have one emoji`);

  //     if (
  //       result.error.issues[0]?.path[0] === "hobby" &&
  //       result.error.issues[0]?.code === "too_small"
  //     )
  //       toast.error(`Hobby must contain at least one character`);
  //     if (
  //       result.error.issues[0]?.path[0] === "hobby" &&
  //       result.error.issues[0]?.code === "too_big"
  //     )
  //       toast.error(`Hobby cannot contain more than 50 characters`);

  //     return;
  //   }
  //   setIconText(defaultIcon);
  //   setHobbyText(defaultHobby);
  //   setIsMakingNewPuck(false);
  // };

  const typeIcon = (e: ChangeEvent<HTMLSpanElement>) => {
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

  // const toggleNewPuck = () => {
  //   setIsMakingNewPuck(true);
  //   setIconText("");
  //   setHobbyText("");
  // };

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
            iconText={iconText}
            hobbyText={hobbyText}
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
                <button onClick={editHobby}>
                  <CheckCircleIcon className="my-auto h-4 w-4 text-blue-600" />
                </button>
              ) : (
                <button className="" onClick={removeHobby}>
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
          <button onClick={() => {}}>
            {/* <button onClick={toggleNewPuck}> */}
            <PlusCircleIcon className="my-auto h-4 w-4" />
          </button>
        </>
      )}
      {/* Default new puck end */}

      {/* Editable new puck */}
      {defaultNewPuck && isMakingNewPuck && (
        <>
          <IconAndTagEditableSpan
            // iconText={iconText}
            // hobbyText={hobbyText}
            iconText={icon}
            hobbyText={hobby}
            iconRef={iconRef}
            hobbyRef={hobbyRef}
            typeIcon={typeIcon}
            typeHobby={typeHobby}
            onFocus={onFocus}
          />
          <button onClick={() => {}}>
            {/* <button onClick={createHobby}> */}
            <CheckCircleIcon className="my-auto h-4 w-4 " />
          </button>
        </>
      )}
      {/* Editable new puck end */}
    </li>
  );
};

export default IconAndTag;
