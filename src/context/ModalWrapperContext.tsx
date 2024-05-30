import {
  FormEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChildrenNodeType, User } from "typings";
import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";
import { getServerSession } from "next-auth";
import { authOptions } from "andrewdaotran/server/auth";
import { signIn, useSession } from "next-auth/react";
import { api } from "andrewdaotran/utils/api";
import { sign } from "crypto";
import { set } from "zod";
import LoginModal from "andrewdaotran/components/PopupModals/LoginModal";
import SubmitContactModal from "andrewdaotran/components/PopupModals/SubmitContactModal";
import DeleteContactModal from "andrewdaotran/components/PopupModals/DeleteContactModal";
import ContactsContext, { ContactsContextType } from "./ContactsContext";

export type ModalWrapperContextType = {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalSize: {
    mobile: { width: string; height: string };
    tablet: { width: string; height: string };
    desktop: { width: string; height: string };
  };
  modalMargin: {
    mobile: {
      marginLeft: string;
      marginTop: string;
    };
    tablet: {
      marginLeft: string;
      marginTop: string;
    };
    desktop: {
      marginLeft: string;
      marginTop: string;
    };
  };
  doesJohnnyHaveAccount: boolean;
  johnnyData: User;
  modalTypeObj: {
    closed: {
      type: string;
      title: string;
      component: null;
    };
    login: {
      type: string;
      title: string;
      component: typeof LoginModal;
    };
    submitContact: {
      type: string;
      title: string;
      component: typeof SubmitContactModal;
    };
    deleteContact: {
      type: string;
      title: string;
      component: typeof DeleteContactModal;
    };
  };
  changeModalType: (type: string) => void;
  modalType: string;
  deletedContact: { id: string; firstName: string };
  changeDeleteContact: ({
    id,
    firstName,
  }: {
    id: string;
    firstName: string;
  }) => void;

  // johnnyCreateAccountQuestions: {
  //   question: string;
  //   answer: string;
  //   typedAnswer: string;
  //   isCorrect: boolean;
  //   title: string;
  //   title2?: string;
  // }[];
  // questionCount: number;
  // currentQuestion: number;
  // correctOrIncorrectMessage: string;
  // updateQuestionCount: (value: boolean) => void;
  // answerInput: string;
  // updateAnswerInput: (value: string) => void;

  // checkIfAnswerIsCorrect: (e: FormEvent<HTMLFormElement>) => void;
  // checkIfAnswerIsCorrect: (e: FormEvent<HTMLFormElement>) => boolean;
};

const ModalWrapperContext = createContext<ModalWrapperContextType | null>(null);

export const ModalWrapperProvider = ({ children }: ChildrenNodeType) => {
  const windowSize = useWindowSize();

  const { data: session, status } = useSession();

  const trpc = api.useContext();

  const { data } = api.user.getJohnny.useQuery();
  const { data: all } = api.user.getAll.useQuery();

  const { mutate: createUser } = api.user.createUser.useMutation({
    onSettled: async () => {
      await trpc.user.invalidate();
    },
  });

  const [johnnyData, setJohnnyData] = useState({
    email: "",
    id: "",
    image: "",
    name: "",
    status: "",
  });

  useEffect(() => {
    if (session?.user?.id !== data?.id) {
      setJohnnyData({ ...johnnyData, status: "Not Johnny" } as User);
      // console.log(session?.user.id, data?.id);
      // console.log(session?.user.id === data?.id);
    }

    if (status === "authenticated" && session?.user?.id === data?.id) {
      setJohnnyData({ ...session?.user, status } as User);
    }

    if (!data?.id && johnnyData?.id) {
      createUser(johnnyData);
    }
    if (status === "unauthenticated") {
      setJohnnyData({
        email: "",
        id: "",
        image: "",
        name: "",
        status: "",
      });
    }
  }, [status, data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTypeObj = {
    closed: {
      type: "closed",
      title: "Closed",
      component: null,
    },
    login: {
      type: "login",
      title: "Johnny Login",
      component: LoginModal,
    },
    submitContact: {
      type: "submitContact",
      title: "Leave your info and Johnny will hit you up 😛",
      component: SubmitContactModal,
    },
    deleteContact: {
      type: "deleteContact",
      title: "Are you sure you want to delete",
      component: DeleteContactModal,
    },
  };
  const [modalType, setModalType] = useState(modalTypeObj.closed.type);

  const [doesJohnnyHaveAccount, setDoesJohnnyHaveAccount] = useState(false); // Checks database if there is a user with the name Johnny

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(modalTypeObj.closed.type);
    changeDeleteContact({ id: "", firstName: "" });
  };

  const changeModalType = (type: string) => {
    setModalType(type);
  };

  const [deletedContact, setDeletedContact] = useState({
    id: "",
    firstName: "",
  });

  const changeDeleteContact = ({
    id,
    firstName,
  }: {
    id: string;
    firstName: string;
  }) => {
    setDeletedContact({ id, firstName });
  };

  const checkIfJohnnyHasAccount = () => {
    if (doesJohnnyHaveAccount) {
      return;
    }
  }; // Checks database if there is a user with the name Johnny and sets doesJohnnyHaveAccount to true if there is

  const modalSizeNoRems = {
    mobile: {
      width: "90",
      height: "30",
    },
    tablet: {
      width: "40",
      height: "33",
    },
    desktop: {
      width: "40",
      height: "33",
    },
  };

  const modalSize = {
    mobile: {
      // width: modalSizeNoRems.mobile.width + "rem",
      width:
        windowSize.width < 704 ? modalSizeNoRems.mobile.width + "vw" : "40rem",

      marginLeft:
        windowSize.width < 704
          ? String((100 - Number(modalSizeNoRems.mobile.width)) / 2) + "vw"
          : "",
      marginRight:
        windowSize.width < 704
          ? String((100 - Number(modalSizeNoRems.mobile.width)) / 2) + "vw"
          : "",
      height: modalSizeNoRems.mobile.height + "rem",
    },
    tablet: {
      width: modalSizeNoRems.tablet.width + "rem",
      height: modalSizeNoRems.tablet.height + "rem",
    },
    desktop: {
      width: modalSizeNoRems.desktop.width + "rem",
      height: modalSizeNoRems.desktop.height + "rem",
    },
  };

  const modalMargin = {
    mobile: {
      marginLeft:
        windowSize.width >= 704
          ? "-" + String(Number(modalSizeNoRems.tablet.width) / 2) + "rem"
          : "-50vw",
      marginTop:
        "-" + String(+Number(modalSizeNoRems.mobile.height) / 2) + "rem",
    },
    tablet: {
      marginLeft:
        "-" + String(Number(modalSizeNoRems.tablet.width) / 2) + "rem",

      marginTop:
        "-" + String(Number(modalSizeNoRems.tablet.height) / 2) + "rem",
    },
    desktop: {
      marginLeft:
        "-" + String(Number(modalSizeNoRems.desktop.width) / 2) + "rem",
      marginTop:
        "-" + String(Number(modalSizeNoRems.desktop.height) / 2) + "rem",
    },
  };

  return (
    <ModalWrapperContext.Provider
      value={{
        isModalOpen,
        openModal,
        closeModal,
        modalSize,
        modalMargin,
        doesJohnnyHaveAccount,
        johnnyData,
        modalTypeObj,
        changeModalType,
        modalType,
        deletedContact,
        changeDeleteContact,
        // johnnyCreateAccountQuestions,
        // questionCount,
        // currentQuestion,
        // correctOrIncorrectMessage,
        // updateQuestionCount,
        // answerInput,
        // updateAnswerInput,
        // checkIfAnswerIsCorrect,
      }}
    >
      {children}
    </ModalWrapperContext.Provider>
  );
};

export default ModalWrapperContext;

//  /* Stuff for if Johnny has not made an account yet with dumb questions */

//   const [questionCount, setQuestionCount] = useState(0);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [correctOrIncorrectMessage, setCorrectOrIncorrectMessage] =
//     useState("");

//   const [johnnyCreateAccountQuestions, setJohnnyCreateAccountQuestions] =
//     useState([
//       {
//         question: "Ready?",
//         answer: "yes",
//         typedAnswer: "",
//         isCorrect: false,
//         title: "Trying to make an account?",
//         title2: " First you need to prove that you're actually Johnny.",
//       },
//       {
//         question: "What is the newest car you have?",
//         answer: "bmw x1",
//         typedAnswer: "",
//         isCorrect: false,
//         title: "Alright here we go",
//         title2: "First Question",
//       },
//       {
//         question: "oh thats funny",
//         answer: "testing",
//         typedAnswer: "",
//         isCorrect: false,
//         title: "Lucky guess",
//         title2: "Here's the Second Question",
//       },
//       {
//         question: "again",
//         answer: "again",
//         typedAnswer: "",
//         isCorrect: false,
//         title: "Dang maybe you are Johnny",
//         title2: "Try this one",
//       },
//       {
//         question: "What is the combo I told you to write?",
//         answer: "up down a left up left b down right right down ",
//         typedAnswer: "",
//         isCorrect: false,
//         title: "Damn it IS my boiii",
//         title2: "Alright for reals now",
//       },
//     ]); // questions for Johnny to answer to create an account

//   const [answerInput, setAnswerInput] = useState("Yes"); // input for Johnny to answer questions to create an account

//   const updateAnswerInput = (value: string) => {
//     setAnswerInput(value);
//   };

//   const updateQuestionCount = (value: boolean) => {
//     // Forward
//     if (
//       value &&
//       questionCount < johnnyCreateAccountQuestions.length &&
//       johnnyCreateAccountQuestions[questionCount]?.isCorrect
//     ) {
//       setQuestionCount(questionCount + 1);
//     }
//     // Backwards

//     if (!value && questionCount > 0) {
//       setQuestionCount(questionCount - 1);
//     }
//   };

//   const checkIfAnswerIsCorrect = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (
//       answerInput.toLowerCase() ===
//       johnnyCreateAccountQuestions[questionCount]?.answer
//     ) {
//       johnnyCreateAccountQuestions.map((item, index) => {
//         if (index === questionCount) {
//           item.isCorrect = true;
//           item.typedAnswer = answerInput;
//         }
//       });
//       setAnswerInput("");
//       updateQuestionCount(true);
//       setCurrentQuestion(currentQuestion + 1);
//       if (questionCount !== 0) {
//         setCorrectOrIncorrectMessage("Correct!");
//         setTimeout(() => {
//           setCorrectOrIncorrectMessage("");
//         }, 3000);
//         console.log(johnnyCreateAccountQuestions);
//       }

//       return;
//     }

//     setCorrectOrIncorrectMessage("Incorrect!");
//     setTimeout(() => {
//       setCorrectOrIncorrectMessage("");
//     }, 3000);
//     console.log(johnnyCreateAccountQuestions);
//     return;
//   }; // Checks if the answer is correct and sets isCorrect to true if it is

//   /* Stuff for if Johnny has not made an account yet with dumb questions end */
