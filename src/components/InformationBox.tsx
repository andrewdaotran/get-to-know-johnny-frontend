import { Dispatch, SetStateAction, useState } from "react";
import { InformationBox } from "typings";

type Props = {
  informationArray: InformationBox[] | undefined;
  isEditing: boolean;
  editInformationBox?: (
    editedIndex: number,
    title: string,
    description: string
  ) => void;
  // setEditedInformationArray: Dispatch<
  //   SetStateAction<InformationBox[] | undefined>
  // >;
};

const InformationBox = ({
  informationArray,
  isEditing,
}: // setEditedInformationArray,
// editInformationBox,
Props) => {
  return (
    <ul className="grid grid-cols-3 grid-rows-2  ">
      {informationArray?.map((info, index) => {
        // const [editedTitle, setEditedTitle] = useState(info.title);
        // const [editedDescription, setEditedDescription] = useState(
        //   info.description
        // );

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
            key={info.title}
          >
            {!isEditing && (
              <>
                <h2 className="text-grayText">{info.title}</h2>
                <h2 className="">{info.description}</h2>
              </>
            )}
            {isEditing && (
              <>
                <input
                  type="text"
                  placeholder="Title"
                  value={info.title}
                  className="rounded-md border pl-2 outline-none"
                  // onChange={(e) =>
                  //   editInformationBox(index, e.target.value, editedDescription)
                  // }
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={info.description}
                  className="rounded-md border pl-2 outline-none"
                  // onChange={(e) =>
                  //   editInformationBox(index, editedTitle, e.target.value)
                  // }
                />
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default InformationBox;
