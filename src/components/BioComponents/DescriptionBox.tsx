import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
} from "react";
import { BasicInformation, Description } from "typings";
import Button from "../UtilityComponents/Button";

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
          <div className="grid gap-2 rounded-md border border-secondary bg-main px-6 py-4">
            <h2 className="w-fit grow  font-semibold">{mainData.title}</h2>
            <p className="text-sm text-grayText">{mainData.description}</p>
          </div>
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
            className="grid justify-items-center gap-2 rounded-md border border-secondary bg-main px-6 py-4"
          >
            <input
              type="text"
              value={mainData.title}
              onChange={(e) => typeTitle(e)}
              placeholder={`${isNewDescription ? "Title" : ""}`}
              className="w-full grow rounded-md border border-secondary p-2 font-semibold outline-none"
            />

            <span
              className={`block h-fit max-h-40 w-[100%] flex-auto resize-none  overflow-auto scroll-smooth rounded-md bg-gray-100 p-2 text-sm text-grayText focus:outline-none ${
                isNewDescription
                  ? 'empty:before:text-gray-400 empty:before:content-["Description"]'
                  : ""
              }`}
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
                  onClick={() => {}}
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
