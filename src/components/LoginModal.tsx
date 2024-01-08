import LoginModalContext, {
  LoginModalContextType,
} from "andrewdaotran/context/LoginModalContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import React, { useContext } from "react";

import {
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

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
    currentQuestion,
    correctOrIncorrectMessage,
    updateQuestionCount,
    answerInput,
    updateAnswerInput,
    checkIfAnswerIsCorrect,
  } = useContext(LoginModalContext) as LoginModalContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;

  return (
    <div
      className={` relative  grid grid-rows-3 gap-4 rounded-md border border-red-500 bg-main sm:p-12`}
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
      <div className=" grid grid-rows-4 items-center ">
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

      {/* Form if Johnny has not made an account yet */}
      <form
        className="row-span-2 grid items-center justify-items-center rounded-md sm:border sm:border-secondary"
        onSubmit={(e) => checkIfAnswerIsCorrect(e)}
      >
        {/* LoginModal Quesiton */}
        <h1>{johnnyCreateAccountQuestions[questionCount]?.question}</h1>
        {/* LoginModal Quesiton End*/}

        {/* LoginModal Left Right Buttons and Input */}
        <div className="flex gap-4">
          <button
            onClick={() => updateQuestionCount(false)}
            type="button"
            disabled={questionCount === 0}
            className="cursor-pointer text-appOrange transition-colors hover:text-secondary disabled:text-secondary"
          >
            <ArrowLeftCircleIcon className=" my-auto h-8 w-8 " />
          </button>
          <input
            type="text"
            value={
              johnnyCreateAccountQuestions[questionCount]?.isCorrect
                ? johnnyCreateAccountQuestions[questionCount]?.typedAnswer
                : answerInput
            }
            onChange={(e) => updateAnswerInput(e.target.value)}
            disabled={johnnyCreateAccountQuestions[questionCount]?.isCorrect}
            className="rounded-md border border-secondary p-2 outline-appOrange disabled:text-grayText sm:mx-10"
          />
          <button
            className="cursor-pointer text-appOrange transition-colors hover:text-secondary disabled:text-secondary"
            onClick={() => updateQuestionCount(true)}
            type="button"
            disabled={
              questionCount === 3 ||
              johnnyCreateAccountQuestions[questionCount]?.isCorrect === false
            }
          >
            <ArrowRightCircleIcon className=" my-auto h-8 w-8  " />
          </button>
        </div>
        {/* LoginModal Left Right Buttons and Input End */}

        <div className="relative grid  gap-2 text-center">
          {/* Correct or Incorrect Message*/}
          <h1 className="absolute -top-7 left-1/2 -ml-12 w-24 text-appOrange">
            {correctOrIncorrectMessage}
          </h1>
          {/* Correct or Incorrect Message End*/}

          {/* Submit Button */}

          <button
            type="submit"
            className="rounded-md border border-secondary p-2 transition-colors hover:bg-appOrange hover:text-white disabled:text-secondary disabled:hover:bg-white "
            disabled={currentQuestion !== questionCount}
          >
            Submit
          </button>
          {/* Submit Button End */}
        </div>
      </form>
      {/* Form if Johnny has not made an account yet end*/}
      {/* Modal Body End */}
    </div>
  );
};

export default LoginModal;
