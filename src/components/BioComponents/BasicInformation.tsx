import DescriptionBox from "./DescriptionBox";
import { useContext } from "react";
import BasicInformationContext, {
  BasicInformationContextType,
} from "andrewdaotran/context/BasicInformationContext";
import InformationBox from "./InformationBox";
import Button from "../UtilityComponents/Button";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import MobileMenuContext, {
  EDIT_ACTION,
  MobileMenuContextType,
} from "andrewdaotran/context/MobileMenuContext";
import Link from "next/link";
import { useRouter } from "next/router";

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
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    modalSize,
    modalMargin,
    johnnyData,
  } = useContext(LoginModalContext) as LoginModalContextType;

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
          {/* Basic Information */}
          {(!isEditing || !isEditPage) && (
            <div className=" flex flex-col justify-center gap-2 rounded-md bg-main   ">
              <div className="flex justify-between ">
                <h1 className=" w-fit   py-1 font-semibold">
                  {mainData?.title}
                </h1>
                {/* Large Screen Edit Button */}
                {screenWidth > "mobile" &&
                  johnnyData?.status === "authenticated" &&
                  router.pathname !== "/edit" && (
                    <button
                      className="z-10  rounded-md border  bg-appOrange px-2 py-1 text-main transition-colors hover:bg-main hover:text-black"
                      onClick={() => {
                        changeMenu(EDIT_ACTION);
                      }}
                    >
                      <Link
                        // href={"/Edit"}
                        href={"/edit"}
                        className={`${
                          menu.isEdit ? "pointer-events-none" : ""
                        }`}
                      >
                        Edit
                      </Link>
                    </button>
                  )}
                {/* Large Screen Edit Button End */}
              </div>
              <p className="text-sm text-grayText ">{mainData?.description}</p>
            </div>
          )}

          {isEditing && isEditPage && (
            <DescriptionBox
              id={mainData?.id}
              isEditPage={isEditPage}
              isEditing={isEditPage ? isEditing : false}
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
