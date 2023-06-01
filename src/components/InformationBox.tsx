import BasicInformationContext, {
  BasicInformationContextType,
} from "andrewdaotran/context/BasicInformationContext";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

type Props = {
  isEditing: boolean;
  title: string;
  description: string;
  index: number;
  id: string;
};

const InformationBox = ({
  title,
  description,
  isEditing,
  index,
  id,
}: Props) => {
  const { informationBoxes, setInformationBoxes } = useContext(
    BasicInformationContext
  ) as BasicInformationContextType;

  const titleRef = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLSpanElement>(null);

  const typeTitle = (e: ChangeEvent<HTMLSpanElement>) => {
    setInformationBoxes(
      informationBoxes.map((item) =>
        item.id === id
          ? { ...item, title: String(e.currentTarget.textContent) }
          : item
      )
    );
  };

  const typeDescription = (e: ChangeEvent<HTMLSpanElement>) => {
    setInformationBoxes(
      informationBoxes.map((item) =>
        item.id === id
          ? { ...item, description: String(e.currentTarget.textContent) }
          : item
      )
    );
  };
  return (
    <li
      className={`${
        index === 0
          ? "rounded-tl-md"
          : index === 2
          ? "rounded-tr-md"
          : index === 3
          ? "rounded-bl-md"
          : index === 5
          ? "rounded-br-md"
          : ""
      } overflow-hidden bg-main p-2 text-sm outline outline-secondary`}
      key={id}
    >
      {!isEditing && (
        <>
          <h2 className="text-grayText">{title}</h2>
          <h2 className="">{description}</h2>
        </>
      )}
      {isEditing && (
        <>
          <span className="flex-col gap-1 ">
            <span
              className={`block w-fit flex-auto cursor-text  resize-none overflow-auto scroll-smooth  rounded-md border  bg-transparent empty:before:text-gray-400 empty:before:content-["Title"] focus:outline-none`}
              ref={titleRef}
              onBlur={typeTitle}
              // onFocus={onFocus}
              contentEditable
              suppressContentEditableWarning
            >
              {title}
            </span>
            <span
              className={`block h-fit  w-fit  flex-auto cursor-text resize-none overflow-auto scroll-smooth rounded-md border  empty:before:text-gray-400 empty:before:content-["Description"] focus:outline-none`}
              ref={descriptionRef}
              onBlur={typeDescription}
              // onFocus={onFocus}
              contentEditable
              suppressContentEditableWarning
            >
              {description}
            </span>
          </span>
          {/* <input
            type="text"
            placeholder="Title"
            value={title}
            className="rounded-md border pl-2 outline-none"
            onChange={(e) => {
              // e.preventDefault();
              // typeSingleInformationTitle(id || '');
            }}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            className="rounded-md border pl-2 outline-none"
            onChange={
              (e) => {}
              // editInformationBox(index, editedTitle, e.target.value)
            }
          /> */}
        </>
      )}
    </li>
  );
};

export default InformationBox;
