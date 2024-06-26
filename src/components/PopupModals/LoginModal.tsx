"use client";
import ModalWrapperContext, {
  ModalWrapperContextType,
} from "andrewdaotran/context/ModalWrapperContext";
import WindowSizeContext, {
  WindowSizeContextType,
} from "andrewdaotran/context/ScreenSizeContext";
import React, { useContext } from "react";
import GoogleButton from "react-google-button";

import { signIn, signOut, useSession } from "next-auth/react";

import {
  XMarkIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";

const LoginModal = () => {
  const {
    openModal,
    closeModal,
    isModalOpen,
    modalSize,
    modalMargin,
    doesJohnnyHaveAccount,
    johnnyData,
    // johnnyCreateAccountQuestions,
    // questionCount,
    // currentQuestion,
    // correctOrIncorrectMessage,
    // updateQuestionCount,
    // answerInput,
    // updateAnswerInput,
    // checkIfAnswerIsCorrect,
  } = useContext(ModalWrapperContext) as ModalWrapperContextType;
  const { screenWidth } = useContext(
    WindowSizeContext
  ) as WindowSizeContextType;
  console.log(johnnyData);
  return (
    <div className="">
      <div>
        {johnnyData?.id ? (
          <button onClick={() => void signOut()}>sign out</button>
        ) : (
          <GoogleButton
            className="mx-auto"
            onClick={() => void signIn("google")}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;

// export const getServerSideProps = async () => {
//   const session = await getServerSession(authOptions);

//   return {
//     props: {
//       session,
//     },
//   };
// };

//  <div className=" grid grid-rows-4 items-center ">
//    {doesJohnnyHaveAccount ? (
//      <h2 className="text-center text-xl ">
//        If you&apos;re really Johnny, login
//      </h2>
//    ) : (
//      <>
//        <h2 className="row-start-2 row-end-3 text-center text-xl">
//          {johnnyCreateAccountQuestions[questionCount]?.title}
//        </h2>
//        <h2 className="row-start-3 row-end-4 text-center text-xl">
//          {johnnyCreateAccountQuestions[questionCount]?.title2}
//        </h2>
//      </>
//    )}
//  </div>;

// {
//   /* Form if Johnny has not made an account yet with dumb questions */
// }
// <form
//   className="row-span-2 grid items-center justify-items-center rounded-md sm:border sm:border-secondary"
//   onSubmit={(e) => checkIfAnswerIsCorrect(e)}
// >
//   {/* LoginModal Quesiton */}

//   <h1>
//     {questionCount !== 0
//       ? johnnyCreateAccountQuestions[questionCount]?.question
//       : ""}
//   </h1>

//   {/* LoginModal Quesiton End*/}
//   {/* Left Arrow Icon */}
//   <div className="flex gap-4">
//     {questionCount > 1 ? (
//       <button
//         onClick={() => updateQuestionCount(false)}
//         type="button"
//         disabled={questionCount === 0}
//         className="cursor-pointer text-appOrange transition-colors hover:text-secondary disabled:text-secondary"
//       >
//         <ArrowLeftCircleIcon className=" my-auto h-8 w-8 " />
//       </button>
//     ) : (
//       <div className="my-auto h-8 w-8" />
//     )}
//     {/* Left Arrow Icon End */}

//     {/* Input Box */}
//     {questionCount !== 0 ? (
//       <input
//         type="text"
//         value={
//           johnnyCreateAccountQuestions[questionCount]?.isCorrect
//             ? johnnyCreateAccountQuestions[questionCount]?.typedAnswer
//             : answerInput
//         }
//         onChange={(e) => updateAnswerInput(e.target.value)}
//         disabled={johnnyCreateAccountQuestions[questionCount]?.isCorrect}
//         className="rounded-md border border-secondary p-2 outline-appOrange disabled:text-grayText sm:mx-10"
//       />
//     ) : (
//       <h1 className="p-6">
//         {johnnyCreateAccountQuestions[questionCount]?.question}
//       </h1>
//     )}
//     {/* Input Box End */}

//     {/* Right Arrow Icon */}
//     {questionCount < johnnyCreateAccountQuestions.length &&
//     johnnyCreateAccountQuestions[questionCount]?.isCorrect !== false ? (
//       <button
//         className="cursor-pointer text-appOrange transition-colors hover:text-secondary disabled:text-secondary"
//         onClick={() => updateQuestionCount(true)}
//         type="button"
//         disabled={
//           questionCount === johnnyCreateAccountQuestions.length ||
//           johnnyCreateAccountQuestions[questionCount]?.isCorrect === false
//         }
//       >
//         <ArrowRightCircleIcon className=" my-auto h-8 w-8  " />
//       </button>
//     ) : (
//       <div className="my-auto h-8 w-8" />
//     )}
//   </div>
//   {/* Right Arrow Icon End */}
//   <div className="relative grid  gap-2 text-center">
//     {/* Correct or Incorrect Message*/}
//     <h1 className="absolute -top-7 left-1/2 -ml-12 w-24 text-appOrange">
//       {correctOrIncorrectMessage}
//     </h1>
//     {/* Correct or Incorrect Message End*/}

//     {/* Submit Button */}

//     <button
//       type="submit"
//       className="w-20 rounded-md border border-secondary p-2 transition-colors hover:bg-appOrange hover:text-white disabled:text-secondary disabled:hover:bg-white "
//       disabled={currentQuestion !== questionCount}
//     >
//       {questionCount === 0 ? "Yes" : "Submit"}
//     </button>
//     {/* Submit Button End */}
//   </div>
// </form>;
// {
//   /* Form if Johnny has not made an account yet with dumb questions end */
// }
