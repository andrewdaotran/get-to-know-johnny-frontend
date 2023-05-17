import { api } from "andrewdaotran/utils/api";
import { ChangeEvent, useRef, useState } from "react";

type Props = {
  title: string;
  description: string;
  id: string;
  isEditing: boolean;
};

type Data = {
  title: string;
  description: string;
};

const BasicDescriptionBox = ({ title, description, id, isEditing }: Props) => {
  const [data, setData] = useState<Data>({ title, description });
  const textareaRef = useRef<HTMLSpanElement>(null);
  const { mutate } = api.description.editDescription.useMutation();

  const typeMessage = (e: ChangeEvent<HTMLSpanElement>) => {
    setData({ ...data, description: String(e.currentTarget.textContent) });
  };

  return (
    <>
      <div className="grid gap-2 rounded-md bg-main px-6 py-4">
        {!isEditing ? (
          <>
            <h2 className="w-fit font-semibold">{title}</h2>
            <p className="text-sm text-grayText">{description}</p>
          </>
        ) : (
          <>
            {" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                mutate({
                  description: data.description,
                  title: data.title,
                  id,
                });
              }}
              className="grid gap-2 rounded-md border border-secondary bg-main px-6 py-4"
            >
              <input
                type="text"
                value={data.title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                }}
                className="w-full rounded-md border border-secondary p-2 font-semibold outline-none"
              />

              <span
                className={`block h-fit max-h-40 w-[100%] flex-auto resize-none  overflow-auto scroll-smooth rounded-md bg-gray-100 p-2  focus:outline-none`}
                ref={textareaRef}
                onBlur={typeMessage}
                contentEditable
                suppressContentEditableWarning
              >
                {data.description}
              </span>
              <button type="submit">Submit</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default BasicDescriptionBox;
