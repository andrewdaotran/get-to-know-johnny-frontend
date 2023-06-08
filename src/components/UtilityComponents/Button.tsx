import React, { MouseEvent } from "react";

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  customStyle: string;
  isSubmit?: boolean;
};

const Button = ({ onClick, buttonText, customStyle, isSubmit }: Props) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={`rounded-md border px-6 py-2  ${customStyle}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
