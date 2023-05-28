import { api } from "andrewdaotran/utils/api";
import BasicDescriptionBox from "./BasicDescriptionBox";
import { basicInformationInput } from "zodTypings";
import { toast } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { BasicInformation as BasicInformationType } from "typings";
import ButtonWidthFull from "./ButtonWidthFull";
import InformationBox from "./InformationBox";
import BasicInformationContext, {
  BasicInformationContextType,
} from "andrewdaotran/context/BasicInformationContext";
import ButtonContentFit from "./ButtonContentFit";

type Props = {
  isViewOnly: boolean;
};

const BasicInformation = ({ isViewOnly }: Props) => {
  const trpc = api.useContext();
  const [isEditing, setIsEditing] = useState(false);

  const { mainData, informationBoxes, setMainData } = useContext(
    BasicInformationContext
  ) as BasicInformationContextType;

  const { mutate: edit } =
    api.basicInformation.editBasicInformation.useMutation({
      onSettled: async () => {
        await trpc.basicInformation.invalidate();
      },
    });

  const editBasicInformation = () => {
    edit({
      title: mainData.title,
      description: mainData.description,
    });

    const result = basicInformationInput.safeParse({
      title: mainData.title,
      description: mainData.description,
    });
    if (!result.success) {
      if (
        result.error.issues[0]?.path[0] === "title" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Title must contain at least one character`);
      if (
        result.error.issues[0]?.path[0] === "title" &&
        result.error.issues[0]?.code === "too_big"
      )
        toast.error(`Title cannot exceed 50 characters`);

      if (
        result.error.issues[0]?.path[0] === "description" &&
        result.error.issues[0]?.code === "too_small"
      )
        toast.error(`Description must contain at least one character`);
      return;
    }
    setIsEditing(false);
  };

  return (
    <>
      {/* {!isLoading && ( */}
      <>
        {/* Basic Information */}
        {!isEditing && (
          <div className=" flex flex-col justify-center gap-2 rounded-md bg-main px-6 py-4 ">
            <h1 className=" w-fit  font-semibold">{mainData?.title}</h1>
            <p className="text-sm text-grayText">{mainData?.description}</p>

            {/* Information Boxes */}

            {/* Information Boxes End */}
          </div>
        )}
        {isEditing && (
          <BasicDescriptionBox
            id={mainData?.id}
            isEditing={true}
            isNewDescription={false}
            mainData={mainData}
            setMainData={setMainData}
          />
        )}
        {/* Basic Information End */}
        {/* <InformationBox
          // informationArray={[{ title: "hello", description: "whats up" }]}
          informationArray={informationBoxes}
          isEditing={isEditing}
          // editInformationBox={editInformationBox}
        /> */}
        {/* Editing basic information */}
        {/* Editing basic information end */}
        <ButtonContentFit
          onClick={editBasicInformation}
          buttonText={`Submit`}
        />
        {!isViewOnly && (
          <ButtonWidthFull
            onClick={() => setIsEditing(!isEditing)}
            buttonText={isEditing ? "Cancel" : "Edit"}
          />
        )}
      </>
      {/* )} */}
    </>
  );
};

export default BasicInformation;
