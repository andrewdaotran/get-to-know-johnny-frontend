import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { useIsMutating } from "@tanstack/react-query";
import { api } from "andrewdaotran/utils/api";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  icon: string;
  hobby: string;
  isEditing: boolean;
  id?: string;
};

const IconAndTag = ({ icon, hobby, isEditing, id }: Props) => {
  const trpc = api.useContext();
  const [iconText, setIconText] = useState(icon);
  const [hobbyText, setHobbyText] = useState(hobby);
  const [isFocused, setIsFocused] = useState(false);

  const [isHobbySubmitted, setIsHobbySubmitted] = useState(false);

  const iconRef = useRef<HTMLSpanElement>(null);
  const hobbyRef = useRef<HTMLSpanElement>(null);

  const { mutate: edit } = api.hobby.editHobby.useMutation({
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

  return (
    <li
      className={`flex gap-2 rounded-2xl  px-3 py-1 text-sm transition duration-200 ease-in-out ${
        isHobbySubmitted ? "bg-black" : "bg-secondary"
      }`}
    >
      {!isEditing ? (
        <>
          {icon} {hobby}
        </>
      ) : (
        <>
          <span className="flex gap-1">
            <span
              className={`block w-fit flex-auto cursor-text  resize-none overflow-auto scroll-smooth  rounded-md bg-transparent text-sm focus:outline-none`}
              ref={iconRef}
              onBlur={typeIcon}
              onFocus={onFocus}
              contentEditable
              suppressContentEditableWarning
            >
              {iconText}
            </span>
            <span
              className={`block h-fit w-fit flex-auto cursor-text  resize-none overflow-auto scroll-smooth  rounded-md  bg-transparent text-sm focus:outline-none`}
              ref={hobbyRef}
              onBlur={typeHobby}
              onFocus={onFocus}
              contentEditable
              suppressContentEditableWarning
            >
              {hobbyText}
            </span>
          </span>

          {!isHobbySubmitted && (
            <>
              {isFocused ? (
                <button onClick={editHobby}>
                  <CheckCircleIcon className="my-auto h-4 w-4 text-blue-600" />
                </button>
              ) : (
                <button className="">
                  <MinusCircleIcon className="my-auto h-4 w-4 text-red-600" />
                </button>
              )}
            </>
          )}
        </>
      )}
    </li>
  );
};

export default IconAndTag;
