import {
  FormEvent,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChildrenNodeType } from "typings";
import useWindowSize from "andrewdaotran/CustomHooks/useWindowSize";
import { set } from "zod";

export type LoginModalContextType = {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
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
  johnnyCreateAccountQuestions: {
    question: string;
    answer: string;

    typedAnswer: string;
    isCorrect: boolean;
  }[];
  questionCount: number;
  currentQuestion: number;
  correctOrIncorrectMessage: string;
  updateQuestionCount: (value: boolean) => void;
  answerInput: string;
  updateAnswerInput: (value: string) => void;

  checkIfAnswerIsCorrect: (e: FormEvent<HTMLFormElement>) => void;
  // checkIfAnswerIsCorrect: (e: FormEvent<HTMLFormElement>) => boolean;
};

const LoginModalContext = createContext<LoginModalContextType | null>(null);

export const LoginModalProvider = ({ children }: ChildrenNodeType) => {
  const windowSize = useWindowSize();

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [doesJohnnyHaveAccount, setDoesJohnnyHaveAccount] = useState(false); // Checks database if there is a user with the name Johnny

  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctOrIncorrectMessage, setCorrectOrIncorrectMessage] =
    useState("");

  const [johnnyCreateAccountQuestions, setJohnnyCreateAccountQuestions] =
    useState([
      {
        question: "What is the newest car you have?",
        // answer: [
        //   "sept 1",
        //   "september 1",
        //   "september first",
        //   "sept 1st",
        //   "september 1st",
        //   "sept first",
        //   "sept 01",
        //   "september 01",
        //   "9/1",
        //   "09/01",
        //   "09/1",
        //   "9/01",
        //   "9-1",
        //   "09-01",
        //   "09-1",
        //   "9-01",
        //   "9.1",
        //   "09.01",
        //   "09.1",
        //   "9.01",
        //   "9 1",
        //   "09 01",
        //   "09 1",
        //   "9 01",
        //   "9,1",
        //   "09,01",
        //   "09,1",
        //   "9,01",
        //   "9:1",
        //   "09:01",
        //   "09:1",
        //   "9:01",
        // ],
        answer: "bmw x1",
        typedAnswer: "",
        isCorrect: false,
      },
      {
        question: "oh thats funny",
        answer: "testing",
        typedAnswer: "",
        isCorrect: false,
      },
      {
        question: "again",
        answer: "again",
        typedAnswer: "",
        isCorrect: false,
      },
      {
        question:
          "Alright for reals though, what is the combo I told you to write?",
        answer: "up down a left up left b down right right down ",
        typedAnswer: "",
        isCorrect: false,
      },
    ]); // questions for Johnny to answer to create an account

  const [answerInput, setAnswerInput] = useState(""); // input for Johnny to answer questions to create an account

  const updateAnswerInput = (value: string) => {
    setAnswerInput(value);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const updateQuestionCount = (value: boolean) => {
    // Forward
    if (
      value &&
      questionCount < 3 &&
      johnnyCreateAccountQuestions[questionCount]?.isCorrect
    ) {
      setQuestionCount(questionCount + 1);
    }
    // Backwards

    if (!value && questionCount > 0) {
      setQuestionCount(questionCount - 1);
    }
  };

  const checkIfAnswerIsCorrect = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      answerInput.toLowerCase() ===
      johnnyCreateAccountQuestions[questionCount]?.answer
    ) {
      johnnyCreateAccountQuestions.map((item, index) => {
        if (index === questionCount) {
          item.isCorrect = true;
          item.typedAnswer = answerInput;
        }
      });
      setAnswerInput("");
      updateQuestionCount(true);
      setCurrentQuestion(currentQuestion + 1);
      setCorrectOrIncorrectMessage("Correct!");
      setTimeout(() => {
        setCorrectOrIncorrectMessage("");
      }, 3000);
      console.log(johnnyCreateAccountQuestions);
      return;
    }

    setCorrectOrIncorrectMessage("Incorrect!");
    setTimeout(() => {
      setCorrectOrIncorrectMessage("");
    }, 3000);
    console.log(johnnyCreateAccountQuestions);
    return;
  }; // Checks if the answer is correct and sets isCorrect to true if it is

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
      height: "30",
    },
    desktop: {
      width: "40",
      height: "30",
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
    <LoginModalContext.Provider
      value={{
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
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
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalContext;
