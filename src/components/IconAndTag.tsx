import {
  CheckCircleIcon,
  MinusCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useIsMutating } from "@tanstack/react-query";
import { api } from "andrewdaotran/utils/api";
import { ChangeEvent, useRef, useState } from "react";
import IconAndTagEditableSpan from "./IconAndTagEditableSpan";
import { set } from "zod";
import { defaultHobby, defaultIcon } from "andrewdaotran/utils";

type Props = {
  icon: string;
  hobby: string;
  isEditing: boolean;
  id?: string;
  defaultNewPuck: boolean;
};

const IconAndTag = ({ icon, hobby, isEditing, id, defaultNewPuck }: Props) => {
  const trpc = api.useContext();
  const [iconText, setIconText] = useState(icon);
  const [hobbyText, setHobbyText] = useState(hobby);
  const [isFocused, setIsFocused] = useState(false);
  const [isMakingNewPuck, setIsMakingNewPuck] = useState(false);

  const [isHobbySubmitted, setIsHobbySubmitted] = useState(false);

  const iconRef = useRef<HTMLSpanElement>(null);
  const hobbyRef = useRef<HTMLSpanElement>(null);

  const { mutate: edit } = api.hobby.editHobby.useMutation({
    onSettled: async () => {
      await trpc.hobby.invalidate();
    },
  });

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

  const editHobby = () => {
    if (id) edit({ icon: iconText, hobby: hobbyText, id });
    setIsHobbySubmitted(true);
    setIsFocused(false);
    setTimeout(() => {
      setIsHobbySubmitted(false);
    }, 2000);
    // needs toaster error handling
  };

  const removeHobby = () => {
    if (id) remove(id);
  };

  const createHobby = () => {
    create({ hobby: hobbyText, icon: iconText });
    setIconText(defaultIcon);
    setHobbyText(defaultHobby);
    setIsMakingNewPuck(false);
    // needs toaster error handling
  };

  const typeIcon = (e: ChangeEvent<HTMLSpanElement>) => {
    setIconText(String(e.currentTarget.textContent));
  };

  const typeHobby = (e: ChangeEvent<HTMLSpanElement>) => {
    setHobbyText(String(e.currentTarget.textContent));
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
            isMakingNewPuck={false}
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
            iconText={iconText}
            hobbyText={hobbyText}
            iconRef={iconRef}
            hobbyRef={hobbyRef}
            typeIcon={typeIcon}
            typeHobby={typeHobby}
            onFocus={onFocus}
            isMakingNewPuck={true}
          />
          <button onClick={createHobby}>
            <CheckCircleIcon className="my-auto h-4 w-4 " />
          </button>
        </>
      )}
      {/* Editable new puck end */}
    </li>
  );
};

export default IconAndTag;
