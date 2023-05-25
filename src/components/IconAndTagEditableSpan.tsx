import { ChangeEvent, RefObject } from "react";

type Props = {
  iconText: string;
  hobbyText: string;
  iconRef: RefObject<HTMLSpanElement>;
  hobbyRef: RefObject<HTMLSpanElement>;
  typeIcon: (e: ChangeEvent<HTMLSpanElement>) => void;
  typeHobby: (e: ChangeEvent<HTMLSpanElement>) => void;
  onFocus: (e: ChangeEvent<HTMLSpanElement>) => void;
  isMakingNewPuck: boolean;
};

const IconAndTagEditableSpan = ({
  iconText,
  hobbyText,
  iconRef,
  hobbyRef,
  typeIcon,
  typeHobby,
  onFocus,
  isMakingNewPuck,
}: Props) => {
  return (
    <>
      <span className="flex gap-1">
        <span
          className={`block w-fit flex-auto cursor-text  resize-none overflow-auto scroll-smooth  rounded-md bg-transparent text-sm underline empty:before:text-gray-400 empty:before:content-[":)"] focus:outline-none`}
          ref={iconRef}
          onBlur={typeIcon}
          onFocus={onFocus}
          contentEditable
          suppressContentEditableWarning
        >
          {/* {!isMakingNewPuck ? iconText : ""} */}
          {iconText}
        </span>
        <span
          className={`block h-fit  w-fit  flex-auto cursor-text resize-none overflow-auto scroll-smooth rounded-md text-sm underline empty:before:text-gray-400 empty:before:content-["AddNewHobby"] focus:outline-none`}
          ref={hobbyRef}
          onBlur={typeHobby}
          onFocus={onFocus}
          contentEditable
          suppressContentEditableWarning
        >
          {hobbyText}
          {/* {!isMakingNewPuck ? hobbyText : ""} */}
        </span>
      </span>
    </>
  );
};

export default IconAndTagEditableSpan;
