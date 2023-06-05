import DescriptionBox from "./DescriptionBox";
import { useContext } from "react";
import BasicInformationContext, {
  BasicInformationContextType,
} from "andrewdaotran/context/BasicInformationContext";
import InformationBox from "./InformationBox";
import ButtonWidthFull from "../UtilityComponents/ButtonWidthFull";

type Props = {
  isEditPage: boolean;
};

const BasicInformation = ({ isEditPage }: Props) => {
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
      <div className={`grid gap-2 rounded-md bg-main px-6 py-6`}>
        <>
          {/* Basic Information */}
          {!isEditing && (
            <div className=" flex flex-col justify-center gap-2 rounded-md bg-main   ">
              <h1 className=" w-fit  font-semibold">{mainData?.title}</h1>
              <p className="text-sm text-grayText">{mainData?.description}</p>
            </div>
          )}

          {isEditing && (
            <DescriptionBox
              id={mainData?.id}
              isEditing={true}
              isNewDescription={false}
              mainData={mainData}
              setMainData={setMainData}
            />
          )}
          {/* Basic Information End */}
          <ul
            className={` 
              grid grid-cols-3 grid-rows-2   `}
          >
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
          {isEditPage && (
            <>
              {isEditing && (
                <ButtonWidthFull onClick={submit} buttonText="Submit" />
              )}
              <ButtonWidthFull
                onClick={() => {
                  setIsEditing(!isEditing);
                  resetMainData();
                  resetInformationBoxes();
                }}
                buttonText={isEditing ? "Cancel" : "Edit"}
              />
            </>
          )}
        </>
      </div>
    </>
  );
};

export default BasicInformation;
