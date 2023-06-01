import BasicDescriptionBox from "./BasicDescriptionBox";
import { useContext } from "react";
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
  const {
    mainData,
    informationBoxes,
    isEditing,
    setIsEditing,
    resetMainData,
    resetInformationBoxes,
    setMainData,
    editBasicInformation,
    editInformationBoxes,
  } = useContext(BasicInformationContext) as BasicInformationContextType;

  const submit = () => {
    const basicInformationSuccess = editBasicInformation();
    const informationBoxesSuccess = editInformationBoxes();

    if (!basicInformationSuccess || !informationBoxesSuccess) return;
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
        <ul className="grid grid-cols-3 grid-rows-2  ">
          {informationBoxes?.map((info, index) => {
            return (
              <InformationBox
                // key={info.id}
                key={index}
                title={info.title}
                description={info.description}
                isEditing={isEditing}
                index={index}
                id={info.id || ""}
              />
            );
          })}
        </ul>
        <ButtonContentFit onClick={submit} buttonText={`Submit`} />
        {!isViewOnly && (
          <ButtonWidthFull
            onClick={() => {
              setIsEditing(!isEditing);
              resetMainData();
              resetInformationBoxes();
            }}
            buttonText={isEditing ? "Cancel" : "Edit"}
          />
        )}
      </>
    </>
  );
};

export default BasicInformation;
