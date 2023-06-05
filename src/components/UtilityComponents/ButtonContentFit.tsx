import React, { MouseEvent } from "react";

type Props = {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  buttonColor?: string;
  isSubmit?: boolean;
};

const ButtonContentFit = ({
  onClick,
  buttonText,
  buttonColor,
  isSubmit,
}: Props) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={` w-fit rounded-md border border-secondary px-4 py-2 ${
        buttonColor ? `bg-${String(buttonColor)}` : "bg-secondary"
      } `}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default ButtonContentFit;
