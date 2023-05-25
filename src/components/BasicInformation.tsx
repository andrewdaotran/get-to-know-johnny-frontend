import { api } from "andrewdaotran/utils/api";
import BasicDescriptionBox from "./BasicDescriptionBox";
import { basicInformationInput } from "zodTypings";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { BasicInformation } from "typings";
import ButtonWidthFull from "./ButtonWidthFull";

type Props = {
  isViewOnly: boolean;
};

const BasicInformation = ({ isViewOnly }: Props) => {
  const trpc = api.useContext();
  const [isEditing, setIsEditing] = useState(false);

  const { data: information } = api.basicInformation.get.useQuery();

  const { mutate: edit } =
    api.basicInformation.editBasicInformation.useMutation({
      onSettled: async () => {
        await trpc.basicInformation.invalidate();
      },
    });

  const editBasicInformation = ({
    description,
    title,
    id,
  }: BasicInformation) => {
    // if (id)
    edit({
      // id,
      title,
      description,
    });

    const result = basicInformationInput.safeParse({
      title,
      description,
    });
    if (!result.success) {
      if (
        result.error.issues[1]?.path[0] === "title" &&
        result.error.issues[1]?.code === "too_small"
      )
        toast.error(`Title must contain at least one character`);
      if (
        result.error.issues[1]?.path[0] === "title" &&
        result.error.issues[1]?.code === "too_big"
      )
        toast.error(`Description cannot exceed 50 characters`);

      if (
        result.error.issues[1]?.path[0] === "description" &&
        result.error.issues[1]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return;
    }
    setIsEditing(false);
  };

  return (
    <>
      {/* Basic Information */}
      {!isEditing && (
        <div className=" flex flex-col justify-center gap-2 rounded-md bg-main px-6 py-4 ">
          <h1 className=" w-fit  font-semibold">{information?.title}</h1>
          <p className="text-sm text-grayText">{information?.description}</p>

          {/* Information Boxes */}
          <ul className="grid grid-cols-3 grid-rows-2  ">
            {information?.InformationArray.map((info, index) => {
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
                  <h2 className="text-grayText">{info.title}</h2>
                  <h2 className="">{info.description}</h2>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* Information Boxes End */}
      {/* Basic Information End */}

      {/* Editing basic information */}

      {isEditing && (
        <BasicDescriptionBox
          title={information?.title || "A little about me..."}
          description={information?.description || ""}
          id={information?.id}
          isEditing={true}
          isNewDescription={false}
          onSubmit={editBasicInformation}
        />
      )}
      {/* Editing basic information end */}

      {!isViewOnly && (
        <ButtonWidthFull
          onClick={() => setIsEditing(!isEditing)}
          buttonText={isEditing ? "Cancel" : "Edit"}
        />
      )}
    </>
  );
};

export default BasicInformation;
