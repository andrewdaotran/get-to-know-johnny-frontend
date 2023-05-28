import { api } from "andrewdaotran/utils/api";
import BasicDescriptionBox from "./BasicDescriptionBox";
import { basicInformationInput } from "zodTypings";
import { toast } from "react-hot-toast";
import { use, useEffect, useState } from "react";
import { BasicInformation } from "typings";
import ButtonWidthFull from "./ButtonWidthFull";
import InformationBox from "./InformationBox";

type Props = {
  isViewOnly: boolean;
};

const BasicInformation = ({ isViewOnly }: Props) => {
  const trpc = api.useContext();
  const [isEditing, setIsEditing] = useState(false);

  const { data: information, isLoading } = api.basicInformation.get.useQuery();

  const [editedInformationArray, setEditedInformationArray] = useState(
    information?.InformationArray
  );

  useEffect(() => {
    setEditedInformationArray(information?.InformationArray);
  }, [isLoading]);

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

  // const editInformationBox = (
  //   editedIndex: number,
  //   title: string,
  //   description: string
  // ) => {
  //   setEditedInformationArray(
  //     editedInformationArray?.map((item, index) =>
  //       editedIndex === index ? { ...item, title, description } : item
  //     )
  //   );
  //   console.log(title);
  //   console.log(description);
  // };

  return (
    <>
      {!isLoading && (
        <>
          {/* Basic Information */}
          {!isEditing && (
            <div className=" flex flex-col justify-center gap-2 rounded-md bg-main px-6 py-4 ">
              <h1 className=" w-fit  font-semibold">{information?.title}</h1>
              <p className="text-sm text-grayText">
                {information?.description}
              </p>

              {/* Information Boxes */}

              {/* Information Boxes End */}
            </div>
          )}
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
          {/* Basic Information End */}
          <InformationBox
            // informationArray={[{ title: "hello", description: "whats up" }]}
            informationArray={editedInformationArray}
            isEditing={isEditing}
            // editInformationBox={editInformationBox}
          />
          {/* Editing basic information */}
          {/* Editing basic information end */}
          {!isViewOnly && (
            <ButtonWidthFull
              onClick={() => setIsEditing(!isEditing)}
              buttonText={isEditing ? "Cancel" : "Edit"}
            />
          )}
        </>
      )}
    </>
  );
};

export default BasicInformation;
