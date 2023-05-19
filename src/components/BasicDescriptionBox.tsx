import { api } from "andrewdaotran/utils/api";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { Description } from "typings";

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
  const textareaRef = useRef<HTMLSpanElement>(null);

  const typeMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setData({ ...data, description: String(e.currentTarget.textContent) });
  };

  const cancelNewDescription = () => {
    if (setIsNewDescription) setIsNewDescription(false);
  };

  return (
    <>
      <div className="grid gap-2 rounded-md bg-main px-6 py-4">
        {!isEditing ? (
          <>
            <h2 className="w-fit grow  font-semibold">{title}</h2>

            <p className="text-sm text-grayText">{description}</p>
          </>
        ) : (
          <>
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
                className={`block h-fit max-h-40 w-[100%] flex-auto resize-none  overflow-auto scroll-smooth rounded-md bg-gray-100 p-2  focus:outline-none ${
                  isNewDescription
                    ? 'empty:before:text-gray-400 empty:before:content-["Description"]'
                    : ""
                }`}
                ref={textareaRef}
                onBlur={typeMessage}
                contentEditable
                suppressContentEditableWarning
              >
                {data.description}
              </span>
              {/* Submit and cancel buttons */}
              <div className=" flex gap-2">
                <button
                  type="submit"
                  className="w-fit rounded-md bg-secondary px-4 py-2 "
                >
                  Submit
                </button>

                <button
                  className=" w-fit rounded-md border border-secondary px-4 py-2"
                  onClick={
                    isNewDescription
                      ? cancelNewDescription
                      : (e) => {
                          e.preventDefault();
                          if (!onDelete) return;
                          if (id) onDelete(id);
                        }
                  }
                >
                  {isNewDescription ? "Cancel" : "Delete"}
                </button>
              </div>
              {/* Submit and cancel buttons end */}
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default BasicDescriptionBox;
