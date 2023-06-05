import React from "react";

type Props = {
  onClick: () => void;
  buttonText: string;
  buttonColor?: string;
};

const ButtonWidthFull = ({ onClick, buttonText, buttonColor }: Props) => {
  //  ${ buttonColor ? `bg-${String(buttonColor)}` : "bg-secondary" }
  return (
    <button
      className={` mx-6 grid gap-2 self-center rounded-md border border-secondary px-6 py-2`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default ButtonWidthFull;
