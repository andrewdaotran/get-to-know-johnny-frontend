import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import React, { useContext } from "react";

import { XMarkIcon } from "@heroicons/react/24/solid";

const LoginModal = () => {
  const {
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyCreateAccountQuestions,
    questionCount,
    updateQuestionCount,
    answerInput,
    updateAnswerInput,
  } = useContext(LoginModalContext) as LoginModalContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <div
      className={` relative  grid grid-rows-3 gap-4 rounded-md border border-red-500 bg-main p-12`}
      style={
        screenWidth === "mobile"
          ? modalSize.mobile
          : screenWidth === "tablet"
          ? modalSize.tablet
          : modalSize.desktop
      }
    >
      {/* Close Modal Button */}
      <div className="absolute left-4 top-4" onClick={closeLoginModal}>
        <XMarkIcon className=" my-auto h-8 w-8 cursor-pointer text-appOrange transition-colors hover:text-secondary" />
      </div>
      {/* Close Modal Button End*/}

      {/* Modal Header */}
      <div className=" grid grid-rows-4 items-center">
        {doesJohnnyHaveAccount ? (
          <h2 className="text-center text-xl ">
            If you&apos;re really Johnny, login
          </h2>
        ) : (
          <>
            <h2 className="row-start-2 row-end-3 text-center text-xl">
              Are you actually Johnny?
            </h2>
            <h2 className="row-start-3 row-end-4 text-center text-xl">
              Yeah right, answer some damn questions first.
            </h2>
          </>
        )}
      </div>
      {/* Modal Header End */}

      {/* Modal Body */}

      <form className="row-span-2 grid items-center justify-items-center rounded-md border border-secondary">
        <h1>{johnnyCreateAccountQuestions[questionCount]?.question}</h1>
        <input
          type="text"
          value={answerInput}
          onChange={(e) => updateAnswerInput(e.target.value)}
        />
      </form>
      {/* Modal Body End */}
    </div>
  );
};

export default LoginModal;
