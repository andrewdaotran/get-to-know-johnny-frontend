import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useContext,
  useRef,
} from "react";
import { BasicInformation, Description } from "typings";
import Button from "../UtilityComponents/Button";
import { TrashIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import DescriptionContext, {
  DescriptionContextType,
} from "andrewdaotran/context/DescriptionContext";

type Props = {
  id?: string;
  isEditPage: boolean;
  isEditing: boolean;
  onSubmit?: ({ description, title, id }: Description) => void;
  onDelete?: (id: string) => void;
  isNewDescription: boolean;
  setIsNewDescription?: Dispatch<SetStateAction<boolean>>;
  mainData: BasicInformation;
  mainDataArray?: BasicInformation[];
  setMainData?: Dispatch<
    SetStateAction<{
      title: string;
      description: string;
      id?: string | undefined;
    }>
  >;
  setMainDataArray?: Dispatch<SetStateAction<Description[]>>;
  index?: number;
};

const DescriptionBox = ({
  id,
  isEditPage,
  isEditing,
  onSubmit,
  onDelete,
  isNewDescription,
  setIsNewDescription,
  mainData,
  mainDataArray,
  setMainData,
  setMainDataArray,
  index,
}: Props) => {
  const contentEditableRef = useRef<HTMLSpanElement>(null);

  const { editRef, makeEditRef, editComponent } =
    useContext(DescriptionContext);
  // as DescriptionContextType;

  const typeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (setMainData)
      setMainData({
        ...mainData,
        title: e.target.value,
      });
    if (setMainDataArray && mainDataArray)
      setMainDataArray(
        mainDataArray.map((item, idx) =>
          idx === index ? { ...item, title: String(e.target.value) } : item
        )
      );
  };
  const typeDescription = (e: ChangeEvent<HTMLSpanElement>) => {
    if (setMainData)
      setMainData({
        ...mainData,
        description: String(e.currentTarget.textContent),
      });
    if (setMainDataArray && mainDataArray)
      setMainDataArray(
        mainDataArray.map((item, idx) =>
          idx === index
            ? {
                ...item,
                description: e.currentTarget.textContent || "",
              }
            : item
        )
      );
  };

  const cancelNewDescription = () => {
    if (setIsNewDescription) setIsNewDescription(false);
  };

  return (
    <>
      {!isEditing && (
        // Not editing descriptions
        <>
          {/* border border-secondary */}
          <button
            className={`relative grid gap-2 rounded-md border border-secondary bg-main px-6 py-4 text-start`}
            disabled={!isEditPage}
            ref={editRef}
            onClick={() => id && makeEditRef(id)}
          >
            {/* {isEditPage && (
              <button
                className="absolute right-5 top-4 text-red-600"
                onClick={(e: MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  if (id && onDelete) onDelete(id);
                }}
              >
                <XCircleIcon className=" h-6 w-6" />
              </button>
            )} */}

            <h2 className="w-fit grow  font-semibold">{mainData.title}</h2>
            <p className="text-sm text-grayText">{mainData.description}</p>
          </button>
        </>
      )}
      {/* // Not editing descriptions end */}
      {isEditing && (
        <>
          {/* Editing descriptions */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!onSubmit) return;
              if (id) {
                onSubmit({
                  description: mainData.description,
                  title: mainData.title,
                  id,
                });
              } else {
                onSubmit({
                  description: mainData.description,
                  title: mainData.title,
                });
              }
            }}
            // border border-secondary
            className={`relative grid justify-items-start gap-2  rounded-md bg-main  ${
              isEditing && editComponent === id ? "absolute bg-red-500" : ""
            }`}
          >
            {/* <button
              className="absolute right-5 top-3 text-red-600"
              onClick={(e: MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                if (id && onDelete) onDelete(id);
              }}
            >
              <XCircleIcon className=" h-6 w-6" />
            </button> */}
            <input
              type="text"
              value={mainData.title}
              onChange={(e) => typeTitle(e)}
              placeholder={`Title`}
              className="w-full grow rounded-md border border-secondary p-2 font-semibold outline-none"
            />

            <span
              className={`'empty:before:text-gray-400 block h-fit max-h-40 w-[100%] flex-auto  resize-none overflow-auto scroll-smooth rounded-md bg-gray-100 p-2 text-sm text-grayText empty:before:content-["Description"] focus:outline-none `}
              ref={contentEditableRef}
              onBlur={typeDescription}
              contentEditable
              suppressContentEditableWarning
            >
              {mainData.description}
            </span>
            {/* Submit and cancel buttons */}
            {onSubmit && (
              <div className=" flex gap-2">
                <Button
                  isSubmit={true}
                  buttonText={`Submit`}
                  customStyle=""
                  onClick={() => {
                    return;
                  }}
                />
                {onDelete && (
                  <Button
                    onClick={
                      isNewDescription
                        ? cancelNewDescription
                        : (e: MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            if (id) onDelete(id);
                          }
                    }
                    buttonText={isNewDescription ? "Cancel" : "Delete"}
                    customStyle=""
                  />
                )}
              </div>
            )}

            {/* Submit and cancel buttons end */}
          </form>
          {/* Editing descriptions end */}
        </>
      )}
    </>
  );
};

export default DescriptionBox;
