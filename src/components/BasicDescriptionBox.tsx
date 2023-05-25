import { api } from "andrewdaotran/utils/api";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Description } from "typings";
import ButtonContentFit from "./ButtonContentFit";

type Props = {
  title: string;
  description: string;
  id?: string;
  isEditing: boolean;
  onSubmit?: ({ description, title, id }: Description) => void;
  onDelete?: (id: string) => void;
  isNewDescription: boolean;
  setIsNewDescription?: Dispatch<SetStateAction<boolean>>;
};

type Data = {
  title: string;
  description: string;
};

const BasicDescriptionBox = ({
  title,
  description,
  id,
  isEditing,
  onSubmit,
  onDelete,
  isNewDescription,
  setIsNewDescription,
}: Props) => {
  const [data, setData] = useState<Data>({ title, description });
  const contentEditableRef = useRef<HTMLSpanElement>(null);

  const typeMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setData({ ...data, description: String(e.currentTarget.textContent) });
  };

  const cancelNewDescription = () => {
    if (setIsNewDescription) setIsNewDescription(false);
  };

  return (
    <>
      {!isEditing ? (
        // Not editing descriptions
        <>
          <div className="grid gap-2 rounded-md bg-main px-6 py-4">
            <h2 className="w-fit grow  font-semibold">{title}</h2>

            <p className="text-sm text-grayText">{description}</p>
          </div>
        </>
      ) : (
        // Not editing descriptions end
        <>
          {/* Editing descriptions */}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!onSubmit) return;
              if (id) {
                onSubmit({
                  description: data.description,
                  title: data.title,
                  id,
                });
              } else {
                onSubmit({
                  description: data.description,
                  title: data.title,
                });
              }
            }}
            className="grid justify-items-center gap-2 rounded-md border border-secondary bg-main px-6 py-4"
          >
            <input
              type="text"
              value={data.title}
              onChange={(e) => {
                setData({ ...data, title: e.target.value });
              }}
              placeholder={`${isNewDescription ? "Title" : ""}`}
              className="w-full grow rounded-md border border-secondary p-2 font-semibold outline-none"
            />

            <span
              className={`block h-fit max-h-40 w-[100%] flex-auto resize-none  overflow-auto scroll-smooth rounded-md bg-gray-100 p-2 text-sm focus:outline-none ${
                isNewDescription
                  ? 'empty:before:text-gray-400 empty:before:content-["Description"]'
                  : ""
              }`}
              ref={contentEditableRef}
              onBlur={typeMessage}
              contentEditable
              suppressContentEditableWarning
            >
              {data.description}
            </span>
            {/* Submit and cancel buttons */}
            <div className=" flex gap-2">
              <ButtonContentFit isSubmit={true} buttonText={`Submit`} />
              {onDelete && (
                <ButtonContentFit
                  onClick={
                    isNewDescription
                      ? cancelNewDescription
                      : (e: MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          if (id) onDelete(id);
                        }
                  }
                  buttonText={isNewDescription ? "Cancel" : "Delete"}
                  buttonColor="white"
                />
              )}
            </div>
            {/* Submit and cancel buttons end */}
          </form>
          {/* Editing descriptions end */}
        </>
      )}
    </>
  );
};

export default BasicDescriptionBox;
