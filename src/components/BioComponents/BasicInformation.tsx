import DescriptionBox from "./DescriptionBox";
import { useContext } from "react";
import BasicInformationContext, {
  BasicInformationContextType,
} from "../../context/BasicInformationContext";
import InformationBox from "./InformationBox";
import Button from "../UtilityComponents/Button";
import WindowSizeContext, {
  WindowSizeContextType,
} from "../../context/ScreenSizeContext";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "../../context/ModalWrapperContext";
import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "../../context/MobileMenuContext";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

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

  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  const router = useRouter();

  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    johnnyData,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;

  const { menu, changeMenu } = useContext(
    MobileMenuContext
  ) as MobileMenuContextType;

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
          {isEditPage && (
            <h2 className="text-xl tracking-wider text-appOrange">
              Basic Information
            </h2>
          )}
          {/* Basic Information */}
          {(!isEditing || !isEditPage) && (
            <div className=" flex flex-col justify-center gap-2 rounded-md bg-main   ">
              <div className="flex justify-between ">
                <h1 className=" w-fit   py-1 font-semibold">
                  {mainData?.title}
                </h1>
              </div>
              <p className="text-sm text-grayText ">{mainData?.description}</p>
            </div>
          )}

          {isEditing && isEditPage && (
            <>
              <DescriptionBox
                id={mainData?.id}
                isEditPage={isEditPage}
                isEditing={isEditPage ? isEditing : false}
                isNewDescription={false}
                mainData={mainData}
                setMainData={setMainData}
              />
            </>
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
                  isEditing={isEditPage ? isEditing : false}
                  isEditPage={isEditPage}
                  index={index}
                  id={info.id || ""}
                />
              );
            })}
          </ul>
          {isEditPage && (
            <>
              {isEditing && (
                <Button onClick={submit} buttonText="Submit" customStyle="" />
              )}
              <Button
                onClick={() => {
                  setIsEditing(!isEditing);
                  resetMainData();
                  resetInformationBoxes();
                }}
                buttonText={isEditing ? "Cancel" : "Edit"}
                customStyle="bg-secondary"
              />
            </>
          )}
        </>
      </div>
    </>
  );
};

export default BasicInformation;
